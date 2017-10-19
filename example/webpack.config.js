const { resolve } = require('path')

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "css/style.css"
});

module.exports = {
  entry: {
    'js/bundle.js': ['babel-polyfill', './index.js']
  },
  output: {
    filename: '[name]',
    path: `${__dirname}`,
  },
  devtool: "source-map",
  watch: true,
  devServer: {
    inline: true
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: 'css-loader',
            options: {
              'minimize': true,
              'sourceMap': true
            }
          }, {
            loader: 'postcss-loader',
            options: {
              'sourceMap': true,
              config: {
                path: './postcss.config.js'
              }
            }
          }, {
            loader: 'sass-loader',
            options: {
               includePaths: [
                 resolve(__dirname, 'sass', 'components'),
               ],
              'sourceMap': true
            }
          }]
        })
      }, {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
    ]
  },
  plugins: [
    extractSass
  ]
};
