const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
  entry: {
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

  resolve: {
    modules: ['node_modules', 'client'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@shared': path.resolve(__dirname, 'src/client/shared'),
      '@root': path.resolve(__dirname, 'src'),
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
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
};

export default config;
