const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const config = require('./config').configBuilder;


module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    vendor: [
      'react',
      'react-dom',
    ],
    index: path.resolve('src', 'index.tsx'),
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve('dist'),
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          },
          'sass-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.svg/,
        use: [
          {
            loader: 'url-loader',
            options: {},
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve('public', 'index.html'),
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        graphqlUrl: JSON.stringify(config.graphqlUrl),
        accessTokenUrl: JSON.stringify(config.accessTokenUrl),
        user: JSON.stringify(config.user),
        githubClientId: JSON.stringify(config.githubClientId),
        githubClientSecret: JSON.stringify(config.githubClientSecret),
      }
    }),
  ].concat(process.env.NODE_ENV !== 'production' ? new webpack.HotModuleReplacementPlugin() : []),
  devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3030,
    publicPath: '/',
    hot: true,
  },
};
