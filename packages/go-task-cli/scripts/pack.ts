import { Command } from 'commander';

import { PackageJsonOverride } from "./package-json-override";
import { repoRoot } from "./root";
import { i$ } from "./sh";

const main = async () => {
  const program = new Command();
  program
    .option('--version-override <version>', 'Override the version')

  await program.parseAsync();
  await pack(program.opts().versionOverride);
}

const pack = async (versionOverride?: string) => {
  await using _ = await PackageJsonOverride.create(repoRoot, versionOverride);
  await i$`mkdir -p releases && npm pack --pack-destination releases`.cwd(repoRoot);
}

main()
