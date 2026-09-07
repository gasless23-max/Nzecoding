# Agent System

The agent is modeled as an observable state machine: `queued → planning → executing → testing → repairing → completed|failed`.

Each run carries a typed `AgentExecutionState`, structured steps, retry count, errors, messages, and timestamps. Providers are injected through `packages/agent/src/providers.ts`, allowing deterministic development adapters and production LLM implementations without changing orchestration.

The UI consumes the same concepts through agent activity, step progress, tool calls, and diff review. Repair is bounded by `maxRetries`; failed steps are reset to queued before a retry.

## Provider boundaries

- Intent provider: extracts intent and requirements.
- Planning provider: creates implementation steps.
- Implementation provider: uses approved tools.
- Verification provider: runs build/test/lint checks.
- Repair provider: explains and applies safe fixes.

No provider may access secrets or execute generated code outside a sandbox.
