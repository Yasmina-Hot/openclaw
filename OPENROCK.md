# OPENROCK

OPENROCK is the new experimental direction for this fork.

It keeps the existing OpenClaw engine alive while the product identity, CLI, policy system, provider routing, agent workbench, and docs migrate in stages.

## Current status

- The existing `openclaw` CLI remains the stable runtime.
- `openrock.mjs` exists as an experimental wrapper around the current runtime.
- `OPENROCK_EXPERIMENTAL=1` marks sessions launched through the new wrapper.
- The long-term roadmap lives in `docs/strategy/openrock-roadmap.md`.

## Why not delete everything

OpenClaw already contains a large working gateway, CLI, channel system, app/node ecosystem, docs, skills, and tests. Deleting it would throw away useful infrastructure before OPENROCK has replacements.

The better path is:

1. Preserve the working engine.
2. Add the OPENROCK entrypoints.
3. Build new agent features behind experimental flags.
4. Add compatibility shims.
5. Migrate package/config/docs naming only after the new flow works.

## Near-term build plan

### Phase 1: Identity layer

- Add `openrock.mjs` as an experimental entrypoint.
- Add docs explaining the rebrand and migration path.
- Keep `openclaw` working.

### Phase 2: Policy layer

- Add an example `.openrock/policy.toml`.
- Define command, network, file-write, and secret-handling rules.

### Phase 3: Provider router

- Add typed provider interfaces.
- Add routing profiles: `best`, `fast`, `cheap`, `private`, `review`, and `vision`.
- Support OpenAI, Anthropic, Gemini, Qwen, OpenRouter, and local OpenAI-compatible servers.

### Phase 4: Agent workbench

- Add repo analysis.
- Add structured plans.
- Add checkpoints and rollback.
- Add replayable traces.

### Phase 5: Full rename

Only after compatibility is stable:

- Package metadata.
- Binary aliases.
- Config directory migration.
- Service names.
- Website/docs references.
- Installers and release scripts.

## Rule

Build OPENROCK like a serious agent platform, not like a weekend rename spree. Rename safely, migrate intentionally, and keep the working engine intact until the replacement is stronger.
