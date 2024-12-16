# README for developer of this package

## setup

```sh
npm install --frozen-lockfile
```

## go-task-cli

### build

```sh
# build and pack
(cd packages/go-task-cli/ && npx task build-and-pack)

# build and pack with specific version
(cd packages/go-task-cli/ && npx task build-and-pack-with-version -- 3.40.1-gtc.1)
```

### test

```sh
(cd packages/go-task-cli/ && npx task run-tests)
```

### publish go-task-cli

```sh
# publish
(cd packages/go-task-cli/ && npx task publish)

# publish with specific version
(cd packages/go-task-cli/ && npx task publish-with-version -- 3.40.1-gtc.1)
```

## setup-go-task-cli

### build and link

```sh
# build and pack
(cd packages/setup-go-task-cli/ && npx task build-and-pack)

# link
(cd packages/setup-go-task-cli/ && npx task link)

# unlink
(cd packages/setup-go-task-cli/ && npx task unlink)
```

After link you can test the package in some packages for test.

```sh
(cd some-test-package && npm unlink @ryusuke410/setup-go-task-cli && npm link @ryusuke410/setup-go-task-cli)
npx @ryusuke410/setup-go-task-cli
```

### update go task cli

```sh
(cd packages/setup-go-task-cli/ && npx task update-go-task-cli)
```

### publish setup-go-task-cli

```sh
(cd packages/setup-go-task-cli/ && npx task publish)

# dry-run
(cd packages/setup-go-task-cli/ && npx task publish-dry-run)
```
