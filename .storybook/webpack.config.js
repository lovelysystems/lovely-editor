var resolve = require('path').resolve

const srcPath = resolve(__dirname, '../src');

module.exports = ({ config }) => {
  /**
   * Make post-css work with storybook@5
   * - https://github.com/storybookjs/storybook/issues/6083
   * - https://github.com/storybookjs/storybook/issues/6319#issuecomment-477852640 (!)
   * - https://gist.github.com/ademilter/5f56fe9e56c5eb8725292274c68001c5#file-webpack-config-js-L15-L23 (!)
   */
  config.module.rules = config.module.rules.filter(
    f => f.test.toString() !== '/\\.css$/'
  );

  config.module.rules.push({
    test: /\.stories\.jsx?$/,
    exclude: /node_modules/,
    loaders: ['babel-loader'],
  })

  config.module.rules.push({
    // Preprocess our own .(s)css files
    // This is the place to add your own loaders (e.g. sass/less etc.)
    // for a list of loaders, see https://webpack.js.org/loaders/#styling
    test: /\.(css|scss)$/,
    use: ['style-loader', 'css-loader', {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
        config: {
          path: './.storybook/'
        }
      }
    }, 'sass-loader?sourceMap'],
  })

  // TODO: fix fonts and icons, currently not loading properly
  config.module.rules.push({
    test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
    loader: 'file-loader?name=fonts/[name].[ext]'
  })

  config.module.rules.push({
    test: /\.(png|jpg|gif|svg)$/,
    use: [
      {
        loader: 'file-loader',
      }
    ]
  })

  return config
}
