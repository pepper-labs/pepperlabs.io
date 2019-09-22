'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const optimization = isProduction ? {
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      vendors: {
        test: /([\\/]node_modules[\\/]|common\.scss)/,
        name: 'vendors'
      }
    }
  },
  minimizer: [
    new UglifyJsPlugin({ cache: true, parallel: true, sourceMap: true }),
    new OptimizeCssAssetsWebpackPlugin({})
  ]
} : {
  removeAvailableModules: false,
  removeEmptyChunks: false,
  splitChunks: false
};

const plugins = [
  new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['dist'] }),
  new CopyWebpackPlugin([{ from: 'assets', to: 'static' }]),
  new WorkboxPlugin.GenerateSW({
    runtimeCaching: [
      {
        urlPattern: /static\/.*/,
        handler: 'NetworkFirst',
        options: {
          networkTimeoutSeconds: 10
        }
      }
    ]
  }),
  new HtmlWebpackPlugin({
    template: './src/pages/index.pug',
    chunks: ['home'],
    filename: './index.html',
    minify: true
  }),
  new HtmlWebpackPlugin({
    template: './src/pages/404.pug',
    chunks: ['404'],
    filename: './static/404.html',
    minify: true
  }),
  new HtmlWebpackPlugin({
    template: './src/pages/culture/culture.pug',
    chunks: ['culture'],
    filename: './culture/index.html',
    minify: true
  })
];

if (isProduction) {
  plugins.push(
    new MiniCssExtractPlugin({
      filename: 'static/[name].[contenthash].css',
      chunkFilename: 'static/[name].[id].[contenthash].css'
    }),
    new ScriptExtHtmlWebpackPlugin({ defaultAttribute: 'async' }),
    new CompressionPlugin({ test: /\.(js|html|css)$/ })
  );
}

module.exports = {
  entry: {
    home: ['./src/style/common.scss', './src/pages/index.scss', './src/pages/index.ts'],
    culture: ['./src/style/common.scss', './src/style/content.scss', './src/pages/index.ts'],
    404: ['./src/style/common.scss', './src/pages/404.scss']
  },
  optimization,
  plugins,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          { loader: 'babel-loader' },
          { loader: 'ts-loader', options: { transpileOnly: true } }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'static/[name].[contenthash].js',
    publicPath: '/',
    path: path.resolve(__dirname, 'dist')
  },
  mode: (process.env.NODE_ENV === 'production') ? 'production' : 'development',
  devtool: 'sourcemaps'
};
