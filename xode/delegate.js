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
    } else if (filepath.endsWith(".json")) {
      return "module.exports = " + stripBom(fs.readFileSync(filepath, "utf-8"));
    } else {
      return stripBom(fs.readFileSync(filepath, "utf-8"));
    }
  },

  run(code, moduleEnv, filepath) {
    debug(`Running ${JSON.stringify(filepath)}...`);

    let codeToRun;
    const skipCompile =
      filepath.endsWith(".json") ||
      (filepath.match(/node_modules/) && filepath.endsWith(".js")) ||
      filepath.startsWith("builtin:/");

    if (skipCompile) {
      codeToRun = code;
    } else {
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
