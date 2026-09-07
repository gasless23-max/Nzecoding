import { GitHubClient } from "./client";

export interface RepositoryContent {
  path: string;
  content: string;
  sha: string;
  encoding: "base64" | "utf-8";
}

export class RepositoryManager {
  private client: GitHubClient;
  private owner: string;
  private repo: string;

  constructor(client: GitHubClient, owner: string, repo: string) {
    this.client = client;
    this.owner = owner;
    this.repo = repo;
  }

  async getFileContent(path: string): Promise<RepositoryContent> {
    try {
      const response = await (this.client as any).octokit.rest.repos.getContent({
        owner: this.owner,
        repo: this.repo,
        path,
      });

      if (Array.isArray(response.data)) {
        throw new Error("Expected file, got directory");
      }

      const content = Buffer.from(
        response.data.content as string,
        response.data.encoding as BufferEncoding
      ).toString("utf-8");

      return {
        path: response.data.path,
        content,
        sha: response.data.sha,
        encoding: "utf-8",
      };
    } catch (error) {
      throw new Error(`Failed to get file content: ${error}`);
    }
  }

  async createFile(
    path: string,
    content: string,
    message: string,
    branch?: string
  ): Promise<{ sha: string; url: string }> {
    try {
      const response = await (this.client as any).octokit.rest.repos.createOrUpdateFileContents({
        owner: this.owner,
        repo: this.repo,
        path,
        message,
        content: Buffer.from(content).toString("base64"),
        branch,
      });

      return {
        sha: response.data.commit.sha,
        url: response.data.commit.html_url || "",
      };
    } catch (error) {
      throw new Error(`Failed to create file: ${error}`);
    }
  }

  async updateFile(
    path: string,
    content: string,
    message: string,
    currentSha: string,
    branch?: string
  ): Promise<{ sha: string; url: string }> {
    try {
      const response = await (this.client as any).octokit.rest.repos.createOrUpdateFileContents({
        owner: this.owner,
        repo: this.repo,
        path,
        message,
        content: Buffer.from(content).toString("base64"),
        sha: currentSha,
        branch,
      });

      return {
        sha: response.data.commit.sha,
        url: response.data.commit.html_url || "",
      };
    } catch (error) {
      throw new Error(`Failed to update file: ${error}`);
    }
  }

  async deleteFile(
    path: string,
    message: string,
    currentSha: string,
    branch?: string
  ): Promise<{ sha: string }> {
    try {
      const response = await (this.client as any).octokit.rest.repos.deleteFile({
        owner: this.owner,
        repo: this.repo,
        path,
        message,
        sha: currentSha,
        branch,
      });

      return {
        sha: response.data.commit.sha,
      };
    } catch (error) {
      throw new Error(`Failed to delete file: ${error}`);
    }
  }
}
