const path = require('path');
console.log("Using custom webpack config!");

module.exports = {
    // ...
    resolve: {
        fallback: {
            fs: false,
            path: require.resolve('path-browserify'),
            os: require.resolve('os-browserify/browser'),
        },
        alias: {
            'dotenv/config': path.resolve(__dirname, '.env'),
        },
    },
};
