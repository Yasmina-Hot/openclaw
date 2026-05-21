#!/usr/bin/env node

process.env.OPENROCK_EXPERIMENTAL ??= "1";
process.env.OPENCLAW_BRAND_ALIAS ??= "openrock";

await import("./openclaw.mjs");
