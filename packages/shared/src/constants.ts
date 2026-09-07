// Project status constants
export const PROJECT_STATUSES = {
  IDLE: "idle",
  BUILDING: "building",
  RUNNING: "running",
  ERROR: "error",
  COMPLETED: "completed",
} as const;

// Agent task status constants
export const AGENT_TASK_STATUSES = {
  QUEUED: "queued",
  PLANNING: "planning",
  EXECUTING: "executing",
  TESTING: "testing",
  REPAIRING: "repairing",
  COMPLETED: "completed",
  FAILED: "failed",
} as const;

// Step status constants
export const STEP_STATUSES = {
  QUEUED: "queued",
  RUNNING: "running",
  COMPLETED: "completed",
  FAILED: "failed",
} as const;

// Supported frameworks
export const FRAMEWORKS = [
  "react",
  "vue",
  "svelte",
  "angular",
  "next",
  "nuxt",
] as const;

// Supported languages
export const LANGUAGES = [
  "typescript",
  "javascript",
  "python",
  "rust",
  "go",
] as const;
