Antigravity ACP is a Paseo provider plugin that talks to the Antigravity CLI through the Agent Client Protocol, so a reopened conversation shows its full history instead of an empty panel.

Paseo's built-in Antigravity provider resumes the conversation inside `agy` but never replays past messages, because `agy` does not expose them through its stream-json CLI. The `agy` install ships a second ACP binary, and that mode supports `session/load`: when Paseo reopens a session, the agent replays every earlier message before the load call returns. Paseo's ACP client already implements this, so history works with no custom transcript storage.

Requires the Antigravity CLI (`agy`) installed and signed in on the daemon host, and Paseo 0.13.1 or later. The plugin registers a provider named Antigravity (ACP), which sits beside the built-in Antigravity provider instead of replacing it. Pick it when you create an agent.

The ACP binary is located at `%LOCALAPPDATA%\agy\bin\agy-acp-windows-x64.exe` on Windows, `~/.agy/bin/agy-acp` or `~/.local/bin/agy-acp` on Unix, and finally on `PATH`. Set `AGY_ACP_BIN` to point at it explicitly. History comes from `agy`'s own session store, so sessions created with the built-in provider, or before this plugin was installed, are not visible here.
