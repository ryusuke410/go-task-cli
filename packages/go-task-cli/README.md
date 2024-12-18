# @ryusuke410/go-task-cli

This package installs Task (Taskfile) locally.

The official npm installer for Task **only** supports global installation, making it **impossible** to install Task locally in a project via npm.

## Usage

Install the installer package that corresponds to the version of Task you want to use.

For example, if you install the installer package for version `3.40.1-gtc.2`, Task version `3.40.1` will be installed. (The version installed will be the one without the `gtc.x` part.)

(If you're using Bun, special steps are required; please follow the instructions provided later in this document.)

```sh
npm install --save-dev @ryusuke410/go-task-cli@3.40.1-gtc.2
```

```sh
npx task --version
```

Here's how to add this package in Bun:

```sh
bun add @ryusuke410/go-task-cli@3.40.1-gtc.2 && bun pm trust @ryusuke410/go-task-cli && bun install
bun task --version
```
