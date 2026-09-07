import { GitHubClient } from "./client";

export interface PullRequestOptions {
  title: string;
  description: string;
  head: string;
  base: string;
  isDraft?: boolean;
}

export interface PullRequestData {
  number: number;
  title: string;
  description: string;
  url: string;
  state: "open" | "closed";
}

export class PullRequestManager {
  private client: GitHubClient;
  private owner: string;
  private repo: string;

  constructor(client: GitHubClient, owner: string, repo: string) {
    this.client = client;
    this.owner = owner;
    this.repo = repo;
  }

  async createPullRequest(options: PullRequestOptions): Promise<PullRequestData> {
    try {
      const response = await (this.client as any).octokit.rest.pulls.create({
        owner: this.owner,
        repo: this.repo,
        title: options.title,
        body: options.description,
        head: options.head,
        base: options.base,
        draft: options.isDraft || false,
      });

      return {
        number: response.data.number,
        title: response.data.title,
        description: response.data.body || "",
        url: response.data.html_url,
        state: response.data.state as "open" | "closed",
      };
    } catch (error) {
      throw new Error(`Failed to create pull request: ${error}`);
    }
  }

  async getPullRequest(prNumber: number): Promise<PullRequestData> {
    try {
      const response = await (this.client as any).octokit.rest.pulls.get({
        owner: this.owner,
        repo: this.repo,
        pull_number: prNumber,
      });

      return {
        number: response.data.number,
        title: response.data.title,
        description: response.data.body || "",
        url: response.data.html_url,
        state: response.data.state as "open" | "closed",
      };
    } catch (error) {
      throw new Error(`Failed to get pull request: ${error}`);
    }
  }

  async listPullRequests(): Promise<PullRequestData[]> {
    try {
      const response = await (this.client as any).octokit.rest.pulls.list({
        owner: this.owner,
        repo: this.repo,
        state: "all",
        per_page: 30,
      });

      return response.data.map((pr: any) => ({
        number: pr.number,
        title: pr.title,
        description: pr.body || "",
        url: pr.html_url,
        state: pr.state,
      }));
    } catch (error) {
      throw new Error(`Failed to list pull requests: ${error}`);
    }
  }
}
