import { Command } from 'commander';

import { PackageJsonOverride } from "./package-json-override";
import { repoRoot } from "./root";
import { i$ } from "./sh";

const main = async () => {
  const program = new Command();
  program
  .option('--version-override <version>', 'Override the version')

  await program.parseAsync();
  await publish(program.opts().versionOverride);
}

const publish = async (versionOverride?: string) => {
  await using _ = await PackageJsonOverride.create(repoRoot, versionOverride);
  await i$`npm publish --access public`.cwd(repoRoot);
}

main()
