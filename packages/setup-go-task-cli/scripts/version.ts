import semver from "semver";

export const removeGtcFromVersion = (version: string) => {
  const parsedVersion = semver.parse(version);
  if (!parsedVersion) {
    throw new Error(`Invalid version: ${version}`);
  }
  const newPrerelease = (() => {
    const gtc = parsedVersion.prerelease.slice(-2);
    if (gtc.length !== 2 || gtc[0] !== "gtc") {
      return parsedVersion.prerelease;
    }
    return parsedVersion.prerelease.slice(0, -2);
  })();

  return formatVersion({
    ...parsedVersion,
    prerelease: newPrerelease,
  });
}

const formatVersion = ({
  major,
  minor,
  patch,
  prerelease,
  build,
}: {
  major: number;
  minor: number;
  patch: number;
  prerelease: readonly (string | number)[];
  build: readonly (string | number)[];
}) => {
  const prereleaseString = prerelease.length > 0 ? `-${prerelease.join(".")}` : ""
  const buildString = build.length > 0 ? `+${build.join(".")}` : ""
  return `${major}.${minor}.${patch}${prereleaseString}${buildString}`
}

