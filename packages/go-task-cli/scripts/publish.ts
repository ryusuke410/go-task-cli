import { PackageJsonOverride } from "./package-json-override";
import { repoRoot } from "./root";
import { i$ } from "./sh";

const publish = async () => {
  await using _ = await PackageJsonOverride.create(repoRoot);
  await i$`npm publish --access public`.cwd(repoRoot);
}

publish()
