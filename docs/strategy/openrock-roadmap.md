# OPENROCK roadmap

OPENROCK is the proposed next identity and product direction for this fork of OpenClaw.

The goal is not only to rename the project. The goal is to turn the existing local-first personal assistant into a stronger agentic developer platform: terminal-first, multi-model, multi-surface, permission-aware, and built for serious repo work without becoming an unsupervised chaos goblin.

This document is intentionally a plan, not a full rename commit. A direct rename touches package names, binaries, docs, config keys, services, installers, screenshots, release channels, and user migration paths. That deserves staged work instead of one giant radioactive diff.

## Naming direction

Preferred name:

- **OPENROCK**

Why it works:

- Short, memorable, and strong.
- Keeps the open-source signal from OpenClaw.
- Sounds more durable and less joke-dependent than lobster/claw branding.
- Fits a developer-tool identity: rock-solid local agents, rock-solid workflows.

Possible CLI binary names:

- `openrock` - clear and direct.
- `orock` - short, but less obvious.
- `rock` - nice, but likely too collision-prone.
- `rockctl` - strong for daemon/control-plane work.

Recommendation:

- Product: **OPENROCK**
- CLI: `openrock`
- Daemon/gateway: `openrock gateway`
- Compatibility shim: keep `openclaw` as an alias for at least one migration cycle.

## What current coding CLIs teach us

### Claude Code

Claude Code is an agentic CLI that reads a codebase, edits files, runs commands, and integrates with development tools. Its core pattern is an agentic loop: gather context, take action, verify results, and repeat. It also uses tools for file operations, search, shell execution, web lookup, and code intelligence. It supports project instructions, sessions, auto memory, checkpoints, permission modes, subagents, skills, hooks, MCP, desktop/web/IDE surfaces, and remote control.

OPENROCK takeaway:

- The core loop matters more than the chat UI.
- File edits must be checkpointed.
- Permissions must be first-class.
- Context must be actively managed, not dumped into the model like confetti.
- Subagents need isolated context and preferably isolated worktrees.

### OpenAI Codex CLI

Codex CLI runs locally in the terminal and can read repositories, make edits, and run commands. It supports an interactive terminal UI, direct prompt mode, remote TUI/app-server mode, cloud tasks, web search, MCP, project instructions through `AGENTS.md`, permissions profiles, sandboxing, and configuration around filesystem/network access.

OPENROCK takeaway:

- Local CLI plus remote control is the right shape.
- Permissions should be profile-based, not just yes/no prompts.
- Network access needs domain rules and local/private-network protection.
- `AGENTS.md` should stay supported for cross-tool interoperability.
- A remote app-server mode makes phone/web/desktop supervision possible.

### Gemini CLI

Gemini CLI is an open-source terminal agent. It emphasizes free-tier access, large context, built-in tools for file operations, shell commands, web fetching, Google Search grounding, MCP support, conversation checkpointing, and project context files like `GEMINI.md`. It also advertises multimodal app generation from PDFs, images, or sketches.

OPENROCK takeaway:

- Multimodal inputs should become native: screenshot, PDF, logs, image sketch, design reference.
- Search grounding is a differentiator for fresh documentation and error research.
- Checkpoint/resume is mandatory for longer work.
- Users want fast install and instant `npx`/global package flows.

### Qwen Code

Qwen Code is an open-source terminal AI agent optimized for Qwen models. It supports multiple provider protocols, including OpenAI-compatible, Anthropic, Gemini-compatible, OpenRouter, Fireworks, and bring-your-own API key. It includes skills and subagents and targets a Claude-Code-like workflow.

OPENROCK takeaway:

- Multi-provider support is not optional.
- Provider abstraction should be boring, typed, and swappable.
- OpenRouter support unlocks fast experimentation across model families.
- Local/open models should be a first-class path, not an afterthought.

### OpenRouter

OpenRouter provides a unified API for hundreds of models through one endpoint, with automatic fallbacks and cost-aware routing. It also exposes an Agent SDK with tool loops, tool execution, state management, and OpenAI SDK compatibility.

OPENROCK takeaway:

- Add a provider router layer with fallback, budget, latency, and capability routing.
- Treat models as capabilities: coder, reviewer, planner, vision, cheap summarizer, long-context analyst.
- Allow user policies such as `cheap`, `fast`, `private`, `local`, `best`, and `balanced`.

## OPENROCK product thesis

OPENROCK should become:

> A local-first AI software engineer that can use your terminal, browser, editor, repo, docs, tests, and chat channels while giving you strong control over permissions, memory, cost, and risk.

Not just:

> Another terminal chatbot with permission prompts and a dramatic spinner.

