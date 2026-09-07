import { Tool } from "@build-and-code/shared";

export interface ToolRegistry {
  [key: string]: Tool;
}

export class ToolRegistryImpl {
  private tools: Map<string, Tool> = new Map();

  register(name: string, tool: Tool): void {
    this.tools.set(name, tool);
  }

  get(name: string): Tool | undefined {
    return this.tools.get(name);
  }

  list(): string[] {
    return Array.from(this.tools.keys());
  }

  getAll(): Tool[] {
    return Array.from(this.tools.values());
  }

  async execute(
    name: string,
    args: Record<string, unknown>
  ): Promise<unknown> {
    const tool = this.tools.get(name);
    if (!tool) {
      throw new Error(`Tool ${name} not found in registry`);
    }
    return tool.execute(args);
  }
}

// Create singleton instance
export const defaultRegistry = new ToolRegistryImpl();
