# GitHub Copilot Agents - The Lobbi Figma Demo

Specialized agents for the Lobbi Figma demo project, adapted from agents across the Lobbi ecosystem. All agents are now fully configured with valid GitHub Copilot tools and enhanced workflows.

## ✅ Agent Status: All Working

All agents have been fixed and enhanced with:
- **Valid tool configurations** - Using only standard GitHub Copilot tools
- **Advanced workflows** - Multi-phase processes for complex tasks
- **Web research capability** - Added to agents that benefit from online documentation
- **Best practices** - Detailed guidelines and examples
- **No MCP references** - Removed all unsupported MCP tool references

## Standard GitHub Copilot Tools

All agents use these standard tools:
- **read** - Read files from the repository
- **edit** - Edit files in the repository
- **search** - Search code and files
- **execute** - Execute commands
- **web** - Perform web searches (for research/documentation)
- **todo** - Manage todo items

## Agent Inventory

### Design & UI (6 agents)

| Agent | File | Tools | Key Features |
|-------|------|-------|-------------|
| **UI Design** | `ui-design.agent.md` | read, edit, search, execute, web, todo | Lobbi gold theme, luxury aesthetics |
| **Design System** | `design-system.agent.md` | read, search, edit, execute | Design tokens, anti-AI-slop principles |
| **Design Guardian** | `design-guardian.agent.md` | read, edit, search, execute, todo | Style consistency enforcement |
| **Theme Engineer** | `theme-engineer.agent.md` | read, edit, search, execute, todo | Tailwind v4 + Chakra UI v3 theming |
| **Animations** | `animations.agent.md` | read, edit, search, execute, todo | GSAP + Framer Motion patterns |
| **Animation Director** | `animation-director.agent.md` | read, edit, search, execute, todo | Advanced animation orchestration |
| **Motion Architect** | `motion-architect.agent.md` | read, edit, search, execute, todo | Complex motion design |

### Development (11 agents)

| Agent | File | Tools | Key Features |
|-------|------|-------|-------------|
| **Coder** ⭐ | `coder.agent.md` | read, edit, search, execute, web | **TDD workflow, Red-Green-Refactor** |
| **React Components** | `react-components.agent.md` | read, edit, search, execute, todo | React 18 + Radix/Chakra patterns |
| **Chakra Component Dev** | `chakra-component-dev.agent.md` | read, edit, search, execute, todo | Chakra UI v3 recipes & slot recipes |
| **Chakra Recipe Auditor** | `chakra-recipe-auditor.agent.md` | read, edit, search, execute, todo | Recipe compliance checking |
| **Chakra Slot Recipe Expert** | `chakra-slot-recipe-expert.agent.md` | read, edit, search, execute, todo | Advanced slot recipe patterns |
| **Chakra Token Guardian** | `chakra-token-guardian.agent.md` | read, edit, search, execute, todo | Design token enforcement |
| **Charts & Viz** | `charts-visualization.agent.md` | read, edit, search, execute, todo | Recharts data visualization |
| **Widget Builder** | `widget-builder.agent.md` | read, edit, search, execute, todo | Dashboard widget development |
| **Auth Flow Designer** | `auth-flow-designer.agent.md` | read, edit, search, execute, todo | Authentication & authorization |
| **Frontend Architect** | `frontend-architect.agent.md` | read, edit, search, execute, todo | Application architecture |
| **Debugging** ⭐ | `debugging.agent.md` | read, search, edit, execute, web | **5-phase debugging workflow** |

### Quality & Process (5 agents)

| Agent | File | Tools | Key Features |
|-------|------|-------|-------------|
| **Testing** ⭐ | `testing.agent.md` | read, search, edit, execute, web | **Vitest + RTL, 5-phase workflow** |
| **Reviewer** ⭐ | `reviewer.agent.md` | read, search, edit, web | **Comprehensive 5-phase code review** |
| **Security** ⭐ | `security.agent.md` | read, search, execute, web | **Vulnerability scanning, secret detection** |
| **A11y Auditor** | `a11y-auditor.agent.md` | read, edit, search, execute, todo | WCAG 2.1 AAA compliance |
| **Perf Guardian** | `perf-guardian.agent.md` | read, edit, search, execute, todo | Performance optimization |

### Planning & Research (4 agents)

| Agent | File | Tools | Key Features |
|-------|------|-------|-------------|
| **Planner** ⭐ | `planner.agent.md` | read, search, edit, web | **4-phase task decomposition** |
| **Analyst** ⭐ | `analyst.agent.md` | read, search, edit, web | **Requirements analysis, risk assessment** |
| **Researcher** | `researcher.agent.md` | read, search, web | Technology research, pattern discovery |
| **Documenter** ⭐ | `documenter.agent.md` | read, edit, search, web | **5-phase documentation workflow** |

