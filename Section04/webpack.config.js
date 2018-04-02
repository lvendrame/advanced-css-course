const path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "[name].bundle.css",
    allChunks: true,
});

module.exports = {
    entry: ['./app.js'],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'build.js'
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }],
            // use: ExtractTextPlugin.extract({
            //     use: ['css-loader', 'sass-loader'],
            // })
        }]
    },
    plugins: [
        //extractSass,
        new webpack.NamedModulesPlugin(),
        // new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        historyApiFallback: true,
        noInfo: true
    }
};