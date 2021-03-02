# xode

> Create a customized node binary with additional features

The xode project is a hackable, customizable binary that wraps [node](https://nodejs.org/en/) and adds additional features to it. The additional features are:

- Native support for [modern ECMAScript syntax](https://babeljs.io/docs/en/babel-preset-env).
- Native support for ECMAScript Modules in `.js` files (via [a CommonJS transform](https://babeljs.io/docs/en/babel-plugin-transform-modules-commonjs)).
- Native support for parsing [flow](https://flow.org/), [TypeScript](https://www.typescriptlang.org/) and React JSX syntax.
  - Note that xode doesn't do any type-checking; it's just able to parse the additional syntax added by flow and TypeScript.
- Additional builtin modules (if you wish). You can add any module from npm as an additional builtin module, and then you don't need to install it from npm; it'll be built-in to `xode`.

The xode project is built on top of [nexe](https://github.com/nexe/nexe).

## Use-cases

- Execute flow and typescript code without a build step
- Quickly prototype ideas using your favorite tools and npm packages, without needing to `npm install`
- Bundle up your node_modules as builtins and run scripts in CI without needing to install node_modules

## Try it out

To try out a xode binary based on node 12.16.2 with no additional builtin modules, you can install `xode` from npm:

```
npm install -g xode
```

Then, run it on the command line with the name of a script as its first argument:

```
xode myscript.ts
```

## Compiling a `xode` binary (no customizations)

1. Clone [the repo](https://github.com/suchipi/xode) and open it.
1. Run `npm install`.
1. Run `npm run build`.
1. `xode` binaries will be created in the `build` folder.

## Customizing the base node version

1. Clone [the repo](https://github.com/suchipi/xode) and open it.
1. Run `npm install`.
1. Edit `node-version.js` to whichever version of node you want your `xode` binary to be based on.
1. Run `npm run build`.
1. `xode` binaries based off of your specified node version will be created in the `build` folder.

## Adding additional builtin modules from npm

1. Clone [the repo](https://github.com/suchipi/xode) and open it.
1. Run `npm install`.
1. Use npm to install additional packages you'd like to add as builtins. I recommend you install them as non-dev dependencies, so you can tell them apart from dependencies internal to xode itself.
1. Edit `xode/builtins.js` and add your additional packages to the `xodeBuiltins` object near the bottom of the file, using the example comment as a guide.
1. Run `npm run build`.
1. `xode` binaries with your additional builtin modules will be created in the `build` folder.

## Adding support for additional native syntax features

xode uses babel internally to compile your source code to normal JavaScript right before it's run. By modifying the babel configuration xode uses, you can add support for additional syntax features.

1. Clone [the repo](https://github.com/suchipi/xode) and open it.
1. Run `npm install`.
1. Use npm to install any additional babel transforms you'd like xode to have built-in.
1. If desired, upgrade the existing babel packages xode uses to their latest versions.
1. Add the transforms you installed to `xode/compile.js`.
1. Run `npm run build`.
1. `xode` binaries that use your customized babel configuration will be created in the `build` folder.

## Caveats

If you add builtin modules that use native code, you'll notice that a `node_modules` folder containing `.node` files gets created next to the `xode`/`xode.exe` binary in your build folder. You need to keep this `node_modules` folder next to the `xode`/`xode.exe` file for the native code to work correctly.

## License

MIT
