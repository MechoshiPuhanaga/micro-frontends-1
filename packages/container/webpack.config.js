const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');
// const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const cssResourcesPath = require(path.join(
  __dirname,
  'src',
  'styles',
  'shared',
  'index.js'
));

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';
  const isPWA = env.goal === 'pwa';

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
      publicPath: isDev ? '/' : '/container/latest/'
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
            loader: 'babel-loader'
            // options: {
            //   plugins: [isDev && require.resolve('react-refresh/babel')].filter(
            //     Boolean
            //   )
            // }
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
            ? `auth@http://${
                isPWA ? '10.0.2.2' : 'localhost'
              }:8081/remoteEntry.js`
            : `auth@${process.env.PRODUCTION_DOMAIN}/auth/latest/remoteEntry.js`,
          dashboard: isDev
            ? `dashboard@http://${
                isPWA ? '10.0.2.2' : 'localhost'
              }:8082/remoteEntry.js`
            : `dashboard@${process.env.PRODUCTION_DOMAIN}/dashboard/latest/remoteEntry.js`,
          about: isDev
            ? `about@http://${
                isPWA ? '10.0.2.2' : 'localhost'
              }:8083/remoteEntry.js`
            : `about@${process.env.PRODUCTION_DOMAIN}/about/latest/remoteEntry.js`,
          team: isDev
            ? `team@http://${
                isPWA ? '10.0.2.2' : 'localhost'
              }:8084/remoteEntry.js`
            : `team@${process.env.PRODUCTION_DOMAIN}/team/latest/remoteEntry.js`
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
      }),
      new CopyWebpackPlugin({
        patterns: [{ from: './src/workers/sw.js', to: '' }]
      }),
      new WebpackAssetsManifest({
        customize(entry, original, manifest, asset) {
          if (
            asset.info.compressed ||
            asset.name.endsWith('.map') ||
            asset.name.endsWith('.txt')
          ) {
            return false;
          } else {
            return entry;
          }
        },
        sortManifest: true
      }),
      new WebpackPwaManifest({
        name: 'Form Builder',
        short_name: 'form-builder',
        description: 'Form Builder library',
        background_color: 'blue',
        crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
        icons: [
          {
            src: path.join(__dirname, 'src', 'favicon.png'),
            sizes: [96, 128, 192, 256, 384, 512]
          },
          {
            src: path.join(__dirname, 'src', 'favicon.png'),
            size: '1024x1024'
          },
          {
            src: path.join(__dirname, 'src', 'favicon.png'),
            size: '1024x1024',
            purpose: 'maskable'
          }
        ],
        start_url: '.',
        ios: true,
        inject: true
      })
    ],
    devtool: isDev ? 'eval-source-map' : 'source-map',
    devServer: {
      client: {
        logging: 'error',
        overlay: true
      },
      compress: true,
      hot: true,
      open: true,
      port: isPWA ? 8070 : 8090
    }
  };

  if (!isDev) {
    config.plugins.push(new CompressionPlugin());
  } else {
    // config.plugins.push(new ReactRefreshWebpackPlugin());
  }

  return config;
};
