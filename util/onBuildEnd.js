var env = process.env.NODE_ENV;
var isProd = env.startsWith('production');

// if (isProd) {
//   require('./criticalCssGenerator')().catch(err => {
//     process.exit(-1); // Close node process
//   }); // returns a promise w/ output as critical css
// }
