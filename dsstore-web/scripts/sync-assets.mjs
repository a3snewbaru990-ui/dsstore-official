/**
 * Copy the website's shared image assets into the app folder so the Vite dev
 * server can serve them at `/assets/...` (the same relative paths the built
 * page uses at the website root).
 *
 * The copy is a dev convenience only - it is git-ignored, and the production
 * bundle always references the originals in the website root's `assets/`.
 */
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(here, "..");
const source = resolve(projectRoot, "..", "assets");
const target = join(projectRoot, "assets");

if (!existsSync(source)) {
  console.error(`[sync-assets] source not found: ${source}`);
  process.exit(1);
}

rmSync(target, { recursive: true, force: true });
mkdirSync(target, { recursive: true });
cpSync(source, target, { recursive: true });
console.log(`[sync-assets] ${source} -> ${target}`);
