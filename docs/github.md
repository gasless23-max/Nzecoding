# GitHub Integration

GitHub access is provider-based and approval-gated. Read operations include repository import, branch discovery, README analysis, dependency analysis, and project tree inspection.

Write operations require an explicit review surface showing:

- Changed files and diff
- Target branch
- Commit message
- Secret scan results
- Push or pull request destination

Real `.env` files and credentials must never be uploaded. The web UI intentionally shows a connection state when OAuth credentials are not configured rather than pretending a repository write succeeded.
