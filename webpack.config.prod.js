const path = require('path'),
      CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './build.js',
    devServer: {
        contentBase: './'
    },
    devtool: 'source-map',
    output: {
        filename: 'mediacanvas.min.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'MediaCanvas',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    }
};