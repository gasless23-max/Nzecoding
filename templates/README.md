# Build & Code Templates

This directory contains starter templates for common project types. When a user requests to build a project, the AI agent selects and instantiates the appropriate template.

## Available Templates

### React + Vite
- **Path**: `react-vite/`
- **Use Case**: Web applications, dashboards, SPAs
- **Stack**: React 18, Vite, TypeScript, Tailwind CSS
- **Size**: ~20KB gzipped

### Vue + Vite  
- **Path**: `vue-vite/`
- **Use Case**: Vue applications, interactive sites
- **Stack**: Vue 3, Vite, TypeScript, Tailwind CSS
- **Size**: ~18KB gzipped

### TypeScript CLI
- **Path**: `typescript/`
- **Use Case**: Command-line tools, scripts
- **Stack**: TypeScript, Node.js, ESM
- **Size**: ~2KB gzipped

### Python
- **Path**: `python/`
- **Use Case**: Data processing, ML, backends
- **Stack**: Python 3.10+, FastAPI
- **Size**: ~100KB (with dependencies)

### Rust
- **Path**: `rust/`
- **Use Case**: Systems programming, performance-critical code
- **Stack**: Rust, Cargo, standard library
- **Size**: ~15MB (with toolchain)

## Template Structure

Each template should have:
```
template-name/
  ├── package.json (or pyproject.toml, Cargo.toml)
  ├── README.md
  ├── .gitignore
  ├── src/
  │   └── index.{ts,jsx,py,rs}
  ├── dist/ (or build/)
  ├── tsconfig.json (TypeScript templates)
  └── [framework-specific files]
```

## Using Templates

The agent automatically:
1. Detects user intent and selects template
2. Copies template to new workspace
3. Customizes based on project description
4. Installs dependencies
5. Runs initial build

## Adding New Templates

1. Create directory under `templates/`
2. Include minimal working example
3. Add package.json/manifest with metadata
4. Include README with setup instructions
5. Update this file with template info

## Template Metadata

Each template's `package.json` should include:
```json
{
  "name": "build-code-template-{name}",
  "description": "Template for {description}",
  "keywords": ["build-and-code", "template", ...],
  "template": {
    "framework": "{framework}",
    "language": "{language}",
    "category": "{category}",
    "difficulty": "beginner|intermediate|advanced"
  }
}
```

This metadata helps the agent select the right template for user requests.
