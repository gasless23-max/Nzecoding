import { Workspace, WorkspaceFile } from "@build-and-code/shared";
import * as fs from "fs/promises";
import * as path from "path";

export class WorkspaceManager {
  private workspacePath: string;
  private workspace: Workspace;

  constructor(projectId: string, basePath: string = "/tmp/workspaces") {
    this.workspacePath = path.join(basePath, projectId);
    this.workspace = {
      id: projectId,
      projectId,
      files: [],
      status: "ready",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  private resolveSafePath(filePath: string): string {
    const resolved = path.resolve(this.workspacePath, filePath);
    const root = path.resolve(this.workspacePath);
    if (resolved !== root && !resolved.startsWith(`${root}${path.sep}`)) {
      throw new Error(`Path escapes workspace boundary: ${filePath}`);
    }
    return resolved;
  }

  async initialize(): Promise<void> {
    try {
      await fs.mkdir(this.workspacePath, { recursive: true });
      this.workspace.status = "ready";
      this.workspace.updatedAt = new Date();
    } catch (error) {
      throw new Error(`Failed to initialize workspace: ${error}`);
    }
  }

  async createFile(
    filePath: string,
    content: string,
    fileType: "file" | "directory" = "file"
  ): Promise<WorkspaceFile> {
    try {
      const fullPath = this.resolveSafePath(filePath);
      const dir = path.dirname(fullPath);

      await fs.mkdir(dir, { recursive: true });

      if (fileType === "file") {
        await fs.writeFile(fullPath, content, "utf-8");
      }

      const workspaceFile: WorkspaceFile = {
        path: filePath,
        content,
        type: fileType,
        modified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      this.workspace.files.push(workspaceFile);
      this.workspace.updatedAt = new Date();

      return workspaceFile;
    } catch (error) {
      throw new Error(`Failed to create file ${filePath}: ${error}`);
    }
  }

  async readFile(filePath: string): Promise<string> {
    try {
      const fullPath = this.resolveSafePath(filePath);
      return await fs.readFile(fullPath, "utf-8");
    } catch (error) {
      throw new Error(`Failed to read file ${filePath}: ${error}`);
    }
  }

  async updateFile(filePath: string, content: string): Promise<WorkspaceFile> {
    try {
      const fullPath = this.resolveSafePath(filePath);
      await fs.writeFile(fullPath, content, "utf-8");

      const fileIndex = this.workspace.files.findIndex((f) => f.path === filePath);
      if (fileIndex >= 0) {
        this.workspace.files[fileIndex].content = content;
        this.workspace.files[fileIndex].modified = true;
        this.workspace.files[fileIndex].updatedAt = new Date();
      }

      this.workspace.updatedAt = new Date();

      return this.workspace.files[fileIndex] || {
        path: filePath,
        content,
        type: "file",
        modified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    } catch (error) {
      throw new Error(`Failed to update file ${filePath}: ${error}`);
    }
  }

  async deleteFile(filePath: string): Promise<void> {
    try {
      const fullPath = this.resolveSafePath(filePath);
      await fs.rm(fullPath, { recursive: true, force: true });

      this.workspace.files = this.workspace.files.filter((f) => f.path !== filePath);
      this.workspace.updatedAt = new Date();
    } catch (error) {
      throw new Error(`Failed to delete file ${filePath}: ${error}`);
    }
  }

  async listFiles(dirPath: string = ""): Promise<WorkspaceFile[]> {
    try {
      const fullPath = this.resolveSafePath(dirPath);
      const entries = await fs.readdir(fullPath, { withFileTypes: true });

      return entries.map((entry) => ({
        path: path.join(dirPath, entry.name),
        content: "",
        type: entry.isDirectory() ? ("directory" as const) : ("file" as const),
        modified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
    } catch (error) {
      throw new Error(`Failed to list files in ${dirPath}: ${error}`);
    }
  }

  getWorkspace(): Workspace {
    return this.workspace;
  }

  getWorkspacePath(): string {
    return this.workspacePath;
  }

  getModifiedFiles(): WorkspaceFile[] {
    return this.workspace.files.filter((f) => f.modified);
  }
}
