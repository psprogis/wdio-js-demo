module.exports = {
    extends: ['plugin:wdio/recommended'],

    env: {
        es2020: true,
        node: true,
    },

    plugins: [
        'wdio',
    ],
};
