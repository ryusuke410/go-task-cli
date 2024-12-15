"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/install.ts
var fs = __toESM(require("fs"));
var path = __toESM(require("path"));
var readme = require.resolve("@ryusuke410/go-task-cli/README.md");
var packageRoot = path.dirname(readme);
var binDir = path.join(packageRoot, "task-bin");
if (!fs.existsSync(binDir)) {
  fs.mkdirSync(binDir, { recursive: true });
  console.log(`Created directory: ${binDir}`);
} else {
  console.log(`Directory already exists: ${binDir}`);
}
var sourceFile = path.join(packageRoot, "dummy", "dummy-bin.sh");
var destinationFile = path.join(binDir, "dummy-bin.sh");
if (fs.existsSync(sourceFile)) {
  fs.copyFileSync(sourceFile, destinationFile);
  console.log(`Copied ${sourceFile} to ${destinationFile}`);
} else {
  console.error(`Source file does not exist: ${sourceFile}`);
  process.exit(1);
}
