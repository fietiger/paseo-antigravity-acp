# paseo-antigravity-acp

A Paseo provider plugin for the Antigravity CLI (`agy`) that keeps your conversation history when you reopen an agent.

## Why

Paseo's built-in Antigravity provider restores the session inside `agy` but always starts with an empty transcript. `agy`'s stream-json CLI has no "replay past messages" request, so the provider has nothing to draw.

`agy` also ships an ACP binary. That mode supports `session/load`, which replays the whole conversation before returning. Paseo's ACP client already calls it and feeds the replayed messages into the timeline. This plugin just registers that binary as a Paseo provider.

## Requirements

- Paseo 0.13.1 or later
- Antigravity CLI (`agy`) installed and signed in on the daemon host

## Install

```bash
paseo plugin install github:fietiger/paseo-antigravity-acp
```

Or from a local checkout:

```bash
paseo plugin install /absolute/path/to/paseo-antigravity-acp
```

Then create an agent and pick **Antigravity (ACP)**.

## Binary lookup

The plugin looks for the ACP entry point in this order:

1. `$AGY_ACP_BIN`
2. `%LOCALAPPDATA%\agy\bin\agy-acp-windows-x64.exe` (Windows)
3. `~/.agy/bin/agy-acp`, `~/.local/bin/agy-acp`, `/usr/local/bin/agy-acp`, `/opt/homebrew/bin/agy-acp`
4. `agy-acp` on `PATH`

## Limits

History comes from `agy`'s own session store, so it only covers sessions created through this provider. Sessions created with the built-in Antigravity provider are not visible here — `session/load` returns `Resource not found` for them.

## Development

```bash
npm install
npm run typecheck
paseo plugin install .
paseo plugin ls
```

## License

MIT
