import { Tool } from "@build-and-code/shared";
import * as fs from "fs/promises";
import * as path from "path";

export class FilesystemTool implements Tool {
  name = "filesystem";
  description = "Read, write, and manage files and directories";
  schema = {
    type: "object",
    properties: {
      operation: {
        type: "string",
        enum: ["read", "write", "delete", "list", "mkdir"],
      },
      path: { type: "string" },
      content: { type: "string" },
    },
  };

  async execute(args: Record<string, unknown>): Promise<unknown> {
    const operation = args.operation as string;
    const filePath = args.path as string;

    // Security: Prevent path traversal
    if (filePath.includes("..")) {
      throw new Error("Path traversal not allowed");
    }

    switch (operation) {
      case "read":
        return this.read(filePath);
      case "write":
        return this.write(filePath, args.content as string);
      case "delete":
        return this.delete(filePath);
      case "list":
        return this.list(filePath);
      case "mkdir":
        return this.mkdir(filePath);
      default:
        throw new Error(`Unknown operation: ${operation}`);
    }
  }

  private async read(filePath: string): Promise<string> {
    try {
      return await fs.readFile(filePath, "utf-8");
    } catch (error) {
      throw new Error(`Failed to read file ${filePath}: ${error}`);
    }
  }

  private async write(filePath: string, content: string): Promise<void> {
    try {
      const dir = path.dirname(filePath);
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(filePath, content, "utf-8");
    } catch (error) {
      throw new Error(`Failed to write file ${filePath}: ${error}`);
    }
  }

  private async delete(filePath: string): Promise<void> {
    try {
      await fs.rm(filePath, { recursive: true, force: true });
    } catch (error) {
      throw new Error(`Failed to delete ${filePath}: ${error}`);
    }
  }

  private async list(dirPath: string): Promise<string[]> {
    try {
      const files = await fs.readdir(dirPath, { withFileTypes: true });
      return files.map((f) => (f.isDirectory() ? `${f.name}/` : f.name));
    } catch (error) {
      throw new Error(`Failed to list directory ${dirPath}: ${error}`);
    }
  }

  private async mkdir(dirPath: string): Promise<void> {
    try {
      await fs.mkdir(dirPath, { recursive: true });
    } catch (error) {
      throw new Error(`Failed to create directory ${dirPath}: ${error}`);
    }
  }
}

export const filesystemTool = new FilesystemTool();
