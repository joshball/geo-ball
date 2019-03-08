//
// Using a JavaScript file for the .eslintrc file (instead of a JSON file)
// allows full support of comments that can be used to better describe rules.
//
module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    plugins: ['@typescript-eslint/tslint'],
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
        //
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // https://eslint.org/docs/user-guide/configuring:
        //  "off" or 0 - turn the rule off
        //  "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
        //  "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)
        //
        '@typescript-eslint/interface-name-prefix': 'always',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
        'react/display-name': 'off',
        'react/prop-types': 0,
    },
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
};
