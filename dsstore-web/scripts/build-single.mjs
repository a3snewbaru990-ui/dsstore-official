/**
 * Bundle the React app into a single, self-contained index.html for the website.
 *
 * Pipeline (mirrors the web-artifacts-builder skill):
 *   1. Parcel builds index.html -> dist/
 *   2. The remote Google Fonts stylesheet is turned into an @import so it can
 *      survive html-inline (which cannot fetch remote CSS).
 *   3. html-inline inlines the CSS + JS into the HTML.
 *
 * Images are NOT inlined: the page references the website's original
 * `assets/...` files directly, so the originals stay untouched and the browser
 * can cache them separately.
 *
 * Usage: node scripts/build-single.mjs [--out <path>]
 */
import { execSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(here, "..");
const websiteRoot = resolve(projectRoot, "..");
const distDir = join(projectRoot, "dist");

const outArgIndex = process.argv.indexOf("--out");
const outFile =
  outArgIndex !== -1 && process.argv[outArgIndex + 1]
    ? resolve(process.argv[outArgIndex + 1])
    : join(websiteRoot, "index.html");

const outDir = dirname(outFile);

/* ------------------------------------------------------------------ */
/* 1. Parcel build                                                     */
/* ------------------------------------------------------------------ */
console.log("[1/4] Building with Parcel...");
// Always start from a clean dist/ - Parcel skips rewriting files it believes
// are up to date, which would keep a stale (hand-edited) index.html around.
rmSync(distDir, { recursive: true, force: true });
execSync(
  "npx parcel build index.html --dist-dir dist --no-source-maps --public-url ./",
  { cwd: projectRoot, stdio: "inherit" },
);

/* ------------------------------------------------------------------ */
/* 2. Prepare the built HTML for html-inline                            */
/* ------------------------------------------------------------------ */
const distHtmlPath = join(distDir, "index.html");
let distHtml = readFileSync(distHtmlPath, "utf8");

// Remote stylesheets cannot be inlined by html-inline - turn them into @import.
distHtml = distHtml.replace(/<link\b[^>]*>/g, (tag) => {
  if (!/fonts\.googleapis\.com/.test(tag)) return tag;
  if (!/rel=["']?stylesheet/.test(tag)) return tag;
  const match = tag.match(/href=["']?([^"'\s>]+)/);
  if (!match) return tag;
  const url = match[1].replace(/&amp;/g, "&");
  return `<style>@import url("${url}");</style>`;
});

// An empty import map is dead weight - drop it.
distHtml = distHtml.replace(
  /<script type=importmap>\{[^<]*"imports":\{\}\}[^<]*<\/script>/,
  "",
);

writeFileSync(distHtmlPath, distHtml, "utf8");

/* ------------------------------------------------------------------ */
/* 3. Inline CSS + JS into one HTML file                               */
/* ------------------------------------------------------------------ */
console.log("[2/4] Inlining CSS + JavaScript...");
const bundlePath = join(distDir, "bundle.html");
execSync(
  "npx html-inline dist/index.html --ignore-images --ignore-links -o dist/bundle.html",
  { cwd: projectRoot, stdio: "inherit" },
);
const bundled = readFileSync(bundlePath, "utf8");

/* ------------------------------------------------------------------ */
/* 4. Write + verify                                                   */
/* ------------------------------------------------------------------ */
console.log("[3/4] Writing", outFile);
mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, bundled, "utf8");

const checks = [
  ["CSS inlined", /<style>[\s\S]*?--tw-/.test(bundled)],
  [
    "JS inlined",
    /<script[^>]+module[^>]*>[\s\S]{1000,}?<\/script>/.test(bundled),
  ],
  [
    "no local stylesheet link",
    !/<link[^>]+rel=stylesheet[^>]+href=(?!["']?http)/.test(bundled),
  ],
  ["no local <script src>", !/<script[^>]+src=/.test(bundled)],
  ["assets referenced", /(?:assets\/|ds-store-logo|banner-granger|hero-mlbb|favicon|rank\/)/.test(bundled)],
];
const failed = checks.filter(([, ok]) => !ok).map(([name]) => name);
if (failed.length) {
  throw new Error(`Bundle verification failed: ${failed.join(", ")}`);
}

const size = (statSync(outFile).size / 1024).toFixed(1);
console.log(`      -> ${outFile} (${size} KB)`);
console.log(`      -> ${checks.length} sanity checks passed`);
