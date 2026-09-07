# Database Model

PostgreSQL is the persistence target. The model covers users, projects, workspaces, workspace snapshots, conversations, messages, agent runs, agent steps, tool calls, files, Git repositories, Git branches, GitHub connections, and usage events.

Every user-owned query must scope by the authenticated owner. Use parameterized queries, foreign keys, timestamps, indexes for owner/project lookups, and explicit transaction boundaries around agent runs and snapshots.

The database package is intentionally provider-shaped so local development can use a safe in-memory adapter while production connects through `DATABASE_URL`.
