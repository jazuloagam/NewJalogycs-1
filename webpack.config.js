const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//const OptimizeCssAssestsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const srcPath = "./public/src/js";
const entries = { main: "./public/src/js/index.js" };

fs.readdirSync(srcPath).forEach((name) => {
    const indexFile = `${srcPath}/${name}/index.js`;
    if (fs.existsSync(indexFile)) {
        entries[name] = indexFile;
    }
});

module.exports = {
    mode: "development",
    entry: entries,
    output: {
        path: path.resolve(__dirname, "./public/dist"),
        filename:"js/[name].js"
    },
    optimization: {
        minimizer: [
            //new UglifyJsPlugin({ cache: true, parallel: true, sourceMap: true }),
            //new OptimizeCssAssestsPlugin()
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: "css/main.css" }),
        new CopyWebpackPlugin([{ context: "public/src/", from: "img/**/*" }]),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{ loader: MiniCssExtractPlugin.loader }, { loader: "css-loader" }, {loader:"sass-loader"}]
            },
            {
                test: "/\.js$/",
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader", options: {presets:["@babel/preset-env"]}}
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                    }
                    // other vue-loader options go here
                }
            },
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
}
if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}