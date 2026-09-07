export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface Project {
    id: string;
    name: string;
    description?: string;
    ownerId: string;
    framework?: string;
    language?: string;
    status: ProjectStatus;
    repository?: string;
    branch?: string;
    createdAt: Date;
    updatedAt: Date;
}
export type ProjectStatus = "idle" | "building" | "running" | "error" | "completed";
export interface AgentTask {
    id: string;
    projectId: string;
    userId: string;
    status: AgentTaskStatus;
    description: string;
    plan?: string;
    steps: AgentStep[];
    createdAt: Date;
    updatedAt: Date;
    completedAt?: Date;
}
export type AgentTaskStatus = "queued" | "planning" | "executing" | "testing" | "repairing" | "completed" | "failed";
export interface AgentStep {
    name: string;
    description?: string;
    status: "queued" | "running" | "completed" | "failed";
    output?: string;
    error?: string;
    startedAt?: Date;
    completedAt?: Date;
}
export interface ToolCall {
    id: string;
    taskId: string;
    tool: string;
    args: Record<string, unknown>;
    result?: unknown;
    error?: string;
    startedAt: Date;
    completedAt?: Date;
}
export interface ToolRegistry {
    [key: string]: Tool;
}
export interface Tool {
    name: string;
    description: string;
    execute(args: Record<string, unknown>): Promise<unknown>;
}
export interface Workspace {
    id: string;
    projectId: string;
    files: WorkspaceFile[];
    status: WorkspaceStatus;
    createdAt: Date;
    updatedAt: Date;
}
export interface WorkspaceFile {
    path: string;
    content: string;
    type: "file" | "directory";
    modified: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export type WorkspaceStatus = "ready" | "building" | "running" | "error";
export interface Message {
    id: string;
    taskId: string;
    role: "user" | "assistant";
    content: string;
    createdAt: Date;
}
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}
//# sourceMappingURL=types.d.ts.map