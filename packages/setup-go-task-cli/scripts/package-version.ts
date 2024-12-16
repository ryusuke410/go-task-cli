import { z } from "zod"

const PackageJson = z.object({
  version: z.string(),
}).passthrough()

const packageJson = PackageJson.parse(require("@ryusuke410/go-task-cli/package.json"));

export const packageVersion = packageJson.version
