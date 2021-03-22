const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');

const cssResourcesPath = require(path.join(
  __dirname,
  'src',
  'styles',
  'shared',
  'index.js'
));

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';

  const config = {
    entry: {
      app: './src/index.js'
    },
    output: {
      filename: isDev ? 'public/[name].js' : 'public/[name].[chunkhash].js',
      chunkFilename: isDev
        ? 'public/[name].chunk.js'
        : 'public/[name].chunk.[chunkhash].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    },
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@services': path.resolve(__dirname, 'src/services')
      },
      extensions: ['.js', '.jsx', '.scss']
    },
    module: {
      rules: [
        {
          test: /\.worker\./,
          use: { loader: 'worker-loader' }
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins: [isDev && require.resolve('react-refresh/babel')].filter(
                Boolean
              )
            }
          }
        },
        {
          test: /\.(woff|woff2|ttf|eot)$/,
          type: 'asset/resource',
          generator: {
            filename: 'public/fonts/[name].[ext]'
          }
        },
        {
          test: /\.(png|jpe?g|gif|svg|ico)$/,
          type: 'asset/resource',
          generator: {
            filename: 'public/images/[name].[ext]'
          }
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 3,
                modules: {
                  localIdentName: '[name]__[local]__[hash:base64:5]'
                },
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: ['autoprefixer']
                }
              }
            },
            {
              loader: 'sass-loader'
            },
            {
              loader: 'sass-resources-loader',
              options: {
                resources: cssResourcesPath
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'container',
        remotes: {
          auth: isDev
            ? 'auth@http://localhost:8081/remoteEntry.js'
            : `auth@${process.env.PRODUCTION_DOMAIN}/auth/remoteEntry.js`
        },
        shared: ['react', 'react-dom']
      }),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: 'dist'
      }),
      new HtmlWebPackPlugin({
        favicon: './src/favicon.png',
        template: './src/index.html'
      }),
      new MiniCssExtractPlugin({
        filename: isDev ? 'public/[name].css' : 'public/[name].[chunkhash].css',
        chunkFilename: isDev ? 'public/[id].css' : 'public/[id].[chunkhash].css'
      }),
      new webpack.DefinePlugin({
        __mode__: JSON.stringify(argv.mode)
      })
    ],
    devtool: isDev ? 'eval-source-map' : 'source-map',
    devServer: {
      clientLogLevel: 'silent',
      historyApiFallback: true,
      hot: true,
      noInfo: true,
      open: true,
      port: 8080,
      stats: 'minimal'
    }
  };

  if (!isDev) {
    config.plugins.push(new CompressionPlugin());
  } else {
    config.plugins.push(new ReactRefreshWebpackPlugin());
  }

  return config;
};
