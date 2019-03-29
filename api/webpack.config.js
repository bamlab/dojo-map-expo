const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDev ? 'development' : 'production',
  target: 'node',
  devtool: 'source-map',
  externals: nodeExternals({
    modulesFromFile: true,
    whitelist: [
      /\.(eot|woff|woff2|ttf|otf)$/,
      /\.(svg|png|jpg|jpeg|gif|ico|webm)$/,
      /\.(mp4|mp3|ogg|swf|webp)$/,
      /\.(css|scss|sass|less|styl)$/,
    ],
  }),
  performance: {
    hints: false,
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
  node: {
    __filename: true,
    __dirname: true,
  },
  output: {
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    libraryTarget: 'commonjs2',
  },
  stats: 'errors-only',
  module: {
    rules: [
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'webpack-graphql-loader',
      },
      {
        test: /\.json$/,
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
        options: {
          babelrc: true,
          cacheDirectory: true,
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: isDev,
    }),
    // In order to provide sourcemaps, we automagically insert this at the
    // top of each file using the BannerPlugin.
    new webpack.BannerPlugin({
      raw: true,
      entryOnly: false,
      banner: "require('source-map-support/register')",
    }),
    new FriendlyErrorsWebpackPlugin({
      clearConsole: isDev,
    }),
    isDev &&
      new NodemonPlugin({
        nodeArgs: ['--inspect'],
        watch: path.resolve('./dist'),
      }),
  ].filter(Boolean),
  optimization: {
    // optimization.noEmitOnErrors prevents Webpack
    // from printing out compile time stats to the console.
    noEmitOnErrors: true,
  },
};
