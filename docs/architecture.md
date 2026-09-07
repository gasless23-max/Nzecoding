# Build & Code - Architecture & Development Guide

## Project Structure

### Monorepo Layout

```
.
├── apps/
│   ├── web/                 # React + Vite frontend (SPA)
│   └── nextjs/              # Next.js full-stack app (for Vercel)
├── packages/
│   ├── shared/              # Shared types and constants
│   ├── database/            # PostgreSQL layer
│   ├── agent/               # AI orchestration engine
│   ├── tools/               # Execution tools registry
│   ├── workspace/           # Workspace management
│   └── github/              # GitHub integration
├── services/
│   ├── api/                 # Express.js API service
│   └── agent-runtime/       # Agent execution runtime (planned)
└── docs/
    └── architecture.md      # This file
```

## Technology Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development and optimized builds
- Next.js 14 for Vercel deployment
- Tailwind CSS for styling
- Framer Motion for animations
- Lucide React for icons
- Zustand for state management

### Backend
- Node.js 20+ with TypeScript
- Express.js for API server
- PostgreSQL for data persistence

### AI/Agent
- LangChain.js for AI integration
- LangGraph.js for agentic workflows

### DevOps
- Turbo for monorepo orchestration
- Vercel for hosting
- Docker for containerization (planned)

## Core Systems

### 1. Agent Orchestrator

State-machine architecture for autonomous execution:
- Planning: Generate execution plan
- Executing: Run steps with tools
- Testing: Validate results
- Repair: Fix errors automatically
- Completion: Return results

### 2. Tool Registry

Modular tools for agent:
- Filesystem operations
- Terminal execution
- Package manager
- Git operations
- Build/test/lint

### 3. Workspace Management

Project isolation with:
- File management
- Snapshots and versioning
- Project analysis

### 4. Database Layer

PostgreSQL with tables for:
- Users and authentication
- Projects and workspaces
- Agent runs and steps
- Messages and tool calls
- GitHub connections

### 5. GitHub Integration

Full API integration for:
- Repository import/export
- Pull request creation
- File operations

## Development Commands

```bash
npm install          # Install all dependencies
npm run dev          # Start all services in parallel
npm run build        # Build all packages
npm run typecheck    # Type check all packages
npm run lint         # Lint all packages
npm run format       # Format all code
npm run clean        # Clean build artifacts
```

## Environment Variables

```
DATABASE_URL=postgresql://user:password@localhost:5432/build_and_code
AUTH_SECRET=your_secret_key_here
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
LLM_API_KEY=your_llm_api_key
LLM_MODEL=gpt-4-turbo
LLM_PROVIDER=openai
```

## Deployment

### Vercel (Recommended)

```bash
vercel link      # Connect repository
vercel deploy    # Deploy to production
```

Vercel automatically:
- Installs dependencies
- Runs build command
- Deploys to production
- Sets environment variables

## Security Rules

1. **Authentication**: Secrets never exposed to frontend
2. **Code Execution**: Workspace isolation, command whitelisting
3. **Data Protection**: Parameterized SQL, input validation
4. **Secrets**: Detection before Git operations

## Roadmap

### Phase 1 (Complete) ✓
- Monorepo setup
- Core types and interfaces
- Database schema
- Agent orchestration
- Tool registry
- Workspace management
- GitHub integration
- React frontend
- Next.js app
- Express API
- Documentation

### Phase 2
- Authentication UI
- Dashboard implementation
- IDE workspace
- Real-time collaboration
- WebSocket messaging

### Phase 3
- Sandbox implementation
- Advanced error repair
- Multi-language support
- Template system
- Integration tests

### Phase 4
- Production hardening
- Performance optimization
- Security audit
- Public release

---

**Last Updated:** September 2024
