import stylistic from "@stylistic/eslint-plugin";

import withNuxt from "./.nuxt/eslint.config.mjs";



/** @type {import("eslint").Linter.FlatConfig} */
const importConfig = {
    // `eslint-plugin-import` is already imported, so no need to specify plugin.
    settings: {
        "import/resolver": {
            typescript: true,
            node: true,
        },
    },
    rules: {
        // Import Rules
        "import/consistent-type-specifier-style": [ "error", "prefer-top-level" ],
        "import/first": [ "error" ],
        "import/newline-after-import": [ "warn", { count: 3 } ],
        "import/no-absolute-path": [ "error" ],
        "import/no-mutable-exports": [ "error" ],
        "import/no-useless-path-segments": [ "error" ],
        "import/order": [ "error", {
            "groups": [
                "builtin",
                "external",
            ],
            "newlines-between": "always",
            "alphabetize": {
                order: "asc",
                orderImportKind: "asc",
                caseInsensitive: true,
            },
        } ],
    },
};



export default withNuxt(
    // Stylistic Rules.
    stylistic.configs.customize({
        flat: true,
        arrowParens: true,
        indent: 4,
        quotes: "double",
        semi: true,
        quoteProps: "consistent-as-needed",
        braceStyle: "1tbs",
        blockSpacing: true,
        jsx: true,
    }),
    {
        rules: {
            "@stylistic/array-bracket-spacing": [ "error", "always" ],
            "@stylistic/jsx-one-expression-per-line": "off",
            "@stylistic/keyword-spacing": [ "error", {
                overrides: {
                    catch: { after: false },
                    for: { after: false },
                    if: { after: false },
                    while: { after: false },
                },
            } ],
            "@stylistic/key-spacing": [ "warn", {
                mode: "minimum",
            } ],
            "@stylistic/no-multiple-empty-lines": [ "warn", { max: 5, maxEOF: 1 } ],
            "@stylistic/no-multi-spaces": [ "off" ],
        },
    },
    importConfig,
);
