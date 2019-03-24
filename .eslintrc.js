//
// Using a JavaScript file for the .eslintrc file (instead of a JSON file)
// allows full support of comments that can be used to better describe rules.
//
module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    plugins: ['@typescript-eslint/tslint', 'react-hooks'],
    extends: [
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'prettier/react',
        'plugin:react/recommended',
        'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
        useJSXTextNode: true,
        project: './tsconfig.common.json',
    },
    rules: {
        // We can use different rule sets...

        // Pure ESLint:
        // https://eslint.org/docs/rules/

        // https://eslint.org/docs/rules/object-shorthand
        'object-shorthand': ['error', 'always'],

        // And REACT specific rules from eslint-plugin-react:
        // https://github.com/yannickcr/eslint-plugin-react#list-of-supported-rules
        'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
        'react/display-name': 'off',
        'react/prop-types': 0,

        // REACT HOOKS
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",

        // And the new Typescript/ESLint Rules:
        // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules

        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
        // '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/array-type': ['error', 'generic'],
        '@typescript-eslint/interface-name-prefix': 'always',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',

        // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin-tslint
        // "@typescript-eslint/tslint/config": ["warn", {
        //     "lintFile": "./tslint.json", // path to tslint.json of your project
        //     "rules": {
        //       // tslint rules (will be used if `lintFile` is not specified)
        //     },
        //     "rulesDirectory": [
        //       // array of paths to directories with rules, e.g. 'node_modules/tslint/lib/rules' (will be used if `lintFile` is not specified)
        //     ]
        //   }],
    },
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
};
