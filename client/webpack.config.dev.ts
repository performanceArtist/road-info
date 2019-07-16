const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
  entry: {
    app: ['@babel/polyfill', path.join(__dirname, 'src/app/main.tsx')],
    login: ['@babel/polyfill', path.join(__dirname, 'src/login/main.tsx')],
    admin: ['@babel/polyfill', path.join(__dirname, 'src/admin/main.tsx')],
    graph: ['@babel/polyfill', path.join(__dirname, 'src/graph/main.tsx')]
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    modules: ['node_modules', 'client'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@redux': path.resolve(__dirname, 'src/app/redux'),
      '@components': path.resolve(__dirname, 'src/app/components'),
      '@views': path.resolve(__dirname, 'src/app/views')
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
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },

  devServer: {
    port: 3000,
    open: true,
    publicPath: '/',
    historyApiFallback: true,
    proxy: {
      '/': 'http://localhost:5000'
    }
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
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader?url=false',
          {
            loader: 'sass-loader',
            options: {
              data: '@import "./globals";',
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
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new HtmlWebpackPlugin({
      template: 'client/src/app/index.html',
      filename: `index.html`,
      chunks: []
    }),
    new HtmlWebpackPlugin({
      template: 'client/src/login/login.html',
      filename: `login.html`,
      chunks: []
    }),
    new HtmlWebpackPlugin({
      template: 'client/src/admin/admin.html',
      filename: `admin.html`,
      chunks: []
    }),
    new HtmlWebpackPlugin({
      template: 'client/src/graph/graph.html',
      filename: `graph.html`,
      chunks: []
    })
  ]
};

export default config;