## Architecture plan

### 1. Core agent loop

Build the product around a visible, inspectable loop:

1. Understand the task.
2. Build a repo map.
3. Create a plan.
4. Ask for approval when needed.
5. Edit through patch operations.
6. Run verification commands.
7. Repair failures.
8. Summarize changes.
9. Prepare commit/PR.
10. Store useful memory.

The loop should expose a structured trace so users can see why the agent did something.

### 2. Repo intelligence engine

Create a local repository indexer:

- File tree summary.
- Language/framework detection.
- Package scripts and test commands.
- Symbol map using tree-sitter or language servers later.
- Dependency graph where easy.
- Hot files from git history.
- Existing conventions from README, AGENTS.md, CLAUDE.md, package.json, tsconfig, lint config, and tests.

The agent should read fewer files but understand more. Humanity keeps inventing 900-file repos and then pretending scrolling is architecture.

### 3. Provider router

Add a model provider layer:

- OpenAI.
- Anthropic.
- Gemini.
- Qwen.
- OpenRouter.
- Local OpenAI-compatible servers such as Ollama, LM Studio, vLLM, llama.cpp gateways.

Routing modes:

- `best`: strongest model available.
- `fast`: low-latency model.
- `cheap`: budget-preserving model.
- `private`: local-only or zero-data-retention providers.
- `review`: strong reasoning, conservative patching.
- `vision`: multimodal model for screenshots/designs.

### 4. Permission and sandbox system

OPENROCK should use layered permissions:

- Read-only mode.
- Workspace-write mode.
- Workspace-write without network.
- Workspace-write with domain allowlist.
- Full local mode, clearly marked dangerous.
- External-service mode for GitHub, Slack, email, browser, cloud APIs.

Risk scoring should consider:

- Filesystem writes.
- Shell commands.
- Network access.
- Secret-like strings.
- Package manager scripts.
- Git operations.
- Database/cloud/deploy commands.
- Browser actions.
- Actions that touch user identity or money.

The key improvement over basic permission prompts: ask based on actual blast radius, not whether the command merely looks scary.

### 5. Checkpoints and rollback

Before edits:

- Snapshot changed files.
- Keep patch history.
- Store tool traces.
- Let users rollback by step, file, or whole task.

Rollback should be independent from git because users often begin tasks with dirty worktrees, because apparently clean working trees are mythical creatures.

### 6. Subagents with isolation

Subagents should not share the main context window. Give each subagent:

- Fresh context.
- Narrow task brief.
- Permission scope.
- Optional git worktree or virtual patch branch.
- Return summary plus patch.

Useful subagents:

- Planner.
- Codebase scout.
- Test writer.
- Bug hunter.
- Security reviewer.
- Docs updater.
- Dependency upgrader.
- UI screenshot comparer.
- Release-note writer.

### 7. Skills and workflows

A skill should be a packageable workflow, not just a fancy prompt.

Skill format:

- `SKILL.md` instructions.
- Optional scripts.
- Input schema.
- Required permissions.
- Test/verification commands.
- Output contract.

Core skills to build:

- `fix-tests`.
- `add-feature`.
- `review-pr`.
- `security-scan`.
- `explain-codebase`.
- `make-release`.
- `debug-browser`.
- `generate-docs`.
- `migrate-dependency`.
- `build-ui-from-screenshot`.

### 8. Multimodal developer loop

OPENROCK should accept:

- Screenshots.
- Browser appshots.
- PDFs.
- Logs.
- Audio notes.
- Architecture sketches.
- UI mockups.

Use cases:

- “Make the app look like this screenshot.”
- “Read this PDF spec and implement the API.”
- “Compare before/after screenshots and fix the layout.”
- “Listen to this bug report and create an issue + patch.”

### 9. Browser and app control

Keep browser automation, but gate it hard:

- Separate browser profile.
- No default access to personal sessions.
- Visible action log.
- Domain allowlists.
- Screenshot/appshot evidence.
- Confirm before purchases, messages, account changes, deletes, or publishing.

### 10. Memory that does not become cursed

Memory types:

- Project memory: build commands, architecture, conventions.
- User memory: style preferences, preferred stack.
- Session memory: task-specific state.
- Safety memory: commands/domains previously approved.

Memory rules:

- Show what was saved.
- Let users edit/delete memory.
- Expire stale memory.
- Never store secrets.
- Never silently turn one-off instructions into permanent rules.

## 10x ideas

These are the features that could make OPENROCK feel meaningfully stronger than a normal CLI agent.

### RockMap

A live codebase map that updates as the agent reads files. It shows:

