var banner = require('./terminal-banner');
var path = require('path');
var chalk = require('chalk');
var exec = require('child_process').exec;

var env = process.env.NODE_ENV || 'local';
var isProd = env.startsWith('production');
var portEnv = isProd ? 'production' : 'local';

if (!env) {
  console.log(chalk.red('\nERROR: process.env.NODE_ENV not found'));
}

if (isProd) {
  console.log(chalk.blue('\nCleaning dist directory...'));
  // Clean Dist Directory, then show banner
  exec('rm -rf dist/*', (err, stdout) => {
    if (!err) {
      console.log(chalk.green('\nDist directory clean'));
    } else {
      console.log(chalk.red('\nFailed to clean dist directory'));
    }
    banner({
      env: env,
      server: !isProd
        ? `GET TO WORK`
        : 'N/A'
    });
  });
}