⭐ = Enhanced with advanced multi-phase workflows

## Enhanced Agent Workflows

The following agents have been enhanced with comprehensive multi-phase workflows:

### 🎯 Analyst (4 phases)
1. **Discovery** - Read specs, research best practices
2. **Analysis** - Map dependencies, identify integration points
3. **Risk Assessment** - Technical/schedule/quality risks
4. **Documentation** - Requirements, dependencies, risks, assumptions

### 📋 Planner (4 phases)
1. **Understand** - Requirements, context, codebase
2. **Decompose** - Break into atomic tasks with estimates
3. **Organize** - Sequence, parallelize, prioritize
4. **Document** - Task list, dependency graph, timeline

### 💻 Coder (5 phases - TDD)
1. **Explore** - Search codebase, research patterns
2. **Plan** - Define tests, edge cases, mocks
3. **Code** - Red (failing test) → Green (pass) → Refactor
4. **Validate** - Run tests, typecheck, build
5. **Document** - Comments, JSDoc, examples

### 🔍 Reviewer (5 phases)
1. **Understand** - Read changes, search patterns, research
2. **Analyze** - Architecture, types, errors, edge cases
3. **Quality** - Readability, complexity, duplication
4. **Specialized** - Security, performance, accessibility
5. **Feedback** - Categorized issues with recommendations

### 📝 Documenter (5 phases)
1. **Analyze** - Understand code, find patterns, research
2. **Structure** - Outline, format, examples, assets
3. **Write** - Title, overview, usage, API, edge cases
4. **Enhance** - Code samples, visuals, links, troubleshooting
5. **Review** - Test accuracy, verify links, maintain consistency

### 🐛 Debugging (5 phases)
1. **Reproduce** - Understand issue, run app, document
2. **Isolate** - Narrow scope, check changes, test cases
3. **Diagnose** - DevTools, network, console, source maps
4. **Fix** - Minimal change, test, add regression test
5. **Validate** - Run tests, manual test, perf check

### 🧪 Testing (5 phases)
1. **Plan** - Requirements, test cases, mocks
2. **Setup** - Test file, imports, mocks, fixtures
3. **Write** - AAA pattern (Arrange, Act, Assert)
4. **Coverage** - Run tests, check 80%+ coverage
5. **Maintain** - Update, refactor, fix flaky tests

### 🔒 Security (5 phases)
1. **Dependencies** - npm audit, check CVEs
2. **Secrets** - Scan for API keys, tokens, passwords
3. **Code Review** - XSS, injection, auth issues
4. **Best Practices** - Input validation, error handling, HTTPS
5. **Report** - Categorize, document, provide fixes

## Tech Stack Coverage

All agents are adapted for:
- React 18 + TypeScript 5
- Vite 6 + Tailwind CSS v4
- Chakra UI v3 + Radix UI + shadcn/ui
- GSAP 3.14+ + Framer Motion 12.x
- Recharts 2.x + React DnD 16.x
- Lucide React + Sonner + React Hook Form

## Using the Agents

### Invoke by Name
```
@analyst analyze these requirements...
@planner break this down into tasks...
@coder implement this feature with TDD...
@reviewer review this PR...
@testing add tests for this component...
```

### Agent Collaboration Patterns

**Feature Development Flow:**
1. `@analyst` - Analyze requirements, identify dependencies
2. `@planner` - Break down into tasks
3. `@coder` - Implement with TDD
4. `@testing` - Ensure test coverage
5. `@reviewer` - Code review
6. `@security` - Security scan
7. `@documenter` - Add documentation

**Bug Fix Flow:**
1. `@debugging` - Diagnose and reproduce
2. `@coder` - Fix with test
3. `@testing` - Add regression test
4. `@reviewer` - Review fix

**Design Implementation Flow:**
1. `@ui-design` - Design system implementation
2. `@animation-director` - Animation choreography
3. `@a11y-auditor` - Accessibility review
4. `@perf-guardian` - Performance optimization

## Migration Notes

**Previous Issues (Now Fixed):**
- ❌ Agents referenced MCP tools (github/*, context7/*, memory/*, sequential-thinking/*)
- ❌ MCP tools are not supported by GitHub Copilot
- ❌ Agents would fail or not work properly

**Current Status:**
- ✅ All agents use only standard GitHub Copilot tools
- ✅ MCP references removed from all agent files
- ✅ Enhanced with comprehensive workflows
- ✅ Added web tool for research capabilities
- ✅ All agents are functional and optimized

## Source Repos

Agents were adapted from:
- `harness-workspace/docs/enhanced-documentation` - UI/Design specialists
- `pro/lobbi-mms-demo` - Orchestration agents (analyst, coder, planner, etc.)
- `dev/lobbi-design-system` - Design system, debugging, testing
