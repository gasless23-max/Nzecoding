import { Tool } from "@build-and-code/shared";
import { execAsync } from "./utils";

export class BuildTool implements Tool {
  name = "build";
  description = "Build, test, and lint operations";
  schema = {
    type: "object",
    properties: {
      operation: {
        type: "string",
        enum: ["build", "test", "lint", "typecheck", "dev"],
      },
      cwd: { type: "string" },
      args: { type: "string" },
    },
  };

  async execute(args: Record<string, unknown>): Promise<unknown> {
    const operation = args.operation as string;
    const cwd = (args.cwd as string) || process.cwd();
    const extraArgs = (args.args as string) || "";

    switch (operation) {
      case "build":
        return this.build(cwd, extraArgs);
      case "test":
        return this.test(cwd, extraArgs);
      case "lint":
        return this.lint(cwd, extraArgs);
      case "typecheck":
        return this.typecheck(cwd);
      case "dev":
        return this.dev(cwd);
      default:
        throw new Error(`Unknown operation: ${operation}`);
    }
  }

  private async build(cwd: string, args: string): Promise<unknown> {
    return execAsync(`npm run build ${args}`, { cwd });
  }

  private async test(cwd: string, args: string): Promise<unknown> {
    return execAsync(`npm run test ${args}`, { cwd });
  }

  private async lint(cwd: string, args: string): Promise<unknown> {
    return execAsync(`npm run lint ${args}`, { cwd });
  }

  private async typecheck(cwd: string): Promise<unknown> {
    return execAsync("npm run typecheck", { cwd });
  }

  private async dev(cwd: string): Promise<unknown> {
    return execAsync("npm run dev", { cwd });
  }
}

export const buildTool = new BuildTool();
