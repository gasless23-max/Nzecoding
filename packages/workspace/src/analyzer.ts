import { Workspace, FRAMEWORKS, LANGUAGES } from "@build-and-code/shared";

export interface ProjectAnalysis {
  framework?: string;
  language?: string;
  dependencies: string[];
  hasTests: boolean;
  hasBuild: boolean;
  hasLint: boolean;
  projectType: string;
}

export class WorkspaceAnalyzer {
  async analyze(workspace: Workspace): Promise<ProjectAnalysis> {
    const analysis: ProjectAnalysis = {
      dependencies: [],
      hasTests: false,
      hasBuild: false,
      hasLint: false,
      projectType: "unknown",
    };

    // Check for package.json
    const packageJsonFile = workspace.files.find((f) => f.path === "package.json");
    if (packageJsonFile) {
      try {
        const pkg = JSON.parse(packageJsonFile.content);
        analysis.dependencies = Object.keys(pkg.dependencies || {});
        analysis.projectType = "nodejs";

        // Detect framework
        if (analysis.dependencies.includes("react")) {
          analysis.framework = "react";
        } else if (analysis.dependencies.includes("vue")) {
          analysis.framework = "vue";
        } else if (analysis.dependencies.includes("@angular/core")) {
          analysis.framework = "angular";
        }
      } catch (error) {
        console.error("Failed to parse package.json", error);
      }
    }

    // Check for TypeScript
    const tsConfigFile = workspace.files.find(
      (f) => f.path === "tsconfig.json" || f.path.includes("tsconfig")
    );
    if (tsConfigFile) {
      analysis.language = "typescript";
    }

    // Check for test files
    analysis.hasTests = workspace.files.some(
      (f) => f.path.includes(".test.") || f.path.includes(".spec.")
    );

    // Check for build scripts
    if (packageJsonFile) {
      const pkg = JSON.parse(packageJsonFile.content);
      analysis.hasBuild = !!(pkg.scripts && pkg.scripts.build);
      analysis.hasLint = !!(pkg.scripts && pkg.scripts.lint);
    }

    return analysis;
  }
}
