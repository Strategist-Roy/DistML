const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",    //source template
            filename: "./index.html"    //output filename in dist folder
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),   //directory to serve static files from
        compress: true,   //use gzip compression
        port: 9000,   //port where content appears in browser
        stats: 'errors-only',     //show errors only
        open: true,     //opens browser automatically
        historyApiFallback: true,   //don't know what the fuck it is
    }
};