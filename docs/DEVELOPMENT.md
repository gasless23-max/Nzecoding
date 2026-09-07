# Development Guide

## Quick Start

1. **Clone and Install**
   ```bash
   git clone https://github.com/gasless23-max/Nzecoding.git
   cd Nzecoding
   pnpm install
   ```

2. **Setup Environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Run Dev Server**
   ```bash
   pnpm dev
   ```
   - Web app: http://localhost:5173
   - API server: http://localhost:3000

## Project Layout

### Apps
- **web**: React + Vite frontend with dashboard, IDE, project workspace
- **nextjs**: Optional Next.js integration (secondary)

### Packages
- **shared**: TypeScript types used across monorepo
- **ui**: Shadcn UI component library (can be initialized)
- **agent**: Agent state machine and orchestration
- **tools**: Typed tool registry for workspace operations
- **workspace**: File system and state management
- **github**: GitHub API integration
- **database**: PostgreSQL schema and queries

### Services
- **api**: Express.js REST API
- **agent-runtime**: Agent execution service
- **sandbox**: Code execution sandbox

## Development Workflow

### Adding a New Feature
1. Identify which package needs changes
2. Create feature branch: `git checkout -b v0/feature-name`
3. Make changes in relevant package
4. Run validation: `pnpm typecheck && pnpm lint && pnpm build`
5. Commit with meaningful message
6. Push to branch

### Adding a New Tool
1. Define in `packages/tools/src/`
2. Add to tool registry in `defaultRegistry`
3. Export from `packages/tools/src/index.ts`
4. Use in executor or api

### Adding a New API Endpoint
1. Create route handler in `services/api/src/routes/`
2. Define request/response types in shared
3. Add validation with Zod
4. Test with curl or REST client

### Environment Variables
- Stored in `.env.local` (local development)
- Add new vars to `.env.example`
- Never commit real values
- Access via `process.env.VAR_NAME`

## Code Quality

### Type Checking
```bash
pnpm typecheck
```

### Linting
```bash
pnpm lint
```

### Testing
```bash
pnpm test
```

### Formatting
```bash
pnpm format
```

## Common Issues

### Workspace Resolution Issues
- Make sure `pnpm-workspace.yaml` is present
- Verify package.json has correct workspace references
- Use `workspace:*` protocol for internal packages

### TypeScript Errors
- Run `pnpm typecheck` to see all errors
- Ensure `tsconfig.json` paths are correct
- Check that shared types are exported properly

### Dev Server Not Starting
- Check if port 5173 is already in use
- Clear `.turbo` cache: `pnpm clean`
- Reinstall dependencies: `rm -rf node_modules && pnpm install`

## Performance Tips

- Use `pnpm --filter @build-and-code/web` to build specific package
- Turbo cache speeds up builds significantly
- Monaco editor is heavy; consider lazy loading in production

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup and deployment strategies.
