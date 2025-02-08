import typescriptEslint from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import _import from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import { fixupPluginRules } from "@eslint/compat";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
});

export default [
	...compat.extends(
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended"
	),
	{
		plugins: {
			"@typescript-eslint": typescriptEslint,
			prettier,
			import: fixupPluginRules(_import),
			"unused-imports": unusedImports,
			"simple-import-sort": simpleImportSort
		},

		languageOptions: {
			globals: {
				...Object.fromEntries(Object.entries(globals.browser).map(([key]) => [key, "off"])),
				...globals.node
			},

			parser: tsParser,
			ecmaVersion: "latest",
			sourceType: "module"
		},

		rules: {
			"prettier/prettier": ["error"],
			"@typescript-eslint/explicit-function-return-type": ["error"],
			"@typescript-eslint/explicit-module-boundary-types": "error",
			"@typescript-eslint/no-explicit-any": "error",

			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					argsIgnorePattern: "^_"
				}
			],

			"@typescript-eslint/naming-convention": [
				"error",
				{
					selector: "class",
					format: ["PascalCase"]
				},
				{
					selector: "interface",
					format: ["PascalCase"],
					prefix: ["I"]
				},
				{
					selector: "parameter",
					format: ["camelCase"]
				},
				{
					selector: "function",
					format: ["camelCase"]
				}
			],

			"simple-import-sort/imports": "error",
			"simple-import-sort/exports": "error",
			"unused-imports/no-unused-imports": "error",

			"max-len": [
				"error",
				{
					code: 100,
					ignoreUrls: true
				}
			]
		}
	}
];
