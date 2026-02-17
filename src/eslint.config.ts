import eslint from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import tseslint from "typescript-eslint";

const error = (...params: unknown[]): any => ["error", ...params];
const warn = (...params: unknown[]): any => ["warn", ...params];

export default (tsconfigRootDir: string): any => tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      "scripts/*.js",
      "**/lib/**/*",
      "**/node_modules/**/*",
    ]
  },
  {
    plugins: {
      "@stylistic": stylistic,
    },
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir,
      },
    },
    rules: {
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-expressions": "off",

      "no-unused-private-class-members": "warn",
      "no-shadow": "warn",
      "@typescript-eslint/consistent-type-imports": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          "args": "all",
          "argsIgnorePattern": "^_",
          "caughtErrors": "all",
          "caughtErrorsIgnorePattern": "^_",
          "destructuredArrayIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "ignoreRestSiblings": true
        }
      ],
      "@typescript-eslint/strict-boolean-expressions": ["error", {
        "allowString": false,
        "allowNumber": false,
        "allowNullableObject": false,
        "allowNullableBoolean": false,
        "allowNullableString": false,
        "allowNullableNumber": false,
        "allowAny": false
      }],
      "@stylistic/no-trailing-spaces": "warn",
      "@stylistic/max-len": warn({ code: 80 }),
      "@stylistic/key-spacing": "warn",
      "@stylistic/comma-dangle": ["warn", "always-multiline"],
      "@stylistic/semi": "warn",
      "@stylistic/member-delimiter-style": "warn",
      "@stylistic/quotes": warn(),
      "@stylistic/no-multiple-empty-lines": warn({ max: 1 }),

      "accessor-pairs": "error",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-unnecessary-condition": "error"
    }
  },
  {
    files: ["**/*.spec.ts"],
    rules: {
      "@typescript-eslint/no-wrapper-object-types": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "no-sparse-arrays": "off",
    }
  }
);
