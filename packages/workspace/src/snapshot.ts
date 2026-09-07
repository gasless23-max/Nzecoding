import { Workspace } from "@build-and-code/shared";
import * as fs from "fs/promises";
import * as path from "path";

export interface WorkspaceSnapshot {
  id: string;
  workspaceId: string;
  timestamp: Date;
  description: string;
  files: Record<string, string>;
  metadata: Record<string, unknown>;
}

export class SnapshotManager {
  private snapshotDir: string;

  constructor(workspacePath: string) {
    this.snapshotDir = path.join(workspacePath, ".snapshots");
  }

  async initialize(): Promise<void> {
    try {
      await fs.mkdir(this.snapshotDir, { recursive: true });
    } catch (error) {
      throw new Error(`Failed to initialize snapshot directory: ${error}`);
    }
  }

  async createSnapshot(
    workspace: Workspace,
    description: string,
    metadata?: Record<string, unknown>
  ): Promise<WorkspaceSnapshot> {
    try {
      const snapshotId = `snapshot-${Date.now()}`;
      const files: Record<string, string> = {};

      // Collect all file contents
      for (const file of workspace.files) {
        files[file.path] = file.content;
      }

      const snapshot: WorkspaceSnapshot = {
        id: snapshotId,
        workspaceId: workspace.id,
        timestamp: new Date(),
        description,
        files,
        metadata: metadata || {},
      };

      const snapshotPath = path.join(this.snapshotDir, `${snapshotId}.json`);
      await fs.writeFile(snapshotPath, JSON.stringify(snapshot, null, 2), "utf-8");

      return snapshot;
    } catch (error) {
      throw new Error(`Failed to create snapshot: ${error}`);
    }
  }

  async getSnapshot(snapshotId: string): Promise<WorkspaceSnapshot | null> {
    try {
      const snapshotPath = path.join(this.snapshotDir, `${snapshotId}.json`);
      const content = await fs.readFile(snapshotPath, "utf-8");
      return JSON.parse(content);
    } catch (error) {
      return null;
    }
  }

  async listSnapshots(): Promise<WorkspaceSnapshot[]> {
    try {
      const files = await fs.readdir(this.snapshotDir);
      const snapshots: WorkspaceSnapshot[] = [];

      for (const file of files) {
        if (file.endsWith(".json")) {
          const snapshotId = file.replace(".json", "");
          const snapshot = await this.getSnapshot(snapshotId);
          if (snapshot) {
            snapshots.push(snapshot);
          }
        }
      }

      return snapshots.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    } catch (error) {
      throw new Error(`Failed to list snapshots: ${error}`);
    }
  }

  async restoreSnapshot(snapshotId: string, workspacePath: string): Promise<void> {
    try {
      const snapshot = await this.getSnapshot(snapshotId);
      if (!snapshot) {
        throw new Error(`Snapshot ${snapshotId} not found`);
      }

      // Clear current workspace
      const entries = await fs.readdir(workspacePath);
      for (const entry of entries) {
        if (entry !== ".snapshots") {
          await fs.rm(path.join(workspacePath, entry), { recursive: true, force: true });
        }
      }

      // Restore files from snapshot
      for (const [filePath, content] of Object.entries(snapshot.files)) {
        const fullPath = path.join(workspacePath, filePath);
        const dir = path.dirname(fullPath);
        await fs.mkdir(dir, { recursive: true });
        await fs.writeFile(fullPath, content, "utf-8");
      }
    } catch (error) {
      throw new Error(`Failed to restore snapshot: ${error}`);
    }
  }
}
