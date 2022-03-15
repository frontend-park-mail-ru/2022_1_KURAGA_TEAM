const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, 'src', 'app.js'),
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
                use: 'svg-inline-loader' },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ] },
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
    ],
    devServer: {
        static: path.resolve(__dirname, 'src'),
        port: 8080,
    }
}
