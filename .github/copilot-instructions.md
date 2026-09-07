# GitHub Copilot Instructions for Build & Code

## Repository Overview

**Build & Code** is an autonomous AI software engineering workspace built as a TypeScript monorepo.

Product positioning: "Describe it. Build it. Ship it."

## Monorepo Structure

### Apps (User-facing)
- **apps/web/** - React + Vite SPA
- **apps/nextjs/** - Next.js 14 app (Vercel-ready)

### Packages (Shared libraries)
- **packages/shared/** - Shared types and constants
- **packages/database/** - PostgreSQL layer
- **packages/agent/** - AI orchestration engine
- **packages/tools/** - Execution tools registry
- **packages/workspace/** - Workspace management
- **packages/github/** - GitHub integration

### Services (Microservices)
- **services/api/** - Express.js API server

## Key Architecture Patterns

### Agent Workflow
```
User Input → Planning → Executing → Testing → [Repair if needed] → Completion
```

### Tool Invocation
Tools are registered in central registry and invoked by name with structured results.

### Workspace Isolation
Each project gets isolated filesystem, snapshots for versioning.

## TypeScript Standards

- Strict mode: `noImplicitAny: true`, `strictNullChecks: true`
- No `any` types allowed
- ESLint enforces strict rules

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start all services
npm run build        # Build all packages
npm run typecheck    # Type check
npm run lint         # Lint code
npm run format       # Format code
```

## Common Tasks

### Adding a New Type
1. Add to `packages/shared/src/types.ts`
2. Export from `packages/shared/src/index.ts`
3. Import: `import { NewType } from "@build-and-code/shared";`

### Adding a New Tool
1. Create class in `packages/tools/src/new-tool.ts` implementing `Tool` interface
2. Export from `packages/tools/src/index.ts`
3. Register in registry: `defaultRegistry.register("tool-name", toolInstance)`

### Adding Database Query
1. Add to `packages/database/src/queries.ts`
2. Use prepared statements: `$1, $2` placeholders
3. Export typed function

### Adding API Route
1. Add to `services/api/src/server.ts`
2. Use middleware for auth/validation
3. Return JSON response

## Security Rules

- **Secrets**: Never expose to frontend, use environment variables
- **Code Execution**: Workspace isolation, command whitelisting, timeouts
- **Data Protection**: Parameterized SQL, input validation, path traversal checks

## Git Workflow

1. Create feature branch from `main`
2. Make changes across relevant packages
3. Run validation: `npm run typecheck && npm run lint && npm run build`
4. Commit with conventional message: `feat:`, `fix:`, `chore:`, `docs:`
5. Push and create pull request

## Important Files

- `package.json` - Root workspaces config
- `tsconfig.json` - Base TypeScript config
- `turbo.json` - Turbo build orchestration
- `.eslintrc.json` - ESLint rules
- `vercel.json` - Vercel deployment config
- `.env.example` - Environment variables

## When Modifying Code

1. Use TypeScript strict mode - No `any` types
2. Run `npm run typecheck` before committing
3. Run `npm run lint` and `npm run format`
4. Update `packages/shared/src/types.ts` if adding new types
5. Keep packages modular - Avoid circular dependencies
6. Document public APIs - Add JSDoc comments
7. Consider security - Validate inputs, escape outputs
8. Use descriptive names

---

**Last Updated:** September 2024
