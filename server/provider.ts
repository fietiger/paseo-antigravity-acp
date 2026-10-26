import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { runAcpProvider } from "@getpaseo/plugin/server/acp";
import type { ProviderRegistration } from "@getpaseo/plugin/server/provider";

const BINARY_NAME = process.platform === "win32" ? "agy-acp-windows-x64.exe" : "agy-acp";

/**
 * The Antigravity CLI ships a separate ACP entry point next to the main binary.
 * It is looked up in the per-platform install locations, then on PATH.
 */
function resolveBinary(): string {
  const explicit = process.env.AGY_ACP_BIN?.trim();
  if (explicit && explicit.length > 0) return explicit;

  const localAppData = process.env.LOCALAPPDATA;
  const candidates = [
    localAppData ? path.join(localAppData, "agy", "bin", BINARY_NAME) : null,
    path.join(os.homedir(), ".agy", "bin", BINARY_NAME),
    path.join(os.homedir(), ".local", "bin", BINARY_NAME),
    path.join("/usr/local/bin", BINARY_NAME),
    path.join("/opt/homebrew/bin", BINARY_NAME),
  ];

  for (const candidate of candidates) {
    if (candidate !== null && fs.existsSync(candidate)) return candidate;
  }
  return BINARY_NAME;
}

export function createAntigravityAcpProvider(): ProviderRegistration {
  return runAcpProvider({
    id: "antigravity-acp",
    label: "Antigravity (ACP)",
    description: "Antigravity CLI over ACP. Reopened sessions replay their full conversation history.",
    icon: "icon.svg",
    command: [resolveBinary()],
  });
}
