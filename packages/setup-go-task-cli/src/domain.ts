import * as goTaskCliPackageJson from "./go-task-cli-package.json";
import * as setupGoTaskCliPackageJson from "../override/package.json";

export const defaultVersion = goTaskCliPackageJson.version;
export const defaultPackageName = setupGoTaskCliPackageJson.name;
export const defaultPackagePath = `./${setupGoTaskCliPackageJson.name}`;
export const defaultAsDependency = false;

export interface Service {
  setupGoTaskCli(version: string, packageName: string, packagePath: string): Promise<void>
}
