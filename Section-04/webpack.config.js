const path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = (env, options) => {
    console.log("mode --> ", options.mode);
    const rules = {
        test: /\.scss$/,
        use: []
    };
    const plugins = [new webpack.NamedModulesPlugin()];

    if (options.mode === 'development') {
        rules.use.push({
            loader: "style-loader" // creates style nodes from JS strings
        });
        rules.use.push({
            loader: "css-loader" // translates CSS into CommonJS
        });
        rules.use.push({
            loader: "sass-loader" // compiles Sass to CSS
        });
    } else {
        rules.use = ExtractTextPlugin.extract({
            use: ['css-loader', 'sass-loader'],
        });
        plugins.push(new ExtractTextPlugin({
            filename: "[name].bundle.css",
            allChunks: true,
        }));
    }

    return {
        entry: ['./app.js'],
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'build.js'
        },
        module: {
            rules: [rules]
        },
        plugins,
        devServer: {
            historyApiFallback: true,
            noInfo: true
        }
    };
};