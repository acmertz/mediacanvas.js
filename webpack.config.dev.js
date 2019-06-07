const path = require('path'),
      { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './build.js',
    devServer: {
        contentBase: './'
    },
    plugins: [
        new CleanWebpackPlugin()
    ],
    devtool: 'eval-source-map',
    output: {
        filename: 'mediacanvas.js',
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
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};