import path from "path";
import { fileURLToPath } from "url";

// ESM-safe __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const docPaths = [path.join(__dirname, "./*.ts")];
