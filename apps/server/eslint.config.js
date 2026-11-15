// eslint.config.js
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
    js.configs.recommended,
    ...tseslint.configs.recommended,

    {
        rules: {
            "no-console": "warn",
            "prefer-const": "error",
            "@typescript-eslint/no-unused-vars": "warn"
        },
    }
);