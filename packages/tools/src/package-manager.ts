import { Tool } from "@build-and-code/shared";
import { execAsync } from "./utils";

export class PackageManagerTool implements Tool {
  name = "package-manager";
  description = "Install and manage project dependencies";
  schema = {
    type: "object",
    properties: {
      operation: {
        type: "string",
        enum: ["install", "remove", "add", "list"],
      },
      package: { type: "string" },
      packageManager: { type: "string", enum: ["npm", "yarn", "pnpm"] },
      cwd: { type: "string" },
    },
  };

  async execute(args: Record<string, unknown>): Promise<unknown> {
    const operation = args.operation as string;
    const packageName = args.package as string;
    const pm = (args.packageManager as string) || "npm";
    const cwd = (args.cwd as string) || process.cwd();

    switch (operation) {
      case "install":
        return this.install(pm, cwd);
      case "add":
        return this.add(packageName, pm, cwd);
      case "remove":
        return this.remove(packageName, pm, cwd);
      case "list":
        return this.list(pm, cwd);
      default:
        throw new Error(`Unknown operation: ${operation}`);
    }
  }

  private async install(pm: string, cwd: string): Promise<unknown> {
    const command = pm === "npm" ? "npm install" : `${pm} install`;
    return execAsync(command, { cwd });
  }

  private async add(pkg: string, pm: string, cwd: string): Promise<unknown> {
    let command: string;
    if (pm === "npm") {
      command = `npm install ${pkg}`;
    } else if (pm === "yarn") {
      command = `yarn add ${pkg}`;
    } else {
      command = `pnpm add ${pkg}`;
    }
    return execAsync(command, { cwd });
  }

  private async remove(pkg: string, pm: string, cwd: string): Promise<unknown> {
    let command: string;
    if (pm === "npm") {
      command = `npm uninstall ${pkg}`;
    } else if (pm === "yarn") {
      command = `yarn remove ${pkg}`;
    } else {
      command = `pnpm remove ${pkg}`;
    }
    return execAsync(command, { cwd });
  }

  private async list(pm: string, cwd: string): Promise<unknown> {
    const command =
      pm === "npm" ? "npm list --depth=0" : `${pm} list --depth=0`;
    return execAsync(command, { cwd });
  }
}

export const packageManagerTool = new PackageManagerTool();
