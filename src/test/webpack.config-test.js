var nodeExternals = require('webpack-node-externals');
var glob = require("glob");

module.exports = {
    target: "node",
    externals: [nodeExternals({
        whitelist: [/^awshlib/]
    })],
    mode: "development",
    entry: ['babel-polyfill'].concat(glob.sync("./test/unit/**/*.js")),
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules\/(?!(awshlib)\/).*/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    output: {
        path: __dirname + '/.build',
        publicPath: '/',
        filename: 'bundle.js'
    },
    node: {
        net: 'empty',
        tls: 'empty',
        dns: 'empty'
    }
};