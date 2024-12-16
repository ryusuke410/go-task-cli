# README for developer of this package

## setup

```sh
npm install --frozen-lockfile
```

## setup-go-task-cli

### build and link

```sh
# build and pack
(cd packages/setup-go-task-cli/ && ../../task-bin/task build-and-pack)

# link
(cd packages/setup-go-task-cli/ && ../../task-bin/task link)

# unlink
(cd packages/setup-go-task-cli/ && ../../task-bin/task unlink)
```

After link you can test the package in some packages for test.

```sh
(cd some-test-package && npm unlink @ryusuke410/setup-go-task-cli && npm link @ryusuke410/setup-go-task-cli)
npx @ryusuke410/setup-go-task-cli
```

### update go task cli

```sh
(cd packages/setup-go-task-cli/ && ../../task-bin/task update-go-task-cli)
```

### publish

```sh
(cd packages/setup-go-task-cli/ && ../../task-bin/task update-go-task-cli)
```
