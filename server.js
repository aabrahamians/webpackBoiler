/* eslint no-console: 0 */
var path = require('path');
var express = require('express');
var https = require('https');
var http = require('http');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config.js');

var devMode = process.env.NODE_ENV !== 'production';
var port = devMode ? 3007 : 3009;
var host = 'http://localhost';
var app = express();

if (devMode) {
  var compiler = webpack(config);
  var middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
      assets: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(__dirname + '/dist'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

http.createServer(app).listen(port, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('─=≡Σ((( つ◕ل͜◕)つ  Listening at ' + host + ':' + port + ' in ' + process.env.NODE_ENV );
});
