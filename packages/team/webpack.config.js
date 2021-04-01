const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const ngw = require('@ngtools/webpack');
const path = require('path');
const webpack = require('webpack');

const cssResourcesPath = require(path.join(
  __dirname,
  'src',
  'styles',
  'shared',
  'index.ts'
));

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';

  const config = {
    entry: {
      vendor: './src/vendor.ts',
      polyfills: './src/polyfills.ts',
      main: './src/index.ts'
    },
    output: {
      filename: isDev ? 'public/[name].js' : 'public/[name].[chunkhash].js',
      chunkFilename: isDev
        ? 'public/[name].chunk.js'
        : 'public/[name].chunk.[chunkhash].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: isDev ? 'http://localhost:8084/' : '/team/latest/'
    },
    resolve: {
      extensions: ['.ts', '.js', '.scss']
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          use: [
            {
              loader: 'raw-loader',
              options: {
                esModule: false
              }
            }
          ]
        },
        {
          test: /\.worker\./,
          use: { loader: 'worker-loader' }
        },
        {
          ...(!isDev
            ? {
                // Mark files inside `@angular/core` as using SystemJS style dynamic imports.
                test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
                parser: { system: true }
              }
            : {})
        },
        {
          ...(isDev
            ? {
                test: /\.ts$/,
                use: [
                  {
                    loader: 'awesome-typescript-loader',
                    options: {
                      configFileName: './tsconfig.json'
                    }
                  },
                  'angular2-template-loader',
                  'angular-router-loader'
                ],
                exclude: /node_modules/
              }
            : {
                test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                loader: '@ngtools/webpack'
              })
        },
        // {
        //   test: /\.(woff|woff2|ttf|eot)$/,
        //   type: 'asset/resource',
        //   generator: {
        //     filename: 'public/fonts/[name].[ext]'
        //   }
        // },
        // {
        //   test: /\.(png|jpe?g|gif|svg|ico)$/,
        //   type: 'asset/resource',
        //   generator: {
        //     filename: 'public/images/[name].[ext]'
        //   }
        // },
        {
          test: /\.(jpeg|jpg|gif|png)$/,
          use: [
            {
              loader: 'file-loader',
              options: { name: 'public/images/[name].[ext]' }
            }
          ]
        },
        {
          test: /\.scss$/,
          include: path.resolve(__dirname, 'src', 'styles'),
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
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
        },
        {
          test: /\.scss$/,
          include: path.resolve(__dirname, 'src', 'app'),
          use: [
            //  "style-loader",
            // {
            //   loader: MiniCssExtractPlugin.loader,
            // },
            'to-string-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                esModule: false,
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
      ].filter(Boolean)
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'team',
        filename: 'remoteEntry.js',
        exposes: {
          './TeamApp': './src/bootstrap'
        }
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
        'process.env.ENV': JSON.stringify(argv.mode)
      })
    ],
    devtool: isDev ? 'eval-source-map' : 'source-map',
    devServer: {
      clientLogLevel: 'silent',
      historyApiFallback: true,
      // hot: true,
      noInfo: true,
      open: true,
      port: 8084,
      stats: 'minimal',
      contentBase: path.resolve(__dirname, 'dist'),
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      }
    }
  };

  if (!isDev) {
    //config.plugins.push(new CompressionPlugin());
    config.plugins.push(
      new ngw.AngularCompilerPlugin({
        tsConfigPath: './tsconfig.aot.json'
        // entryModule: './src/app/app.module#AppModule'
      })
    );
  }

  return config;
};
