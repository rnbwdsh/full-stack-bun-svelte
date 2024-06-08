# Full-stack-bun-pocketbase-svelte

## Requirements

This project runs with node.js or bun as a server. You can replace any "bun" statement with "node" in the following.

To install, you just run `bun i`, to start the pocketbase server, run `bun run pocketbase` and to run the main app, run `bun run dev`.

## Workarounds

As pocketbase exposes itself at port 8090 and ollama exposes itself at port 11434, we need a reverse proxy - which is a feature that sveltekits vite supports via the `vite.config.ts`.

The exposed "_" url is 