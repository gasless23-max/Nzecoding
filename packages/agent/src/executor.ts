import { AgentExecutionState, ExecutionContext, ExecutionResult } from "./state";

export interface ToolRegistry {
  [key: string]: Tool;
}

export interface Tool {
  name: string;
  description: string;
  schema: Record<string, unknown>;
  execute(args: Record<string, unknown>, context: ExecutionContext): Promise<unknown>;
}

export class Executor {
  private toolRegistry: ToolRegistry;

  constructor(toolRegistry: ToolRegistry) {
    this.toolRegistry = toolRegistry;
  }

  async execute(
    state: AgentExecutionState,
    context: ExecutionContext
  ): Promise<ExecutionResult> {
    try {
      // Execute each step in sequence
      for (let i = state.currentStepIndex; i < state.steps.length; i++) {
        const step = state.steps[i];

        // Update step status
        step.status = "running";
        step.startedAt = new Date();

        try {
          // Execute the step using appropriate tool
          const result = await this.executeStep(step, state, context);
          step.status = "completed";
          step.output = JSON.stringify(result);
        } catch (error) {
          step.status = "failed";
          step.error = error instanceof Error ? error.message : String(error);
          state.errors.push(`Step ${step.name} failed: ${step.error}`);

          // Attempt repair if under retry limit
          if (state.retryCount < state.maxRetries) {
            state.retryCount++;
            return {
              success: false,
              error: `Step ${step.name} failed. Attempting repair.`,
              duration: 0,
            };
          }

          throw error;
        }

        step.completedAt = new Date();
        state.currentStepIndex = i + 1;
      }

      return {
        success: true,
        output: "Execution completed successfully",
        artifacts: {
          stepsCompleted: state.steps.length,
          duration: Date.now() - state.createdAt.getTime(),
        },
        duration: Date.now() - state.createdAt.getTime(),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        duration: Date.now() - state.createdAt.getTime(),
      };
    }
  }

  private async executeStep(
    step: { name: string; description?: string },
    state: AgentExecutionState,
    context: ExecutionContext
  ): Promise<unknown> {
    const tool = this.toolRegistry[step.name];
    if (!tool) {
      return { stepName: step.name, status: "executed", mode: "development", workspaceId: context.workspaceId };
    }
    return tool.execute({ state, step: step.name }, context);
  }
}
