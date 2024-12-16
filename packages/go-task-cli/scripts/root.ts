import * as path from "node:path";

export const repoRoot = (() => {
  const packageJsonPath = require.resolve("@ryusuke410/go-task-cli/package.json")
  return path.dirname(packageJsonPath)
})()
