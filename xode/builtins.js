const debug = require("debug")("xode/builtins.js");

function loadBuiltin(name, cb) {
  debug(`Loading builtin: '${name}'`);
  return cb();
}

// Modules that are normally builtin in node 12
const normalBuiltins = {
  _http_agent: () => loadBuiltin("_http_agent", () => require("_http_agent")),
  _http_client: () =>
    loadBuiltin("_http_client", () => require("_http_client")),
  _http_common: () =>
    loadBuiltin("_http_common", () => require("_http_common")),
  _http_incoming: () =>
    loadBuiltin("_http_incoming", () => require("_http_incoming")),
  _http_outgoing: () =>
    loadBuiltin("_http_outgoing", () => require("_http_outgoing")),
  _http_server: () =>
    loadBuiltin("_http_server", () => require("_http_server")),
  _stream_duplex: () =>
    loadBuiltin("_stream_duplex", () => require("_stream_duplex")),
  _stream_passthrough: () =>
    loadBuiltin("_stream_passthrough", () => require("_stream_passthrough")),
  _stream_readable: () =>
    loadBuiltin("_stream_readable", () => require("_stream_readable")),
  _stream_transform: () =>
    loadBuiltin("_stream_transform", () => require("_stream_transform")),
  _stream_wrap: () =>
    loadBuiltin("_stream_wrap", () => require("_stream_wrap")),
  _stream_writable: () =>
    loadBuiltin("_stream_writable", () => require("_stream_writable")),
  _tls_common: () => loadBuiltin("_tls_common", () => require("_tls_common")),
  _tls_wrap: () => loadBuiltin("_tls_wrap", () => require("_tls_wrap")),
  assert: () => loadBuiltin("assert", () => require("assert")),
  async_hooks: () => loadBuiltin("async_hooks", () => require("async_hooks")),
  buffer: () => loadBuiltin("buffer", () => require("buffer")),
  child_process: () =>
    loadBuiltin("child_process", () => require("child_process")),
  cluster: () => loadBuiltin("cluster", () => require("cluster")),
  console: () => loadBuiltin("console", () => require("console")),
  constants: () => loadBuiltin("constants", () => require("constants")),
  crypto: () => loadBuiltin("crypto", () => require("crypto")),
  dgram: () => loadBuiltin("dgram", () => require("dgram")),
  dns: () => loadBuiltin("dns", () => require("dns")),
  domain: () => loadBuiltin("domain", () => require("domain")),
  events: () => loadBuiltin("events", () => require("events")),
  fs: () => loadBuiltin("fs", () => require("fs")),
  http: () => loadBuiltin("http", () => require("http")),
  http2: () => loadBuiltin("http2", () => require("http2")),
  https: () => loadBuiltin("https", () => require("https")),
  inspector: () => loadBuiltin("inspector", () => require("inspector")),
  module: () => loadBuiltin("module", () => require("module")),
  net: () => loadBuiltin("net", () => require("net")),
  os: () => loadBuiltin("os", () => require("os")),
  path: () => loadBuiltin("path", () => require("path")),
  perf_hooks: () => loadBuiltin("perf_hooks", () => require("perf_hooks")),
  process: () => loadBuiltin("process", () => require("process")),
  punycode: () => loadBuiltin("punycode", () => require("punycode")),
  querystring: () => loadBuiltin("querystring", () => require("querystring")),
  readline: () => loadBuiltin("readline", () => require("readline")),
  repl: () => loadBuiltin("repl", () => require("repl")),
  stream: () => loadBuiltin("stream", () => require("stream")),
  string_decoder: () =>
    loadBuiltin("string_decoder", () => require("string_decoder")),
  sys: () => loadBuiltin("sys", () => require("sys")),
  timers: () => loadBuiltin("timers", () => require("timers")),
  tls: () => loadBuiltin("tls", () => require("tls")),
  trace_events: () =>
    loadBuiltin("trace_events", () => require("trace_events")),
  tty: () => loadBuiltin("tty", () => require("tty")),
  url: () => loadBuiltin("url", () => require("url")),
  util: () => loadBuiltin("util", () => require("util")),
  v8: () => loadBuiltin("v8", () => require("v8")),
  vm: () => loadBuiltin("vm", () => require("vm")),
  worker_threads: () =>
    loadBuiltin("worker_threads", () => require("worker_threads")),
  zlib: () => loadBuiltin("zlib", () => require("zlib")),
};

// Modules that xode adds as builtins
const xodeBuiltins = {
  // For example, to add react and react-dom as builtin modules, uncomment the next two lines:
  // "react": () => loadBuiltin("react", () => require("react")),
  // "react-dom": () => loadBuiltin("react-dom", () => require("react-dom")),
};

const builtins = Object.assign({}, normalBuiltins, xodeBuiltins);

module.exports = builtins;
