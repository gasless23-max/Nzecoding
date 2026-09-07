import { Tool } from "@build-and-code/shared";
import { execAsync } from "./utils";

export class GitTool implements Tool {
  name = "git";
  description = "Git operations including commit, push, and branch management";
  schema = {
    type: "object",
    properties: {
      operation: {
        type: "string",
        enum: ["status", "add", "commit", "push", "pull", "branch", "checkout"],
      },
      message: { type: "string" },
      branch: { type: "string" },
      files: { type: "array" },
      cwd: { type: "string" },
    },
  };

  async execute(args: Record<string, unknown>): Promise<unknown> {
    const operation = args.operation as string;
    const cwd = (args.cwd as string) || process.cwd();

    switch (operation) {
      case "status":
        return this.status(cwd);
      case "add":
        return this.add(args.files as string[], cwd);
      case "commit":
        return this.commit(args.message as string, cwd);
      case "push":
        return this.push(cwd);
      case "pull":
        return this.pull(cwd);
      case "branch":
        return this.branch(args.branch as string, cwd);
      case "checkout":
        return this.checkout(args.branch as string, cwd);
      default:
        throw new Error(`Unknown operation: ${operation}`);
    }
  }

  private async status(cwd: string): Promise<unknown> {
    return execAsync("git status --porcelain", { cwd });
  }

  private async add(files: string[], cwd: string): Promise<unknown> {
    const fileList = files.join(" ");
    return execAsync(`git add ${fileList}`, { cwd });
  }

  private async commit(message: string, cwd: string): Promise<unknown> {
    return execAsync(`git commit -m "${message}"`, { cwd });
  }

  private async push(cwd: string): Promise<unknown> {
    return execAsync("git push", { cwd });
  }

  private async pull(cwd: string): Promise<unknown> {
    return execAsync("git pull", { cwd });
  }

  private async branch(branchName: string, cwd: string): Promise<unknown> {
    return execAsync(`git branch ${branchName}`, { cwd });
  }

  private async checkout(branchName: string, cwd: string): Promise<unknown> {
    return execAsync(`git checkout ${branchName}`, { cwd });
  }
}

export const gitTool = new GitTool();
