const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require("webpack");

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        modalWindow: './js/modalWindow.js',
        homePage: './js/homePageScript.js',
        carousel: './js/sliders/slidersInstances.js',
        blogPage: './js/blogPageScript.js',

    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all'
        }
    },
    devServer: {
        // contentBase: './dist',
        // clientLogLevel: 'silent',
        // host: '0.0.0.0',
        port: 8888,
        // disableHostCheck: true,
        // public: 'http://localhost:8888',
        // compress: true,
        open: true,

    },
    plugins: [
        new HTMLWebpackPlugin({
            chunks: ['homePage', 'carousel'],
            filename: "index.html",
            template: "./index.html"
        }),
        new HTMLWebpackPlugin({
            chunks: ['modalWindow', 'blogPage'],
            filename: "blog.html",
            template: "./blog.html"
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `[name].css`
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "window.$": "jquery"
        })
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    esModule: false,
                },
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.s[as]ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(?:|png|jpg|svg|gif|ogg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: `./img/[name].[contenthash].[ext]`
                    }
                }]
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            }

        ]
    }
}