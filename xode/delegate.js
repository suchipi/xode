const debug = require("debug")("xode/delegate.js");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const resolve = require("resolve");
const stripBom = require("strip-bom");
const builtins = require("./builtins");
const compile = require("./compile");

const delegate = {
  resolve(id, fromFilePath) {
    debug(
      `Resolving ${JSON.stringify(id)} from file path ${JSON.stringify(
        fromFilePath
      )}...`
    );

    if (builtins[id]) return `builtin:/${id}`;

    return resolve.sync(id, {
      basedir: path.dirname(fromFilePath),
      preserveSymlinks: false,
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    });
  },

  read(filepath) {
    debug(`Reading ${JSON.stringify(filepath)}...`);

    if (filepath.startsWith("builtin:/")) {
      const builtinName = filepath.split("builtin:/")[1];
      return `module.exports = __builtins__[${JSON.stringify(builtinName)}]()`;
    } else {
      return stripBom(fs.readFileSync(filepath, "utf-8"));
    }
  },

  run(code, moduleEnv, filepath) {
    debug(`Running ${JSON.stringify(filepath)}...`);

    let codeToRun;
    if (filepath.match(/node_modules/) && filepath.match(/\.js$/)) {
      // skip compilation as any js files in node_modules are probably already runnable.
      codeToRun = code;
    } else {
      // but for files outside of node_modules or files that don't end in .js, compile them
      codeToRun = compile(code, filepath);
    }

    const wrapper = vm.runInThisContext(
      "(function (exports, require, module, __filename, __dirname, __builtins__) { " +
        codeToRun +
        "\n})",
      { filename: filepath }
    );
    wrapper(
      moduleEnv.exports,
      moduleEnv.require,
      moduleEnv.module,
      moduleEnv.__filename,
      moduleEnv.__dirname,
      builtins
    );
  },
};

module.exports = delegate;
