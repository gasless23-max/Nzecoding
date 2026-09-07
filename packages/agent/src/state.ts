import { AgentTask, AgentStep } from "@build-and-code/shared";

export interface AgentExecutionState {
  taskId: string;
  projectId: string;
  userId: string;
  status: AgentTaskStatus;
  description: string;
  plan?: string;
  steps: AgentStep[];
  currentStepIndex: number;
  messages: Array<{ role: "user" | "assistant"; content: string }>;
  context: Record<string, unknown>;
  errors: string[];
  retryCount: number;
  maxRetries: number;
  createdAt: Date;
  updatedAt: Date;
}

export type AgentTaskStatus =
  | "queued"
  | "planning"
  | "executing"
  | "testing"
  | "repairing"
  | "completed"
  | "failed";

export interface ExecutionContext {
  workspaceId: string;
  projectPath: string;
  environment: Record<string, string>;
  secrets: Map<string, string>;
}

export interface PlanResult {
  description: string;
  steps: AgentStep[];
  estimatedDuration: number;
  resources: string[];
}

export interface ExecutionResult {
  success: boolean;
  output?: string;
  error?: string;
  artifacts?: Record<string, unknown>;
  duration: number;
}
