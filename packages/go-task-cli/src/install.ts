import * as fs from "node:fs";
import * as path from "node:path";

const packageJsonPath = require.resolve("@ryusuke410/go-task-cli/package.json");
const packageRoot = path.dirname(packageJsonPath);
const binDir = path.join(packageRoot, "task-bin");
if (!fs.existsSync(binDir)) {
  fs.mkdirSync(binDir, { recursive: true });
  console.log(`Created directory: ${binDir}`);
} else {
  console.log(`Directory already exists: ${binDir}`);
}

const sourceFile = path.join(packageRoot, "dummy", "dummy-bin.sh");
const destinationFile = path.join(binDir, "dummy-bin.sh");

if (fs.existsSync(sourceFile)) {
  fs.copyFileSync(sourceFile, destinationFile);
  console.log(`Copied ${sourceFile} to ${destinationFile}`);
} else {
  console.error(`Source file does not exist: ${sourceFile}`);
  process.exit(1);
}
