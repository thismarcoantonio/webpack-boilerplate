import { resolve } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCSSExtractPlugin from 'mini-css-extract-plugin'
import config from './config'

const devMode = process.env.NODE_ENV === 'development'

export default {
  devtool: devMode ? 'cheap-module-eval-source-map' : null,
  entry: './src/app.js',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      data: resolve(__dirname, 'src', 'data'),
      components: resolve(__dirname, 'src', 'components'),
      containers: resolve(__dirname, 'src', 'containers'),
      app: resolve(__dirname, 'src')
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
        test: /\.scss$/,
        use: [
          devMode ? 'style-loader' : MiniCSSExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { minimize: true }
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: { sourceMaps: true }
          }
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
      }
    ]
  },
  devServer: {
    compress: true,
    historyApiFallback: true,
    port: process.env.PORT || 3000,
    contentBase: resolve(__dirname, 'public')
  },
  plugins: [
    new HtmlWebpackPlugin({
      ...config,
      template: 'index.html',
      minify: { collapseWhitespace: true }
    }),
    new MiniCSSExtractPlugin({ filename: 'style.css' })
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
}
