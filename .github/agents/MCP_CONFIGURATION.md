# MCP Configuration for Agents

> **Note:** This document describes MCP (Model Context Protocol) integrations that were planned but are **not currently supported** by GitHub Copilot agents. The agents in this repository use only the standard GitHub Copilot agent tools.

## Standard GitHub Copilot Agent Tools

GitHub Copilot agents currently support the following standard tools:

| Tool | Purpose |
|------|---------|
| `read` | Read files from the repository |
| `edit` | Edit files in the repository |
| `search` | Search code and files |
| `execute` | Execute commands |
| `web` | Perform web searches |
| `todo` | Manage todo items |

All agents in this repository have been configured to use only these standard tools.

## Previously Planned MCP Integrations (Not Available)

The following MCP servers were originally planned but are not supported:
### GitHub MCP (`github/*`) - Not Available

Repository access for code analysis and PR workflows.

| Tool | Purpose |
|------|---------|
| `github/get_file_contents` | Read files from repository |
| `github/search_code` | Search code patterns |
| `github/get_pull_request` | Get PR details and diff |
| `github/list_issues` | List and search issues |
| `github/list_pull_requests` | List PRs with filters |
### Context7 MCP (`context7/*`) - Not Available

Accurate, up-to-date library documentation lookup.

| Tool | Purpose |
|------|---------|
| `context7/resolve-library-id` | Resolve library names to documentation IDs |
| `context7/get-library-docs` | Get official API documentation and examples |

**Usage:**
1. Always resolve library IDs first
2. Get documentation for accurate API signatures
3. Never fabricate API details - always look up documentation
### Memory MCP (`memory/*`) - Not Available

Persistent knowledge across sessions.

| Tool | Purpose |
|------|---------|
| `memory/save` | Save patterns and learnings |
| `memory/retrieve` | Retrieve saved knowledge |
| `memory/search` | Search past knowledge |
### Sequential Thinking MCP (`sequential-thinking/*`) - Not Available

Enhanced reasoning for complex problems.

| Tool | Purpose |
|------|---------|
| `sequential-thinking/think` | Structured step-by-step reasoning |
## Agent Tool Configuration

All agents in this repository now use only standard GitHub Copilot tools:

| Agent | Tools |
|-------|-------|
| UI Design | read, edit, search, execute, web |
| Design System | read, search, edit, execute |
| Animations | read, edit, search, execute, todo |
| React Components | read, edit, search, execute, todo |
| Charts & Viz | read, edit, search, execute, todo |
| Coder | read, edit, search, execute |
| Debugging | read, search, edit, execute |
| Testing | read, search, edit, execute |
| Planner | read, search, edit |
| Analyst | read, search, edit |
| Researcher | read, search, web |
| Reviewer | read, search |
| Security | read, search, execute |
| Documenter | read, edit, search |

## Migration Notes

Previous versions of these agents referenced MCP tools (github/*, context7/*, memory/*, sequential-thinking/*) which are not supported by GitHub Copilot agents. These references have been removed and agents now function with standard tools only.
