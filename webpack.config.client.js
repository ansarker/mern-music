const path = require('path')
const webpack = require('webpack')
const CURRENT_WORKING_DIR = process.cwd()

const config = {
    name: "browser",
    mode: "development",
    devtool: 'cheap-module-source-map',
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client?reload=true',
        path.join(CURRENT_WORKING_DIR, 'client/main.js')
    ],
    output: {
        path: path.join(CURRENT_WORKING_DIR, '/dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
                use: 'file-loader'
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),     
    ],
    resolve: {
        // alias: {
        //     'react-dom': '@hot-loader/react-dom'
        // },
        // fallback: {
        //     "fs": false,
        //     "tls": false,
        //     "net": false,
        //     "path": false,
        //     "zlib": false,
        //     "http": false,
        //     "https": false,
        //     "stream": false,
        //     "crypto": false,
        //     "crypto-browserify": false,
        //     "url": false,
        //     "util": false,
        //     "buffer": false
        // }
    },
}

module.exports = config
