const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

import { makeEntries, makeFolderAlias } from './webpack.utils';

const config = {
  entry: makeEntries(['app', 'login', 'admin'], 'src/client'),
  node: {
    fs: 'empty'
  },
  resolve: {
    modules: ['node_modules', 'client'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@root': path.resolve(__dirname, 'src'),
      '@shared': path.resolve(__dirname, 'src/client/shared'),
      ...makeFolderAlias('src/client/app')
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
          minSize: 0
        }
      }
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist/public'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        exclude: /node_modules/,
        loader: ['babel-loader']
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: 'style-loader'
          },
          'css-loader?url=false',
          {
            loader: 'sass-loader',
            options: {
              data: '@import "./src/client/globals";',
              includePaths: [path.join(__dirname, 'src')]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
};

export default config;