- Important modules.
- Test coverage hotspots.
- Recent-change hotspots.
- Risky files.
- Ownership/convention notes.

### RockPlan

Every non-trivial task starts with a structured plan:

- Goal.
- Files likely touched.
- Tests to run.
- Risks.
- Rollback path.
- Permission needs.

### RockPatch

Patch-first editing:

- Model proposes patch.
- Tool validates patch applies.
- Type/lint/test runs.
- User can inspect patch before commit.

This reduces “AI rewrote my file into soup” incidents, a sentence society should not have needed.

### RockArena

Run multiple models/subagents against the same bug or feature:

- Planner A proposes.
- Planner B critiques.
- Builder implements.
- Reviewer attacks the patch.
- Test agent writes missing cases.

The orchestrator chooses the best patch, not the loudest model.

### RockGuard

Permission engine plus policy files:

- `.openrock/policy.toml`
- command allow/deny lists
- domain allow/deny lists
- secret scanners
- package-script warnings
- local-service warnings
- data exfiltration heuristics

### RockReplay

Replay any session:

- Prompts.
- Tool calls.
- Files read.
- Patches applied.
- Commands run.
- Verification output.
- Final diff.

Great for debugging, teaching, and proving the robot did not invent a “successful test run” from vibes and dust.

### RockBench

Built-in local eval harness:

- Run agent against mini tasks.
- Compare models/providers.
- Track success, cost, time, command count, rollback count.
- Store results per repo.

### RockPilot

Mobile/web supervisor:

- Start a task from phone.
- Approve risky actions.
- Watch screenshots/logs.
- Pause/redirect/cancel.
- Pull finished patch locally.

### RockLocal

First-class local model mode:

- Ollama/LM Studio/vLLM discovery.
- Small-model summarizer.
- Local code search.
- Cloud model only for hard reasoning when allowed.

### RockForge

Project generator:

- Turns a prompt/spec/sketch into a repo.
- Generates scaffold, tests, docs, CI, and first issue backlog.
- Uses templates and strong conventions instead of freestyle model soup.

## Migration strategy

### Phase 0: Strategy and codename

- Add this roadmap.
- Decide whether OPENROCK is a fork identity, future upstream proposal, or local experimental branch.
- Keep existing `openclaw` binary untouched.

### Phase 1: Branding layer

- Add neutral naming constants.
- Add docs that describe the OPENROCK direction.
- Add `openrock` as an alias command while keeping `openclaw` working.
- Add `OPENROCK_EXPERIMENTAL=1` feature flag for new agent features.

### Phase 2: Provider router

- Introduce model provider abstraction.
- Add OpenRouter provider.
- Add local OpenAI-compatible provider.
- Add routing profiles: `best`, `fast`, `cheap`, `private`, `review`, `vision`.

### Phase 3: Agent workbench

- Add RockPlan output.
- Add checkpoint/rollback view.
- Add structured traces.
- Add task replay.

### Phase 4: Sandboxing and policy

- Add `.openrock/policy.toml`.
- Add permission profiles.
- Add domain and command allowlists.
- Add secret detection and high-risk warnings.

### Phase 5: Subagents and arena mode

- Add isolated subagent sessions.
- Add scout/reviewer/test-writer agents.
- Add RockArena for comparing plans or patches.

### Phase 6: Full rename decision

Only after compatibility is stable:

- Rename package metadata.
- Rename binary default.
- Rename config root from `.openclaw` to `.openrock`, with migration.
- Rename docs and website references.
- Keep backward-compatible aliases and migration doctor checks.

## First implementation candidates

Small, safe first PRs:

1. Add `openrock` alias command that prints experimental status and forwards to existing CLI.
2. Add provider-router interfaces without changing runtime behavior.
3. Add `.openrock/policy.example.toml` docs.
4. Add `openrock plan` command that runs read-only repo analysis.
5. Add a session trace format proposal.

Recommended first real code change:

- Implement `openrock` as an alias binary to `openclaw`, guarded with a clear experimental banner.

This gives the rename a visible start while avoiding a giant breaking migration.

## Non-goals for now

- Do not delete `openclaw` naming yet.
- Do not rename config directories yet.
- Do not change npm package name yet.
- Do not add invasive dependencies yet.
- Do not promise autonomous deployment or external account actions without explicit permission gates.

## Success criteria

OPENROCK is successful when it can:

- Understand a large repo quickly.
- Plan before editing.
- Patch safely.
- Run the right verification.
- Recover from mistakes.
- Explain every risky action.
- Route across models intelligently.
- Work locally, remotely, and from mobile supervision.
- Keep user secrets and accounts safe.
- Make shipping software feel faster without turning the terminal into a haunted slot machine.
