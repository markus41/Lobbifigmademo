# MCP Configuration for Agents

This document describes how MCP servers are integrated with the custom agents.

## Available MCP Tools

### GitHub MCP (`github/*`)

Repository access for code analysis and PR workflows.

| Tool | Purpose |
|------|---------|
| `github/get_file_contents` | Read files from repository |
| `github/search_code` | Search code patterns |
| `github/get_pull_request` | Get PR details and diff |
| `github/list_issues` | List and search issues |
| `github/list_pull_requests` | List PRs with filters |

### Context7 MCP (`context7/*`)

Accurate, up-to-date library documentation lookup.

| Tool | Purpose |
|------|---------|
| `context7/resolve-library-id` | Resolve library names to documentation IDs |
| `context7/get-library-docs` | Get official API documentation and examples |

**Usage:**
1. Always resolve library IDs first
2. Get documentation for accurate API signatures
3. Never fabricate API details - always look up documentation

### Memory MCP (`memory/*`)

Persistent knowledge across sessions.

| Tool | Purpose |
|------|---------|
| `memory/save` | Save patterns and learnings |
| `memory/retrieve` | Retrieve saved knowledge |
| `memory/search` | Search past knowledge |

### Sequential Thinking MCP (`sequential-thinking/*`)

Enhanced reasoning for complex problems.

| Tool | Purpose |
|------|---------|
| `sequential-thinking/think` | Structured step-by-step reasoning |

## Agent-MCP Matrix

| Agent | GitHub | Context7 | Memory | Seq. Thinking |
|-------|--------|----------|--------|---------------|
| UI Design | - | - | - | - |
| Design System | - | - | - | - |
| Animations | - | - | - | - |
| React Components | Y | - | - | - |
| Charts & Viz | - | - | - | - |
| Coder | Y | Y | Y | Y |
| Debugging | - | - | - | - |
| Testing | - | - | - | - |
| Planner | Y | Y | Y | Y |
| Analyst | Y | Y | Y | Y |
| Researcher | Y | Y | Y | Y |
| Reviewer | Y | Y | Y | Y |
| Security | Y | Y | Y | Y |
| Documenter | Y | Y | Y | Y |

## Best Practices

1. Always resolve library IDs before getting documentation
2. Verify API details from official documentation - never fabricate
3. Save valuable knowledge to memory for future sessions
4. Use sequential thinking for complex multi-step analysis
5. Search memory before creating new knowledge entries
