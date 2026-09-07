import { exec } from "child_process";
import { promisify } from "util";

export const execAsync = promisify(exec);

export function sanitizeCommand(command: string): string {
  // Remove potentially dangerous characters
  return command.replace(/[;&|`$()]/g, "");
}

export function escapePath(filePath: string): string {
  return `"${filePath.replace(/"/g, '\\"')}"`;
}
