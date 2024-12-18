import * as path from "node:path";

import fs from "fs-extra";

import { removeGtcFromVersion } from "./version";

const main = async () => {
  if (process.argv.length < 2) {
    throw new Error("Usage: npm exec -- tsx ./scripts/remove-gtc-from-go-task-cli-package.ts <path/to/package.json>");
  }
  const scriptPath = process.argv.slice(-2)[0];
  if (path.basename(scriptPath) !== "remove-gtc-from-go-task-cli-package.ts") {
    throw new Error("Usage: npm exec -- tsx ./scripts/remove-gtc-from-go-task-cli-package.ts <path/to/package.json>");
  }
  const jsonPath = process.argv.slice(-1)[0];
  const jsonData = await fs.readJson(jsonPath);
  const version = jsonData.version;
  if (typeof version !== "string") {
    throw new Error(`Invalid version: ${version}`);
  }
  jsonData.version = removeGtcFromVersion(version);
  await fs.writeJson(jsonPath, jsonData, { spaces: 2 });
}

main();
