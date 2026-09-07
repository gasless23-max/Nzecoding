# Security Model

Build & Code treats generated source code as untrusted input.

- Authentication secrets stay server-side.
- Workspace paths are root-bound and validated.
- Shell commands are allowlisted and bounded.
- Generated code runs only behind sandbox interfaces.
- GitHub writes require review and explicit approval.
- Real environment files are excluded from imports and pushes.
- Database queries use ownership checks and parameterized inputs.
- Audit events capture agent actions, tool calls, errors, approvals, and changes.

Production deployment should add a hardened sandbox provider, secret manager, rate limiting, structured logs, and error monitoring.
