import { z } from "zod";

import { defaultAsDependency, defaultPackageName, defaultPackagePath, defaultVersion, Service } from "./domain";

export const SetupGoTaskCliUsecaseInput = z.object({
  version: z.string().default(defaultVersion),
  packageName: z.string().default(defaultPackageName),
  packagePath: z.string().default(defaultPackagePath).transform((val) => {
    const removeTrailingSlash = (str: string) => str.endsWith("/") ? str.slice(0, -1) : str;
    const appendDotSlash = (str: string) => str.startsWith("./") ? str : `./${str}`;
    return removeTrailingSlash(appendDotSlash(val));
  }),
  asDependency: z.boolean().default(defaultAsDependency),
});

export type SetupGoTaskCliUsecaseInput = z.infer<typeof SetupGoTaskCliUsecaseInput>;

export interface SetupGoTaskCliUsecase {
  execute(input: SetupGoTaskCliUsecaseInput): Promise<void>
}

export const createSetupGoTaskCliUsecase = (service: Service): SetupGoTaskCliUsecase => ({
  async execute(input) {
    await service.setupGoTaskCli(input.version, input.packageName, input.packagePath);
  }
})
