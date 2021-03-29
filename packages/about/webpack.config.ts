import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import RemovePlugin from 'remove-files-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import path from 'path';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
import CopyPlugin from 'copy-webpack-plugin';
// @ts-ignore
import ModuleFederationPlugin from 'webpack/lib/container/ModuleFederationPlugin';

import cssResourcesPath from './src/styles/shared';
import generateAliases from './aliases';

module.exports = (env: string, argv: { mode: string }) => {
  const isDev = argv.mode === 'development';

  const config = {
    entry: {
      // Entry file for compliation
      app: './src/index.ts'
    },
    output: {
      // Output directory and naming of file
      // For prod [contenthash] (generates new only on content update)
      filename: isDev ? 'static/js/[name].js' : 'static/js/[name].[contenthash:8].js',
      // Output directory and naming of chunkFile
      chunkFilename: isDev
        ? 'static/js/[name].chunk.js'
        : 'static/js/[name].chunk.[contenthash:8].js',
      // Otput root directory
      path: path.resolve(__dirname, 'dist'),
      // Tells webpack where to serve public assets from related to base url. In order to run index.html from Live Server just pass '/dist/'
      publicPath: isDev ? 'http://localhost:8083/' : '/about/latest/'
    },
    resolve: {
      // Passes alias cofiguration object
      alias: generateAliases(),
      // Files extensions to resolve
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    module: {
      // Defines loaders for handling different file types
      rules: [
        {
          // worker-loader module
          test: /\.worker\./,
          use: { loader: 'worker-loader' }
        },
        {
          // babael-loader module
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              // react-refresh/babel plugin for hot reload
              // plugins: [isDev && require.resolve('react-refresh/babel')].filter(Boolean)
            }
          }
        },
        {
          // Native Webpack support of file-loader
          // Defines assets/recource or assets/inline type
          // Allows configuring output per file types
          // fonts
          test: /\.(woff|woff2|ttf|eot)$/,
          type: 'asset/resource',
          generator: {
            filename: isDev
              ? 'static/assets/fonts/[name].[ext]'
              : 'static/assets/fonts/[name].[contenthash:8].[ext]'
          }
        },
        {
          // Native Webpack support of file-loader
          // Defines assets/recource or assets/inline type
          // Allows configuring output per file types
          // images
          test: /\.(png|jpe?g|gif|svg|ico)$/,
          type: 'asset/resource',
          generator: {
            filename: isDev
              ? 'static/assets/fonts/[name].[ext]'
              : 'static/assets/images/[name].[contenthash:8].[ext]'
          }
        },
        {
          // .scss loaders configuration
          test: /\.scss$/,
          use: [
            {
              // Use MiniCssExtractPlugin instead of style-loader
              // Extracts separate css files
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader',
              options: {
                // Defines the number of subsequent .scss loaders
                importLoaders: 3,
                modules: {
                  // Add .scss module file naming
                  localIdentName: '[name]__[local]__about__[hash:base64:5]'
                },
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  // Use autoprefixer package for postcss
                  plugins: ['autoprefixer']
                }
              }
            },
            {
              loader: 'sass-loader'
            },
            {
              // Sharing sass recources
              // Use it for constants only when working with css modules
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
        name: 'about',
        filename: 'remoteEntry.js',
        exposes: {
          './AboutApp': './src/bootstrap'
        }
        //shared: ['react', 'react-dom']
      }),

      // Speeds up TypeScript type checking and ESLint linting (by moving each to a separate process)
      new ForkTsCheckerWebpackPlugin({
        // async flag to tell Webpack to wait for the type checking process to finish before it emits any code
        async: false
      }),
      // Used to remove files prior to build
      new RemovePlugin({
        /**
         * Before compilation permanently removes
         * entire `./dist` folder.
         */
        before: {
          include: [path.resolve(__dirname, 'dist'), path.resolve(__dirname, 'out')]
        }
      }),
      // Extract html from template
      new HtmlWebPackPlugin({
        favicon: path.resolve(__dirname, 'src/favicon.png'),
        template: path.resolve(__dirname, './src/index.html'),
        scriptLoading: 'defer'
      }),
      // Define naming of extracted .css files
      new MiniCssExtractPlugin({
        filename: isDev ? 'static/css/[name].css' : 'static/css/[name].[contenthash:8].css',
        chunkFilename: isDev ? 'static/css/[id].css' : 'static/css/[id].[contenthash:8].css'
      }),
      // Pass global constants which can be configured at compile time
      new webpack.DefinePlugin({
        __mode__: JSON.stringify(argv.mode)
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'public'),
            to: ''
          }
        ]
      })
    ],
    // Reference:
    // https://medium.com/hackernoon/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758
    // https://blog.logrocket.com/guide-performance-optimization-webpack/
    // Optimization config
    // optimization: {
    //   // Define manifest chunk that provides separate chunks binding
    //   runtimeChunk: {
    //     // TODO ModuleFederationPlugin requires runtimeChunk name fix
    //     name: 'runtime'
    //   },
    //   splitChunks: {
    //     // Split everything to chunks,
    //     // including lazy loaded code
    //     chunks: 'all',
    //     // Maximum number of parallel requests at an entry point
    //     maxInitialRequests: Infinity,
    //     // Remove limit 30 (Minimum size, in bytes, for a chunk to be generated) for enabling chunk splitting
    //     minSize: 0,
    //     cacheGroups: {
    //       vendor: {
    //         test: /node_modules/,
    //         name(module: { context: { match: (arg0: RegExp) => any[] } }) {
    //           // get the name. E.g. node_modules/packageName/not/this/part.js
    //           // or node_modules/packageName
    //           const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

    //           // npm package names are URL-safe, but some servers don't like @ symbols
    //           return `npm.${packageName.replace('@', '')}`;
    //         }
    //       }
    //     }
    //   },
    //   minimizer: []
    // },
    // source-map in prod adds only a URL string to the .map file
    devtool: isDev ? 'eval-source-map' : 'source-map',
    devServer: {
      clientLogLevel: 'silent',
      port: 8083,
      historyApiFallback: true,
      // hot: true,
      noInfo: true,
      open: true,
      stats: 'minimal'
    }
  };

  if (!isDev) {
    // Compress in prod
    config.plugins.push(new CompressionPlugin());
    // Add TerserPlugin (default Webpack minimizer) and CssMinimizerPlugin
    // (config.optimization.minimizer as any).push(new TerserPlugin(), new CssMinimizerPlugin());
    // Add BundelAnalyzerPlugin for tracking build size
    config.plugins.push(new BundleAnalyzerPlugin());
  } else {
    // config.plugins.push(new webpack.HotModuleReplacementPlugin());
    // config.plugins.push(new ReactRefreshWebpackPlugin());
  }

  return config;
};
