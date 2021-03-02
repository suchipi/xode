const debug = require("debug")("xode/repl.js");
const fs = require("fs");
const path = require("path");
const os = require("os");
const repl = require("repl");
const vm = require("vm");
const chalk = require("chalk");
const { Module } = require("commonjs-standalone");
const compile = require("./compile");
const delegate = require("./delegate");

module.exports = function startRepl() {
  const historyFile = path.join(os.homedir(), ".node_repl_history");

  const replServer = repl.start({
    eval(evalCmd, context, file, cb) {
      let codeToRun = evalCmd;
      try {
        codeToRun = compile(
          evalCmd,
          path.join(process.cwd(), "<repl>.jsx"),
          true
        );
      } catch (err) {
        try {
          codeToRun = compile(
            evalCmd,
            path.join(process.cwd(), "<repl>.tsx"),
            true
          );
        } catch (err2) {
          cb(new repl.Recoverable(err));
          return;
        }
      }

      // the node repl prepends to the history file, so the
      // most recent entries are at the top of the file.
      // we want to do the same thing here, since we're
      // using the same file.
      fs.readFile(historyFile, "utf-8", (err, data) => {
        if (err) return;
        fs.writeFile(
          historyFile,
          evalCmd
            .split("\n")
            .filter((line) => line.trim())
            .reverse()
            .join("\n") +
            "\n" +
            data,
          () => {}
        );
      });

      // Babel outputs strict mode for a lot of stuff, but for a repl
      // we want sloppy mode instead, so you can easily define globals,
      // etc.
      codeToRun = codeToRun.replace(/^\s*"use strict";\s*/, "");

      try {
        debug("Running: " + chalk.black(chalk.bgBlue(codeToRun)));
        const result = vm.runInContext(codeToRun, context);
        cb(null, result);
      } catch (err) {
        cb(err);
      }
    },
  });

  const requireCache = {};
  replServer.context.require = (source) => {
    const resolvedPath = delegate.resolve(
      source,
      path.join(process.cwd(), "<repl>")
    );
    return Module._load(resolvedPath, delegate, requireCache);
  };
  replServer.context.require.cache = {};

  try {
    fs.readFileSync(historyFile, "utf-8")
      .split("\n")
      .filter((line) => line.trim())
      .map((line) => replServer.history.push(line));
  } catch (err) {}
};
