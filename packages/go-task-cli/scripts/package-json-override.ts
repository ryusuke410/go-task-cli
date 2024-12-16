import * as path from "node:path";

import fs from "fs-extra";

export class PackageJsonOverride {
  readonly packagePath: string;
  readonly originalText: string;
  private constructor(packagePath: string, originalText: string) {
    this.packagePath = packagePath;
    this.originalText = originalText;
  }

  static async create(packagePath: string): Promise<PackageJsonOverride> {
    const originalText = await fs.readFile(path.join(packagePath, "package.json"), "utf-8");
    const packageJsonOverride = new PackageJsonOverride(packagePath, originalText);
    const originalData = JSON.parse(originalText);
    const overrideData = await fs.readJSON(path.join(packagePath, "package.publish-override.json"));
    const data = {
      ...originalData,
      ...overrideData,
    };
    try {
      await fs.writeJSON(path.join(packagePath, "package.json"), data, { spaces: 2 });
    } catch (error) {
      await packageJsonOverride.finalize();
      throw error;
    }
    return packageJsonOverride;
  }

  private async finalize() {
    await fs.writeFile(path.join(this.packagePath, "package.json"), this.originalText, "utf-8");
  }

  async [Symbol.asyncDispose]() {
    await this.finalize();
  }
}
