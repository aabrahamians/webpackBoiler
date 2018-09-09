// Critical CSS Generator: Returns a promise w/ output as critical css
const critical = require('critical');
const portfinder = require('portfinder');
const StaticServer = require('static-server');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const Horseman = require('node-horseman');
const fsExtra = require('fs-extra');
const replace = require('replace-in-file');

const horseman = new Horseman({
  debugPort: 8090
});

// TODO: wrap critical css generator in a promise and put functionality in a seperate file
module.exports = function() {
  return new Promise((resolve, reject) => {
    portfinder
      .getPortPromise()
      .then(port => {
        //
        // `port` is guaranteed to be a free port
        // in this scope.
        //
        var server = new StaticServer({
          rootPath: './dist', // required, the root of the server file tree
          name: 'Critical CSS Generator', // optional, will set "X-Powered-by" HTTP header
          port: port
        });

        server.start(function() {
          console.log(
            chalk.white.underline('Critical CSS Generator started on port:'),
            chalk.dim.yellow(server.port)
          );
          console.log(
            chalk.yellow(
              'Evaluating built application for rendered html with Horseman...'
            )
          );
          console.log(chalk.yellow('View web inspector @ localhost:8090'));
          const serverUrl = `http://localhost:${server.port}`;
//           horseman
//             .open(serverUrl)
//             .evaluate(function(selector) {
//               // This code is executed inside the browser.
//               // It's sandboxed from Node, and has no access to anything
//               // in Node scope, unless you pass it in, like we did with 'selector'.
//               //
//               // You do have access to jQuery, via $, automatically.
//               return $(selector);
//             }, '#fover-app')
//             .then(function($app) {
//               const htmlPath = './dist/index.html';
//               const renderedHtmlFilename = 'rendered-html.html';
//               const newHtmlPath = `./dist/${renderedHtmlFilename}`;
//               const renderedHtml = $app['0'].outerHTML;
//               const hasMainPageContent = renderedHtml.includes(
//                 'id="main-page-content"'
//               );
//               // Regression check: Throw error and exit if renderedHtml doesn't seem correct
//               if (!hasMainPageContent) {
//                 // NOTE: hasMainPageContent is a regression check to ensure renderedHtml is always produced for critical css generation
//                 // If this fails, it means parts of the html are no longer rendered and critical css produced will not be optimal
//                 // Review recent commits to see what could have triggered this issue
//                 // Opening localhost:8090 in the browser will give you access to horseman debug panel
//                 console.log(
//                   chalk.red(
//                     new Error(
//                       `Critical CSS Generator - #main-page-content not found within rendered html. Aborting build, ensure "renderedHtml" output is being generated correctly!`
//                     )
//                   )
//                 );

//                 return reject();
//               }
//               // Create copy of dist/index.html
//               fsExtra.copySync(htmlPath, newHtmlPath);
//               // Replace text in our new html with the rendered html
//               replace({
//                 files: newHtmlPath,
//                 from: '<body></body>',
//                 to: renderedHtml
//               })
//                 .then(changes => {
//                   console.log(
//                     chalk.blue('Generating critical css using:', changes)
//                   );
//                   critical
//                     .generate({
//                       // Inline the generated critical-path CSS
//                       // - true generates HTML
//                       // - false generates CSS
//                       inline: true,

//                       // Your base directory
//                       base: 'dist/',

//                       // HTML source file
//                       src: renderedHtmlFilename,

//                       // Viewport width
//                       width: 1366,

//                       // Viewport height
//                       height: 768,

//                       // Target for final HTML output.
//                       // use some CSS file when the inline option is not set
//                       dest: 'index.html',

//                       // Minify critical-path CSS when inlining
//                       minify: true,

//                       // Extract inlined styles from referenced stylesheets
//                       extract: false,

//                       // Complete Timeout for Operation
//                       timeout: 30000
//                     })
//                     .then(function(output) {
//                       // You now have critical-path CSS
//                       // Works with and without dest specified
//                       // Delete files
//                       fs.unlinkSync(newHtmlPath);
//                       console.log(chalk.green('Critical css generated!'));
//                       server.stop();
//                       resolve({ criticalCSS: output });
//                     })
//                     .error(function(err) {
//                       reject(
//                         new Error('Error generating critical css:', error)
//                       );
//                     });
//                 })
//                 .catch(error => {
//                   reject(new Error('Error generating critical css:', error));
//                 });
//               return horseman.close();
//             });
//         });
//       })
//       .catch(err => {
//         reject(new Error('Error generating critical css:', err));
//         //
//         // Could not get a free port, `err` contains the reason.
//         //
//       });
//   });
};
