#!/usr/bin/env node

import inquirer from "inquirer";
import * as ip from "@inquirer/prompts";
import { consola } from "consola";

import { service } from "./infrastructure";
import { createSetupGoTaskCliUsecase, SetupGoTaskCliUsecaseInput } from "./usecases";
import { defaultVersion, defaultPackageName, defaultPackagePath, defaultAsDependency } from "./domain";

type SetupGoTaskCliInput = {
  version?: string;
  packageName?: string;
  packagePath?: string;
  asDependency?: boolean;
}

const setupGoTaskCli = async (input: SetupGoTaskCliInput) => {
  const usecase = createSetupGoTaskCliUsecase(service);
  await usecase.execute(SetupGoTaskCliUsecaseInput.parse(input));
}

const cliBare = async () => {
  const confirm = await ip.confirm({
    message: "Do you want to setup Task CLI installer here?",
  })

  if (!confirm) {
    consola.info("Aborted.");
    return
  }

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "version",
      message: "What version of Task do you want to install?",
      default: defaultVersion,
    },
    {
      type: "input",
      name: "packagePath",
      message: "Where do you want to install the package?",
      default: defaultPackagePath,
    },
    {
      type: "input",
      name: "packageName",
      message: "What is the name of the package?",
      default: defaultPackageName,
    },
    {
      type: "confirm",
      name: "asDependency",
      message: "Do you want to install this package as a dependency?",
      default: defaultAsDependency,
    }
  ]);

  await setupGoTaskCli(answers);

  consola.info("Setup completed.");
  consola.info("To install the package, use a command like 'npm install', 'yarn', 'bun install', and so on.");
  consola.info("After installing the package, you have task executable in Node bin directory.");
  consola.info("Run 'npx task --help' to see all available commands.");
}

const cli = async () => {
  try {
    await cliBare();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

cli();
