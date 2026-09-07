import { Octokit } from "@octokit/rest";

export interface GitHubConfig {
  token: string;
  owner?: string;
}

export class GitHubClient {
  private octokit: Octokit;
  private owner: string | null;

  constructor(config: GitHubConfig) {
    this.octokit = new Octokit({
      auth: config.token,
    });
    this.owner = config.owner || null;
  }

  async getAuthenticatedUser(): Promise<{
    login: string;
    id: number;
    name: string | null;
  }> {
    try {
      const response = await this.octokit.rest.users.getAuthenticated();
      return {
        login: response.data.login,
        id: response.data.id,
        name: response.data.name,
      };
    } catch (error) {
      throw new Error(`Failed to get authenticated user: ${error}`);
    }
  }

  async getUserRepositories(): Promise<
    Array<{
      name: string;
      full_name: string;
      description: string | null;
      url: string;
    }>
  > {
    try {
      const response = await this.octokit.rest.repos.listForAuthenticatedUser({
        type: "owner",
        sort: "updated",
        per_page: 30,
      });
      return response.data.map((repo) => ({
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description,
        url: repo.html_url,
      }));
    } catch (error) {
      throw new Error(`Failed to list repositories: ${error}`);
    }
  }

  async getRepository(
    owner: string,
    repo: string
  ): Promise<{
    name: string;
    full_name: string;
    description: string | null;
    language: string | null;
    url: string;
  }> {
    try {
      const response = await this.octokit.rest.repos.get({ owner, repo });
      return {
        name: response.data.name,
        full_name: response.data.full_name,
        description: response.data.description,
        language: response.data.language,
        url: response.data.html_url,
      };
    } catch (error) {
      throw new Error(`Failed to get repository: ${error}`);
    }
  }

  async createRepository(
    name: string,
    description: string,
    isPrivate: boolean = false
  ): Promise<{ url: string; full_name: string }> {
    try {
      const response = await this.octokit.rest.repos.createForAuthenticatedUser({
        name,
        description,
        private: isPrivate,
        auto_init: true,
      });
      return {
        url: response.data.html_url,
        full_name: response.data.full_name,
      };
    } catch (error) {
      throw new Error(`Failed to create repository: ${error}`);
    }
  }
}
