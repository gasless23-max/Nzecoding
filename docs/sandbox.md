# Sandbox Model

Generated projects must run in isolated workspace sandboxes, never in the main application process. The sandbox boundary owns filesystem access, process execution, package installation, resource limits, and network policy.

Required controls:

- Resolve every path under an explicit workspace root.
- Allowlist commands and reject shell metacharacters.
- Apply execution timeout, memory, CPU, and output limits.
- Do not pass host environment variables into generated processes.
- Require approvals before network access, Git writes, or destructive operations.
- Emit structured tool-call events for every action.

`packages/workspace` currently provides path-boundary enforcement. `services/sandbox` is the integration point for a container, microVM, or remote execution provider.
