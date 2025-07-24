import js from "@eslint/js";
import { globSync } from "glob";

export default [
	{
		files: globSync("**/*.js", { ignore: ["node_modules/**"] }),
		...js.configs.recommended,
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
		},
		rules: {
			semi: ["warn", "always"],
			quotes: ["warn", "double"],
		},
	},
];
