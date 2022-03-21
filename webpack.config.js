const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, 'src', 'app.js'),
    performance : {
        hints : false
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ],
                        plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime']
                    }
                }
            },
            {
                test: /\.svg$/,
                use: 'svg-inline-loader'
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ]
    },
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'src', 'index.html'),
            inject: 'body'
        }),
        new MiniCssExtractPlugin()
    ],
    devServer: {
        allowedHosts: [
            'movie-space.ru',
        ],
        host: '0.0.0.0',
        static: path.resolve(__dirname, 'src'),
        port: 8080,
    }
}
