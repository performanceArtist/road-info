const merge = require('webpack-merge');

import baseConfig from './webpack.config.base';
import { makeHTMLPages } from './webpack.utils';

module.exports = merge(baseConfig, {
  devServer: {
    port: 3000,
    open: true,
    publicPath: '/',
    historyApiFallback: true,
    proxy: {
      '/': 'http://localhost:5000'
    }
  },
  entry: {
    rhl: 'react-hot-loader/patch'
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  plugins: makeHTMLPages(['app', 'login', 'admin'], 'src/client')
});
