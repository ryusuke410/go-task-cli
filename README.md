# go-task-cli

[![npm version](https://img.shields.io/npm/v/@ryusuke410/go-task-cli.svg)](https://www.npmjs.com/package/@ryusuke410/go-task-cli)
[![npm version](https://img.shields.io/npm/v/@ryusuke410/setup-go-task-cli.svg)](https://www.npmjs.com/package/@ryusuke410/setup-go-task-cli)

This project is designed to allow the local installation of Task (Taskfile) via npm.

The official npm installer for Task **only** supports global installation, making it **impossible** to install Task locally in a project via npm.

## Usage

Install the installer package that corresponds to the version of Task you want to use.

For example, if you install the installer package for version `3.40.1-gtc.0`, Task version `3.40.1` will be installed. (The version installed will be the one without the `gtc.x` part.)

(If you're using Bun, special steps are required; please follow the instructions provided later in this document.)

```sh
npm install --save-dev @ryusuke410/go-task-cli@3.40.1-gtc.0
```

```sh
npx task --version
```

Here's how to add this package in Bun:

```sh
bun add @ryusuke410/go-task-cli@3.40.1-gtc.2 && bun pm trust @ryusuke410/go-task-cli && bun install
bun task --version
```

## Manual Install

In most cases, @ryusuke410/go-task-cli should be sufficient. However, if there are issues with the package or you need to manually add sub-packages to your project, follow the steps below.

To set up such a configuration manually, use the following command within your project:

```sh
npx @ryusuke410/setup-go-task-cli@latest
```

After that, you can make adjustments to the installation script as needed.
