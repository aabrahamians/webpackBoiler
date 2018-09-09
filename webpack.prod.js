var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var CopyWebpackPlugin = require('copy-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var WebpackShellPlugin = require('webpack-shell-plugin');




module.exports = {
    // devtool: '#cheap-module-eval-source-map',
    entry: {
        app: ['webpack-hot-middleware/client?reload=true', path.join(__dirname, './entry.js')],
        vendor: ['photoswipe', 'photoswipe/src/js/ui/photoswipe-ui-default.js']
    },
    output: {
        publicPath: '/',
        path: path.join(__dirname, '/dist'),
        filename: '[name].[hash].js'
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
            use:[
                { loader: 'style-loader'},
                { loader: 'css-loader'}
            ]
         
        },
        // {
        //     test: /\.(css)$/i,
            // loaders: ExtractTextPlugin.extract({
        //         fallback: 'style-loader',
        //         use: [{
        //             loader: 'style-loader'
        //         }, {
        //             loader: 'css-loader'
        //         }]
        //     })
        // }, 
        {
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: [// {
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
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([{
            from: './src/assets',
            to: './assets'
        }, ]),
        // new OptimizeCssAssetsPlugin({
        //     cssProcessorOptions: {
        //         discardComments: {
        //             removeAll: true
        //         }
        //     }
        // }),
        // new ExtractTextPlugin('css/[name].[chunkhash].min.css'),
        // new webpack.optimize.UglifyJsPlugin({
        //     compressor: {
        //         sequences: true,
        //         dead_code: true,
        //         conditionals: true,
        //         comparisons: true,
        //         evaluate: true,
        //         booleans: true,
        //         unused: true,
        //         if_return: true,
        //         join_vars: true,
        //         drop_console: true,
        //         screw_ie8: true
        //     }
        // }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'node-static',
            filename: 'node-static.js',
            minChunks(module, count) {
                var context = module.context;
                return context && context.indexOf('node_modules') >= 0;
            }
        }),
        new webpack.ProvidePlugin({
            PhotoSwipe: 'photoswipe',
            PhotoSwipeUI_Default: 'photoswipe/src/js/ui/photoswipe-ui-default.js'
        }),
        new webpack.ContextReplacementPlugin(
            /\.\/locale$/,
            'empty-module',
            false,
            /js$/
        ),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new WebpackShellPlugin({
      onBuildStart: ['node ./util/onBuildStart.js'],
      onBuildEnd: ['node ./util/onBuildEnd.js']
    })

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