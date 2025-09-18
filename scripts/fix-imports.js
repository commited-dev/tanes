import { readdir, readFile, writeFile } from "fs/promises";
import path from "path";

const distDir = path.resolve("./dist");

async function processFile(filePath) {
  let content = await readFile(filePath, "utf8");
  // Replace `.ts` imports with `.js`
  content = content.replace(/from\s+["'](.*)\.ts["']/g, 'from "$1.js"');
  await writeFile(filePath, content, "utf8");
}

async function processDirectory(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile() && entry.name.endsWith(".js")) {
      await processFile(fullPath);
    }
  }
}

await processDirectory(distDir);
console.log("✅ Fixed imports in dist/");
