import type { PluginClientContext } from "@getpaseo/plugin/client";

/**
 * MOSS theme for Paseo. Palette from tokens/moss.json (SPEC.md v0.2).
 *
 * Only the 8 seed colors are supplied; Paseo expands them into the full token
 * set (surfaces, status, diff, syntax, terminal, shadows) using `appearance`.
 */

// bg #0D0F0C · overlay #1B1F1A · border #272C24 · moss #7E9273 · muted #70766B
// fg #D7D9D2
const dark = {
  background: "#0D0F0C",
  foreground: "#D7D9D2",
  raised: "#1B1F1A",
  control: "#272C24",
  border: "#272C24",
  accent: "#7E9273",
  mutedForeground: "#70766B",
  ring: "#70766B",
};

export default function contribute(client: PluginClientContext) {
  client.addTheme({
    id: "moss",
    name: "MOSS",
    appearance: "dark",
    colors: dark,
  });
  return () => {};
}
