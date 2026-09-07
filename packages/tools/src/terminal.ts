import { Tool } from "@build-and-code/shared";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export class TerminalTool implements Tool {
  name = "terminal";
  description = "Execute terminal commands in the workspace";
  schema = {
    type: "object",
    properties: {
      command: { type: "string" },
      cwd: { type: "string" },
      timeout: { type: "number" },
    },
    required: ["command"],
  };

  private readonly DEFAULT_TIMEOUT = 30000; // 30 seconds
  private readonly FORBIDDEN_COMMANDS = [
    "rm -rf /",
    "sudo",
    "reboot",
    "shutdown",
  ];

  async execute(args: Record<string, unknown>): Promise<unknown> {
    const command = args.command as string;
    const cwd = (args.cwd as string) || process.cwd();
    const timeout = (args.timeout as number) || this.DEFAULT_TIMEOUT;

    // Security: Check for dangerous commands
    if (this.isForbidden(command)) {
      throw new Error(`Command not allowed: ${command}`);
    }

    try {
      const { stdout, stderr } = await execAsync(command, {
        cwd,
        timeout,
        maxBuffer: 10 * 1024 * 1024, // 10MB
      });

      return {
        command,
        stdout,
        stderr,
        exitCode: 0,
      };
    } catch (error: unknown) {
      const err = error as { stdout?: string; stderr?: string; code?: number; killed?: boolean };
      if (err.killed) {
        throw new Error(`Command timeout: ${command}`);
      }
      return {
        command,
        stdout: err.stdout || "",
        stderr: err.stderr || "",
        exitCode: err.code || 1,
        error: String(error),
      };
    }
  }

  private isForbidden(command: string): boolean {
    return this.FORBIDDEN_COMMANDS.some((forbidden) =>
      command.toLowerCase().includes(forbidden.toLowerCase())
    );
  }
}

export const terminalTool = new TerminalTool();
