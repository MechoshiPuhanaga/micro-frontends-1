const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
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
    entry: './src/index.js',
    output: {
      filename: isDev ? 'public/[name].js' : 'public/[name].[chunkhash].js',
      chunkFilename: isDev
        ? 'public/[name].chunk.js'
        : 'public/[name].chunk.[chunkhash].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: isDev ? 'http://localhost:8082/' : '/dashboard/latest/'
    },
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.runtime.esm.js',
        '@components': path.resolve(__dirname, 'src/components'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@services': path.resolve(__dirname, 'src/services')
      },
      extensions: ['*', '.js', '.vue', '.json']
    },
    module: {
      rules: [
        {
          test: /\.worker\./,
          use: { loader: 'worker-loader' }
        },
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
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
                  localIdentName: '[name]__[local]__dashboard__[hash:base64:5]'
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
      new VueLoaderPlugin(),
      new ModuleFederationPlugin({
        name: 'dashboard',
        filename: 'remoteEntry.js',
        exposes: {
          './DashboardApp': './src/bootstrap'
        },
        shared: []
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
      port: 8082,
      stats: 'minimal'
    }
  };

  if (!isDev) {
    config.plugins.push(new CompressionPlugin());
  }

  return config;
};
