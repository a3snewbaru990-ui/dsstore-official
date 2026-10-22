import fs from "node:fs";
import path from "node:path";

const walk = (d) =>
  fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]
  );

const files = walk("src").filter((f) => /\.tsx?$/.test(f));
const re = /(bg-lemon|bg-gold|bg-paper|bg-white|text-lemon|text-gold|bg-paper)/;

for (const f of files) {
  const lines = fs.readFileSync(f, "utf8").split(/\r?\n/);
  lines.forEach((l, i) => {
    if (re.test(l)) {
      console.log(`${f.replace(/\\/g, "/")}:${i + 1}: ${l.trim().slice(0, 150)}`);
    }
  });
}
