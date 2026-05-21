# AI-assisted PR checklist

Use this checklist when a pull request was written or heavily shaped with Codex, Claude, ChatGPT, or another AI coding tool.

OpenClaw welcomes AI-assisted work, but reviewers still need a human-readable audit trail. The point is not to shame the robot. The point is to avoid merging code nobody understands, which is how software becomes haunted furniture.

## Before opening the PR

- Read the changed files end to end.
- Confirm the change is limited to one issue, bug, or feature.
- Remove unused files, debug logs, temporary scripts, and generated noise.
- Run the smallest relevant test first, then the broader checks when practical.
- Check that no secrets, tokens, local paths, or private screenshots were added.
- Confirm new network calls, filesystem access, subprocess execution, and permission changes are intentional.

## PR description

Include:

- The AI tool used.
- Whether the change was AI-assisted or mostly AI-generated.
- What you personally reviewed.
- What you personally tested.
- What you did not test.
- Any prompts or session notes that would help reviewers understand the approach.

Example:

```md
AI-assisted: yes, generated with Codex and manually edited.
Human review: read all changed files and simplified the error handling path.
Tested: pnpm test:fast and manual onboarding smoke test on macOS.
Not tested: Windows/WSL2 setup.
Notes: asked the model to keep the PR scoped to onboarding error messages only.
```

## Reviewer focus areas

For AI-assisted PRs, reviewers should pay special attention to:

- Scope creep hidden inside unrelated refactors.
- New dependencies that are not needed.
- Error handling that looks confident but drops important context.
- Security-sensitive changes around auth, tools, channel input, command execution, storage, or networking.
- Tests that assert implementation details instead of user-visible behavior.
- Documentation that promises support beyond what the code actually does.

## Good AI-assisted PR behavior

A strong AI-assisted PR is small, tested, explained, and easy to revert.

A weak AI-assisted PR is huge, vague, full of unrelated cleanup, and says `tested by CI` when CI has not run yet. That is not engineering. That is outsourcing suspense.