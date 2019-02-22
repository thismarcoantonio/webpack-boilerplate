import { resolve } from 'path';
import { HotModuleReplacementPlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import config from './config';
import Dotenv from 'dotenv-webpack';

const devMode = process.env.NODE_ENV === 'development';

export default {
  devtool: devMode ? 'cheap-module-eval-source-map' : false,
  entry: './src/app.js',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      app: resolve(__dirname, 'src'),
      components: resolve(__dirname, 'src', 'components'),
      utils: resolve(__dirname, 'src', 'utils'),
      'react-dom': '@hot-loader/react-dom'
    }
  },
  stats: {
    colors: true
  },
  mode: devMode ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
          'eslint-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            publicPath: '/public/images/'
          }
        }
      },
      {
        test: /\.(eot|woff|ttf|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        }
      },
      {
        test: /\.svg$/,
        use: '@svgr/webpack'
      }
    ]
  },
  devServer: {
    compress: true,
    historyApiFallback: true,
    port: process.env.PORT || 5500,
    contentBase: resolve(__dirname, 'public'),
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      ...config,
      template: 'index.html',
      minify: { collapseWhitespace: true }
    }),
    new HotModuleReplacementPlugin(),
    new Dotenv()
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};
