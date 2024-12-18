# README for developer of this package

## setup

```sh
npm install --frozen-lockfile
```

## go-task-cli

### build and link go-task-cli

```sh
# build and pack
npx task cli:build-and-pack

# build and pack with specific version
npx task cli:build-and-pack-with-version -- 3.40.1-gtc.2

# link
npx task cli:link

# unlink
npx task cli:unlink
```

### test

```sh
npx task cli:run-tests
```

### publish go-task-cli

```sh
# publish
npx task cli:publish

# publish with specific version
npx task cli:publish-with-version -- 3.40.1-gtc.2
```

## setup-go-task-cli

### build and link setup-go-task-cli

```sh
# build and pack
npx task setup:build-and-pack

# link
npx task setup:link

# unlink
npx task setup:unlink
```

After link you can test the package in some packages for test.

```sh
(cd some-test-package && npm unlink @ryusuke410/setup-go-task-cli && npm link @ryusuke410/setup-go-task-cli)
npx @ryusuke410/setup-go-task-cli
```

### update go task cli

```sh
npx task setup:update-go-task-cli
```

### publish setup-go-task-cli

```sh
npx task setup:publish

# dry-run
npx task setup:publish-dry-run
```
