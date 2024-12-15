import * as path from "node:path";

import fs from "fs-extra";
import { Service } from "./domain";

const copyGoTaskCli = async (packagePath: string) => {
  const sourcePackageJsonPath = require.resolve("@ryusuke410/setup-go-task-cli/package.json");
  const sourceDir = path.join(path.dirname(sourcePackageJsonPath), "go-task-cli");
  await fs.ensureDir(packagePath);
  await fs.copy(sourceDir, packagePath);
}

const updatePackageJson = async (version: string, packagePath: string, packageName: string) => {
  const packageJsonPath = path.join(packagePath, "package.json");
  const packageJson = await fs.readJSON(packageJsonPath);
  packageJson.name = packageName;
  packageJson.version = version;
  await fs.writeJSON(packageJsonPath, packageJson, { spaces: 2 });
}

const updateRootPackageJson = async (packageName: string, packagePath: string, asDependency: boolean) => {
  const packageJsonPath = "package.json";
  const packageJson = await fs.readJSON(packageJsonPath);
  const deps = (() => {
    const depsKey = asDependency ? "dependencies" : "devDependencies";
    const deps = packageJson[depsKey];
    if (deps !== undefined) {
      return deps
    }
    const newDeps = {};
    packageJson[depsKey] = newDeps;
    return newDeps
  })();
  deps[packageName] = `file:${packagePath}`;
  await fs.writeJSON(packageJsonPath, packageJson, { spaces: 2 });
}

const updatePackagePathInFile = async (filePath: string, packageName: string, packagePath: string) => {
  const fileFullPath = path.join(packagePath, filePath);
  const content = await fs.readFile(fileFullPath, "utf8");
  const replaced = content.replace(/@ryusuke410\/go-task-cli/g, packageName);
  await fs.writeFile(fileFullPath, replaced, "utf8");
}

export const service: Service = {
  async setupGoTaskCli(version: string, packageName: string, packagePath: string) {
    await copyGoTaskCli(packagePath);
    await updatePackageJson(version, packagePath, packageName);
    await updateRootPackageJson(packageName, packagePath, false);
    for (const filePath of ["bin/task.cjs", "build/install.js"]) {
      await updatePackagePathInFile(filePath, packageName, packagePath);
    }
  }
}
