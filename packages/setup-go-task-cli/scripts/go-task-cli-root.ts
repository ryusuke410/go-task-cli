import path from "node:path";

const packageJsonPath = require.resolve("@ryusuke410/go-task-cli/package.json");
export const packageRoot = path.dirname(packageJsonPath);
