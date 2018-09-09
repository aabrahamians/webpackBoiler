var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    devtool: '#cheap-module-eval-source-map',
    entry: {
        app: ['webpack-hot-middleware/client?reload=true', path.join(__dirname, './entry.js')],
        vendor: ['photoswipe', 'photoswipe/src/js/ui/photoswipe-ui-default.js']
    },
    output: {
        publicPath: '/',
        path: path.join(__dirname, '/dist'),
    },
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader'
            }]

        }, 
        {
            test: /\.css$/i,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }]

        }, 
        {
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: [
            // {
            //     loader: 'file-loader',
            //     options: {
            //         name: 'assets/[name].[ext]'
            //     }
            // },
             {
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'dist/assets/[name].[ext]'
                }
            }, {
                loader: 'img-loader',
                options: {
                    progressive: true,
                    name: 'dist/assets/[name].[ext]'
                }
            }]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body',
            filename: 'index.html'
        }),
        new webpack.ProvidePlugin({
            PhotoSwipe: 'photoswipe',
            PhotoSwipeUI_Default: 'photoswipe/src/js/ui/photoswipe-ui-default.js'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new CopyWebpackPlugin([{
            from: './src/assets',
            to: './assets'
        }, ])
    ],
    resolve: {
        modules: [
            'node_modules',
            path.join(__dirname, "src"),
            'src/style'
        ],
        extensions: ['.js', '.css', '.scss', '.json'],
    }
};