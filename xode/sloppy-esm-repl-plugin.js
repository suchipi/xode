// Babel plugin that compiles eg `import {foo} from "bar"` into `foo = require("bar").foo`,
// thereby letting you use import statements in the repl.
//
// This plugin is only used in the repl.
module.exports = function sloppyEsmReplPlugin(babel) {
  const { types: t } = babel;

  return {
    name: "sloppy-esm-repl-plugin",
    visitor: {
      ImportDeclaration(path) {
        const node = path.node;
        path.replaceWithMultiple(
          [
            t.expressionStatement(
              t.callExpression(t.identifier("require"), [node.source])
            ),
          ].concat(
            path.get("specifiers").map((specifier) => {
              const spec = specifier.node;

              switch (spec.type) {
                case "ImportDefaultSpecifier": {
                  return t.conditionalExpression(
                    t.memberExpression(
                      t.callExpression(t.identifier("require"), [node.source]),
                      t.identifier("__esModule")
                    ),
                    t.assignmentExpression(
                      "=",
                      t.identifier(spec.local.name),
                      t.memberExpression(
                        t.callExpression(t.identifier("require"), [
                          node.source,
                        ]),
                        t.identifier("default")
                      )
                    ),
                    t.assignmentExpression(
                      "=",
                      t.identifier(spec.local.name),
                      t.callExpression(t.identifier("require"), [node.source])
                    )
                  );
                }
                case "ImportSpecifier": {
                  return t.assignmentExpression(
                    "=",
                    t.identifier(spec.local.name),
                    t.memberExpression(
                      t.callExpression(t.identifier("require"), [node.source]),
                      t.identifier(spec.imported.name)
                    )
                  );
                }
                case "ImportNamespaceSpecifier": {
                  return t.assignmentExpression(
                    "=",
                    t.identifier(spec.local.name),
                    t.callExpression(t.identifier("require"), [node.source])
                  );
                }
                default: {
                  return null;
                }
              }
            })
          )
        );
      },
    },
  };
};
