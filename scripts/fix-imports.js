import fs from "fs";
import path from "path";

const distDir = path.join(process.cwd(), "dist");

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith(".js")) {
      let content = fs.readFileSync(fullPath, "utf-8");
      // replace .ts imports with .js
      content = content.replace(/(from\s+['"]\.\/.*?)(\.ts)(['"])/g, "$1.js$3");
      fs.writeFileSync(fullPath, content, "utf-8");
    }
  }
}

walk(distDir);
console.log("✅ Fixed .ts imports to .js in dist/");
