#!/usr/bin/env bash

script_dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
repo_root=$(cd "${script_dir}/../.." && pwd)
version="3.40.1"

cd "${repo_root}"

if [ -f "./task-bin/task" ]; then
  exit 0
fi

# TODO バージョンチェックを入れる

if [ ! -f "./task-bin/task" ]; then
  mkdir -p ./task-bin
  # -b オプションは利きませんでした。
  sh -c "$(curl --location https://taskfile.dev/install.sh)" -- -d v${version}
  mv ./bin/task ./task-bin
fi
