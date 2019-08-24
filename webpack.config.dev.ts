const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  entry: {
    rhl: 'react-hot-loader/patch',
    app: ['@babel/polyfill', path.join(__dirname, 'src/client/app/main.tsx')],
    login: [
      '@babel/polyfill',
      path.join(__dirname, 'src/client/login/main.tsx')
    ],
    admin: [
      '@babel/polyfill',
      path.join(__dirname, 'src/client/admin/main.tsx')
    ]
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    modules: ['node_modules', 'client'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      '@root': path.resolve(__dirname, 'src'),
      '@shared': path.resolve(__dirname, 'src/client/shared'),
      '@redux': path.resolve(__dirname, 'src/client/app/redux'),
      '@components': path.resolve(__dirname, 'src/client/app/components'),
      '@features': path.resolve(__dirname, 'src/client/app/features'),
      '@views': path.resolve(__dirname, 'src/client/app/views')
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
    }),
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
};

export default config;
