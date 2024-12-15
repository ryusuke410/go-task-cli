// Mapping from Node's `process.arch` to Golang's `$GOARCH`
const archMapping = {
  ia32: "386",
  x64: "amd64",
  arm: "arm",
  arm64: "arm64",
} as const;

// Mapping between Node's `process.platform` to Golang's `$GOARCH`
const platformMapping = {
  darwin: "darwin",
  linux: "linux",
  win32: "windows",
  freebsd: "freebsd",
} as const;

export const goArchOfNode = (arch: unknown) => {
  if (typeof arch !== "string") {
    throw new Error(`Expected string, got ${typeof arch}`);
  }
  const goArch = archMapping[arch as keyof typeof archMapping];
  if (goArch === undefined) {
    throw new Error(`Unknown architecture: ${arch}`);
  }
  return goArch;
};

export const goOsOfNode = (platform: unknown) => {
  if (typeof platform !== "string") {
    throw new Error(`Expected string, got ${typeof platform}`);
  }
  const goOs = platformMapping[platform as keyof typeof platformMapping];
  if (goOs === undefined) {
    throw new Error(`Unknown platform: ${platform}`);
  }
  return goOs;
};
