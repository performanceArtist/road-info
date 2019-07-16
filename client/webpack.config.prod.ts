const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
  entry: {
    'public/login': [
      '@babel/polyfill',
      path.join(__dirname, 'src/login/main.tsx')
    ],
    'private/app': [
      '@babel/polyfill',
      path.join(__dirname, 'src/app/main.tsx')
    ],
    'private/graph': [
      '@babel/polyfill',
      path.join(__dirname, 'src/graph/main.tsx')
    ],
    'admin/admin': [
      '@babel/polyfill',
      path.join(__dirname, 'src/admin/main.tsx')
    ]
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
          name: 'public/commons',
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
              outputPath: 'public/images/'
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
      template: 'client/src/login/login.html',
      filename: `public/login.html`,
      chunks: []
    }),
    new HtmlWebpackPlugin({
      template: 'client/src/app/index.html',
      filename: `private/index.html`,
      chunks: []
    }),
    new HtmlWebpackPlugin({
      template: 'client/src/graph/graph.html',
      filename: `private/graph.html`,
      chunks: []
    }),
    new HtmlWebpackPlugin({
      template: 'client/src/admin/admin.html',
      filename: `admin/admin.html`,
      chunks: []
    })
  ]
};

export default config;
