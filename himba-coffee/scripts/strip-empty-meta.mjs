import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

const OUT = join(process.cwd(), "out");

/**
 * Next.js injects an empty next-size-adjust meta (HTML + RSC payload).
 * Strip both so deployed Pages HTML stays clean.
 */
function clean(html) {
  return (
    html
      // Static HTML tag
      .replace(/<meta\s+name="next-size-adjust"\s+content=""\s*\/?>/gi, "")
      // Escaped RSC flight payload inside <script>
      .replace(
        /,?\["\$","meta",null,\{"name":"next-size-adjust","content":""\}\]/g,
        "",
      )
      // Double-escaped form in some chunk payloads
      .replace(
        /,?\[[\\]*"\$[\\]*",[\\]*"meta[\\]*",null,\{[\\]*"name[\\]*":[\\]*"next-size-adjust[\\]*",[\\]*"content[\\]*":[\\]*"[\\]*"\}\]/g,
        "",
      )
  );
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      walk(path);
      continue;
    }
    if (!name.endsWith(".html")) continue;
    const before = readFileSync(path, "utf8");
    const after = clean(before);
    if (after !== before) writeFileSync(path, after);
  }
}

walk(OUT);
console.log("Stripped empty next-size-adjust meta from out/");
