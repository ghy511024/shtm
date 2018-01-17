var path = require('path');

module.exports = {
    entry: {
        // "shtm": ["./src/shtm-pc-build.js"],
        "shtm_fn": ["./src/pc-build/shtm-fn.js"],
    },
    output: {
        path: path.join(__dirname, "build"),
        filename: "[name].js"
    },
    module: {
        loaders: [
            {
                test: path.join(__dirname, 'static/js/es6'),
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }

            }
        ]
    },
    plugins: []
}