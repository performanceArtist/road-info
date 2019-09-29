const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
import baseConfig from './webpack.config.base';

module.exports = merge(baseConfig, {
  entry: {
    rhl: 'react-hot-loader/patch'
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/client/app/index.html',
      filename: `index.html`,
      chunks: []
    }),
    new HtmlWebpackPlugin({
      template: 'src/client/login/login.html',
      filename: `login.html`,
      chunks: []
    }),
    new HtmlWebpackPlugin({
      template: 'src/client/admin/admin.html',
      filename: `admin.html`,
      chunks: []
    })
  ]
});
