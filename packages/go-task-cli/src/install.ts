#!/usr/bin/env node

import * as fs from "node:fs";
import * as path from "node:path";

import * as tar from 'tar';

import { goArchOfNode, goOsOfNode } from "./go";
import { TempDir } from "./temp-dir";
import { hashSha256Verify } from "./hash";
import { downloadFile } from "./download";

const mainBare = async () => {
  const packageJsonPath = require.resolve(
    "@ryusuke410/go-task-cli/package.json"
  );
  const packageRoot = path.dirname(packageJsonPath);
  const binDir = path.join(packageRoot, "task-bin");
  ensureDirSync(binDir);

  const { version } = readPackageJson(packageJsonPath);
  await installTaskBinary(version, binDir);
};

const installTaskBinary = async (version: string, targetDir: string) => {
  const owner = "go-task";
  const repo = "task";
  const binary = "task";
  const format = "tar.gz";
  const os = goOsOfNode(process.platform);
  const arch = goArchOfNode(process.arch);
  const githubDownload = `https://github.com/${owner}/${repo}/releases/download`;
  const name = `${binary}_${os}_${arch}`;
  const tarball = `${name}.${format}`;
  const tarballUrl = `${githubDownload}/v${version}/${tarball}`;
  const checksum = `${binary}_checksums.txt`;
  const checksumUrl = `${githubDownload}/v${version}/${checksum}`;

  await using tempDir = await TempDir.create("task-");
  const tempTarball = path.join(tempDir.path, tarball);
  const tempChecksum = path.join(tempDir.path, checksum);
  await Promise.all([downloadFile(tarballUrl, tempTarball), downloadFile(checksumUrl, tempChecksum)]);
  hashSha256Verify(tempTarball, tempChecksum);
  await tar.x({
    file: tempTarball,
    cwd: targetDir,
  });
};

type PackageJson = {
  version: string;
};

const readPackageJson = (filePath: string): PackageJson => {
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content);
};

const ensureDirSync = (path: string) => {
  if (fs.existsSync(path)) {
    return;
  }
  fs.mkdirSync(path, { recursive: true });
};

const main = async () => {
  try {
    await mainBare();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

main();
