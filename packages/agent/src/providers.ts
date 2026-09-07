import { AgentExecutionState, ExecutionContext, ExecutionResult, PlanResult } from "./state";

export interface IntentProvider {
  analyze(description: string): Promise<{ intent: string; requirements: string[] }>;
}

export interface PlanningProvider {
  plan(state: AgentExecutionState): Promise<PlanResult>;
}

export interface ImplementationProvider {
  execute(state: AgentExecutionState, context: ExecutionContext): Promise<ExecutionResult>;
}

export interface VerificationProvider {
  verify(state: AgentExecutionState, context: ExecutionContext): Promise<ExecutionResult>;
}

export interface RepairProvider {
  repair(state: AgentExecutionState, error: string): Promise<{ description: string; files: string[] }>;
}

export interface AgentProviders {
  intent: IntentProvider;
  planning: PlanningProvider;
  implementation: ImplementationProvider;
  verification: VerificationProvider;
  repair: RepairProvider;
}

export interface AgentEvent {
  type: "state_change" | "step_update" | "tool_call" | "message" | "error";
  taskId: string;
  timestamp: Date;
  payload: Record<string, unknown>;
}

export type AgentEventListener = (event: AgentEvent) => void;

export class DevelopmentIntentProvider implements IntentProvider {
  async analyze(description: string) {
    return { intent: description.toLowerCase().includes("analytics") ? "creator_analytics" : "software_project", requirements: [description, "Responsive interface", "Verified build"] };
  }
}

export function createDevelopmentProviders(planning: PlanningProvider, implementation: ImplementationProvider, verification: VerificationProvider, repair: RepairProvider): AgentProviders {
  return { intent: new DevelopmentIntentProvider(), planning, implementation, verification, repair };
}
