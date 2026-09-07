# Workspace Model

A workspace belongs to one project and tracks indexed files, framework, language, build state, Git state, and modifications. `WorkspaceManager` provides create, read, update, delete, list, and modified-file operations.

Files are resolved through a workspace-root boundary to prevent traversal. Snapshots and diffs should be persisted through the database provider before destructive operations. The web workspace currently uses a safe development representation while the server providers are connected.

Future snapshot operations:

1. Capture file manifest and content hashes.
2. Persist snapshot metadata.
3. Compare two manifests to produce added, modified, and deleted files.
4. Restore only after explicit user approval.
