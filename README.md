# Build & Code

Autonomous AI software engineering workspace for building, coding, testing, debugging, and shipping applications.

> **Describe it. Build it. Ship it.**

## Vision

Build & Code is an AI-powered development workspace that can understand a software request, plan the implementation, write and modify code, run commands, test the application, diagnose failures, repair issues, and help ship the finished project.

## Core Capabilities

- AI project generation
- Autonomous coding and debugging
- Project planning and architecture
- Integrated code editor
- Terminal execution
- Live previews
- Build, test, and lint automation
- Git and GitHub workflows
- Pull request creation
- Workspace snapshots and versioning
- Real-time agent execution
- Desktop and mobile-first developer experience

## Architecture

The platform is designed as a modular TypeScript monorepo containing:

- `apps/web` — Main developer workspace
- `packages/ui` — Shared UI components
- `packages/agent` — Agent orchestration
- `packages/tools` — Agent tools
- `packages/workspace` — Workspace management
- `packages/github` — GitHub integration
- `packages/database` — Database layer
- `packages/shared` — Shared types and utilities
- `services/agent-runtime` — Agent execution runtime
- `services/sandbox` — Secure code execution
- `templates` — Starter project templates
- `docs` — Product and technical documentation

## Technology

- React
- Vite
- TypeScript
- Tailwind CSS
- shadcn/ui
- Monaco Editor
- xterm.js
- LangChain
- LangGraph
- PostgreSQL
- GitHub API

## Status

🚧 Active development.

## License

MIT
