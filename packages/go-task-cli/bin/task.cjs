#!/usr/bin/env node
const { env, version, release } = process;

const binPath = "@ryusuke410/go-task-cli/task-bin/dummy-bin.sh";

if (binPath) {
	const packageManager = detectPackageManager();
	const result = require("child_process").spawnSync(
		require.resolve(binPath),
		process.argv.slice(2),
		{
			shell: false,
			stdio: "inherit",
			env: {
				...env,
				JS_RUNTIME_VERSION: version,
				JS_RUNTIME_NAME: release.name,
				...(packageManager != null
					? { NODE_PACKAGE_MANAGER: packageManager }
					: {}),
			},
		},
	);

	if (result.error) {
		throw result.error;
	}

	process.exitCode = result.status;
} else {
	console.error(
		"The Task package doesn't ship with prebuilt binaries for your platform yet."
	);
	process.exitCode = 1;
}

/**
 * NPM, Yarn, and other package manager set the `npm_config_user_agent`. It has the following format:
 *
 * ```
 * "npm/8.3.0 node/v16.13.2 win32 x64 workspaces/false
 * ```
 *
 * @returns The package manager string (`npm/8.3.0`) or null if the user agent string isn't set.
 */
function detectPackageManager() {
	const userAgent = env.npm_config_user_agent;

	if (userAgent == null) {
		return null;
	}

	return userAgent.split(" ")[0];
}