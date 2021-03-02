const debug = require("debug")("xode/index.js");
debug(`Starting xode`);

const fs = require("fs");
const chalk = require("chalk");
const commonJsStandalone = require("commonjs-standalone");
const delegate = require("./delegate");

debug(`argv: ${JSON.stringify(process.argv)}`);

function resolveTarget(argv) {
  if (argv.includes("-v") || argv.includes("--version")) {
    return { type: "version" };
  } else if (argv.includes("-h") || argv.includes("--help")) {
    return { type: "help" };
  } else if (argv[2]) {
    return { type: "runfile", file: argv[2] };
  } else {
    return { type: "help" };
  }
}

const target = resolveTarget(process.argv);
switch (target.type) {
  case "runfile": {
    // Make sure the file is readable
    const fd = fs.openSync(target.file, "r");
    fs.closeSync(fd);

    commonJsStandalone.requireMain(target.file, delegate);
    break;
  }
  case "version": {
    console.log("xode:", require("../package.json").version);
    console.log("node:", require("../node-version"));
    break;
  }
  case "help": {
    console.log(
      `
Usage: ${process.argv[0]} [options] [ script.js ] [arguments]

Options:
  -h, --help                                print help
  -v, --version                             print version
`.trim()
    );
    break;
  }
  default: {
    console.error(chalk.red(`Reached unhandled run target: '${target.type}'`));
    process.exitCode = 1;
  }
}
