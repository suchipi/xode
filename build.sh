#!/usr/bin/env bash
export PATH="$(npm bin):$PATH"
export NODE_VERSION=`node -e "console.log(require('./node-version.js'))"`

rm -rf build
nexe-build --platform mac-x64 --name xode --entry ./xode/index.js --outputDir ./build --nodeVersion $NODE_VERSION
nexe-build --platform linux-x64 --name xode --entry ./xode/index.js --outputDir ./build --nodeVersion $NODE_VERSION
nexe-build --platform linux-x86 --name xode --entry ./xode/index.js --outputDir ./build --nodeVersion $NODE_VERSION
nexe-build --platform windows-x64 --name xode --entry ./xode/index.js --outputDir ./build --nodeVersion $NODE_VERSION
nexe-build --platform windows-x86 --name xode --entry ./xode/index.js --outputDir ./build --nodeVersion $NODE_VERSION
