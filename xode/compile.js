const debug = require("debug")("xode/compile.js");
const babel = require("@babel/core");

module.exports = function compile(code, filePath) {
  debug(`compiling '${filePath}'...`);
  const result = babel.transformSync(code, {
    filename: filePath,
    babelrc: false,
    presets: [
      filePath.endsWith(".ts") || filePath.endsWith(".tsx")
        ? require("@babel/preset-typescript").default
        : null,
      require("@babel/preset-react").default,
      [
        require("@babel/preset-env").default,
        { targets: { node: require("../node-version") }, modules: false },
      ],
    ].filter(Boolean),
    plugins: [
      require("@babel/plugin-proposal-class-properties").default,
      require("@babel/plugin-proposal-nullish-coalescing-operator").default,
      require("@babel/plugin-proposal-optional-chaining").default,
      require("@babel/plugin-transform-modules-commonjs").default,

      filePath.endsWith(".ts") || filePath.endsWith(".tsx")
        ? null
        : require("@babel/plugin-transform-flow-strip-types").default,
    ].filter(Boolean),
  });
  return result.code;
};
