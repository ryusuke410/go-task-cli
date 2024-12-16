# @ryusuke410/go-task-cli

This package installs Task (Taskfile) locally.

The official npm installer for Task **only** supports global installation, making it **impossible** to install Task locally in a project via npm.

## Usage

Install the installer package that corresponds to the version of Task you want to use.

For example, if you install the installer package for version `3.40.1-gtc.1`, Task version `3.40.1` will be installed. (The version installed will be the one without the `gtc.x` part.)

```sh
npm install --save-dev @ryusuke410/go-task-cli@3.40.1-gtc.1
```

```sh
npx task --version
```
