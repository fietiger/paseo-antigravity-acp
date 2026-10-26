import type { PluginServerContext } from "@getpaseo/plugin/server";
import { createAntigravityAcpProvider } from "./server/provider";

export default function contribute(server: PluginServerContext) {
  server.registerProvider(createAntigravityAcpProvider());
  return () => {};
}
