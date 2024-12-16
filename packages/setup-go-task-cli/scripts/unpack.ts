import * as path from "node:path";

import * as tar from 'tar';
import fs from "fs-extra"

import { packageVersion } from "./package-version";
import { packageRoot } from "./go-task-cli-root";

const unpack = async () => {
  const tarGzPath = path.join(packageRoot, "releases", `ryusuke410-go-task-cli-${packageVersion}.tgz`);
  const goTaskDir = "go-task-cli";
  await fs.ensureDir(goTaskDir);

  const filterPrefix = "package/";
  await tar.x({
    file: tarGzPath,
    cwd: goTaskDir,
    filter: (filePath) => {
        return filePath.startsWith(filterPrefix);
    },
    strip: filterPrefix.split('/').length - 1,
  });
}

unpack();
