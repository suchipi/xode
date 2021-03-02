var path = require("path");

module.exports =
  process.platform === "darwin"
    ? path.join(__dirname, "build", "mac-x64", "xode")
    : process.platform === "linux" && process.arch === "x64"
    ? path.join(__dirname, "build", "linux-x64", "xode")
    : process.platform === "linux" && process.arch === "x32"
    ? path.join(__dirname, "build", "linux-x86", "xode")
    : process.platform === "win32" && process.arch === "x64"
    ? path.join(__dirname, "build", "windows-x64", "xode.exe")
    : process.platform === "win32" && process.arch === "x32"
    ? path.join(__dirname, "build", "windows-x86", "xode.exe")
    : null;
