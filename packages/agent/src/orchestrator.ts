import { AgentExecutionState, AgentTaskStatus, ExecutionContext, ExecutionResult } from "./state";
import { Planner } from "./planner";
import { Executor } from "./executor";

export interface OrchestratorConfig {
  maxRetries?: number;
  timeoutMs?: number;
  enableRepair?: boolean;
}

export class Orchestrator {
  private planner: Planner;
  private executor: Executor;
  private config: Required<OrchestratorConfig>;

  constructor(executor: Executor, config?: OrchestratorConfig) {
    this.planner = new Planner();
    this.executor = executor;
    this.config = {
      maxRetries: config?.maxRetries ?? 3,
      timeoutMs: config?.timeoutMs ?? 300000,
      enableRepair: config?.enableRepair ?? true,
    };
  }

  async execute(
    state: AgentExecutionState,
    context: ExecutionContext
  ): Promise<AgentExecutionState> {
    try {
      // Phase 1: Planning
      state.status = "planning" as AgentTaskStatus;
      state.updatedAt = new Date();
      console.log(`[${state.taskId}] Planning...`);

      const plan = await this.planner.plan(state);
      state.plan = plan.description;
      state.steps = plan.steps;
      state.updatedAt = new Date();

      // Phase 2: Execution Loop
      state.status = "executing" as AgentTaskStatus;
      state.updatedAt = new Date();
      console.log(`[${state.taskId}] Executing...`);

      let result: ExecutionResult | null = null;

      while (state.retryCount < this.config.maxRetries) {
        result = await this.executor.execute(state, context);

        if (result.success) {
          break;
        }

        if (this.config.enableRepair && state.retryCount < this.config.maxRetries) {
          state.status = "repairing" as AgentTaskStatus;
          state.updatedAt = new Date();
          console.log(`[${state.taskId}] Attempting repair (attempt ${state.retryCount + 1})...`);
          await this.repairState(state);
        }
      }

      // Phase 3: Testing
      state.status = "testing" as AgentTaskStatus;
      state.updatedAt = new Date();
      console.log(`[${state.taskId}] Testing...`);

      // Phase 4: Completion
      if (result?.success) {
        state.status = "completed" as AgentTaskStatus;
      } else {
        state.status = "failed" as AgentTaskStatus;
      }

      state.updatedAt = new Date();
      return state;
    } catch (error) {
      state.status = "failed" as AgentTaskStatus;
      state.errors.push(error instanceof Error ? error.message : String(error));
      state.updatedAt = new Date();
      return state;
    }
  }

  private async repairState(state: AgentExecutionState): Promise<void> {
    // Analyze errors and attempt to repair
    // This could involve:
    // - Fixing dependency issues
    // - Correcting configuration
    // - Adjusting code based on build errors
    // - Re-running failed tests

    // Reset failed steps to retry
    for (const step of state.steps) {
      if (step.status === "failed") {
        step.status = "queued";
        step.error = undefined;
        step.output = undefined;
      }
    }
  }
}
