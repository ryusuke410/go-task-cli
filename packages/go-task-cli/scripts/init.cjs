const fs = require("fs");
const path = require("path");

const packageJsonPath = require.resolve("@ryusuke410/go-task-cli/package.json");
const packageRoot = path.dirname(packageJsonPath);
const devOnlyPath = path.join(packageRoot, "dev-only.txt");
const isDev = fs.existsSync(devOnlyPath);

if (isDev) {
  process.exit(0);
}

const installScriptPath = path.join(packageRoot, "build", "install.js");
require(installScriptPath);
