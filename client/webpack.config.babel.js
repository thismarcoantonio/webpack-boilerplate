import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCSSExtractPlugin from 'mini-css-extract-plugin'
import autoprefixer from 'autoprefixer'
const devMode = process.env.NODE_ENV === 'development'

export default {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  mode: devMode ? 'development' : 'production',
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
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
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    port: process.env.PORT || 3000
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new MiniCSSExtractPlugin({ filename: 'style.css' })
  ]
}
