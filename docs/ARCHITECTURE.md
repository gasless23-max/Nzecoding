# Build & Code Architecture

## Overview

Build & Code is a monorepo-based autonomous AI software engineering workspace that enables users to turn natural language requests into working software through an observable, step-by-step process.

## Monorepo Structure

```
apps/
  web/                 # Vite + React frontend (primary interface)
  nextjs/              # Next.js experimental app (secondary)

packages/
  shared/              # Shared types and constants
  ui/                  # UI component library (ready for shadcn components)
  agent/               # Agent orchestration (planner, executor, state)
  tools/               # Execution tools registry
  workspace/           # Workspace filesystem and state management
  github/              # GitHub integration
  database/            # Database models and queries

services/
  api/                 # Express API server
  agent-runtime/       # Agent execution runtime
  sandbox/             # Sandbox environment for code execution

templates/
  react-vite/          # React + Vite starter
  vue-vite/            # Vue + Vite starter
  typescript/          # TypeScript CLI starter
  python/              # Python starter
  rust/                # Rust starter
```

## Core Concepts

### 1. Agent Architecture

The agent operates through a state machine:
- **Planning**: Parse user intent, create execution plan
- **Executing**: Run planned steps with tools
- **Testing**: Verify results against requirements
- **Repairing**: Auto-fix failures, retry
- **Completing**: Final validation and handoff

### 2. Tool Registry

All workspace operations happen through typed tools:
- `filesystem.*` - Read/write/delete files
- `terminal.execute` - Run commands safely
- `build.run` / `test.run` - Build and test
- `git.*` - Version control operations
- `github.*` - Repository management

### 3. Workspace Management

Each project gets isolated workspace:
- File tracking and snapshots
- Diff generation
- Change history
- Safe approval gates

### 4. Provider Interfaces

All external services use provider patterns:
- **LLM Provider** - Abstracted model calls
- **Database Provider** - PostgreSQL connection
- **Storage Provider** - File storage backend
- **GitHub Provider** - Repository operations
- **Sandbox Provider** - Code execution boundary

## Authentication

- **Local Development**: Simple session-based auth with local user
- **Production**: Ready for integration with Auth.js/Better Auth
- **GitHub OAuth**: Connector framework ready
- **API Keys**: All stored server-side, never exposed to browser

## Security

- **Sandbox Isolation**: Generated code never runs on main server
- **Command Allowlisting**: Only safe commands permitted
- **Path Validation**: Workspace root enforcement
- **Secret Boundaries**: No env files in generated workspaces
- **Approval Gates**: High-impact actions need explicit approval

## Data Flow

```
User Input
    ↓
Intent Analysis (Agent)
    ↓
Plan Generation (Planner)
    ↓
Execution with Tools (Executor)
    ↓
Verification (Verifier)
    ↓
Auto-Repair Loop if needed
    ↓
Results Preview + Diff Review
    ↓
User Approval + Git Commit
```

## Development

```bash
# Install dependencies
pnpm install

# Run dev server
pnpm dev

# Type checking
pnpm typecheck

# Linting
pnpm lint

# Tests
pnpm test

# Production build
pnpm build
```

See [DEVELOPMENT.md](./DEVELOPMENT.md) for detailed setup.
