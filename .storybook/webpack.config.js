const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.md$/,
        use: 'raw-loader'
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap'],
      }
    ]
  }
};
