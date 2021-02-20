module.exports = {
    extends: ['plugin:wdio/recommended'],

    parser: "@babel/eslint-parser",
    parserOptions: {
        requireConfigFile: false,
    },

    env: {
        es2020: true,
        node: true,
    },

    plugins: [
        'wdio',
        // '@babel/plugin-syntax-class-properties',
    ],
};
