import { PackageJsonOverride } from "./package-json-override";
import { repoRoot } from "./root";
import { i$ } from "./sh";

const pack = async () => {
  await using _ = await PackageJsonOverride.create(repoRoot);
  await i$`mkdir -p releases && npm pack --pack-destination releases`.cwd(repoRoot);
}

pack()
