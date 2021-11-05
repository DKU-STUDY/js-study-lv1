const path = require('path');

module.exports = {
  entry: './public/src/main.js',
  output: {
    path: path.resolve('./public', 'build'),
    filename: 'bundle.js',
  },
};