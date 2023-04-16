const path = require('node:path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ESLintWebpackPlugin = require("eslint-webpack-plugin");

module.exports = (env) => {
  const isEnvDevelopment = env.development;
  const getStyleLoaders = () => {
    return [
      isEnvDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              'postcss-flexbugs-fixes',
              'postcss-normalize',
              'autoprefixer',
            ],
          },
        },
      },
    ];
  };

  return {
    entry: {
      about: './src/about.tsx',
      index: './src/index.tsx',
    },
    mode: isEnvDevelopment ? 'development' : 'production',
    devtool: isEnvDevelopment ? 'eval-cheap-module-source-map' : false,
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'static/js/[name].[contenthash:8].js',
      clean: true,
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /\.(js?x)$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {modules: false}],
                '@babel/preset-react',
              ],
              plugins: [
                [
                  '@babel/plugin-transform-runtime',
                ],
              ],
            },
          },
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: getStyleLoaders(),
          exclude: /\.module\.css$/,
        },
        {
          test: /\.less$/,
          use: [
            ...getStyleLoaders(),
            'less-loader',
          ],
        },
        {
          test: /\.ts(x)?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(svg|png|jpe?g)$/,
          type: 'asset',
          generator: {
            filename: 'static/media/[contenthash:8][ext]',
          },
          parser: {
            dataUrlCondition: {
              maxSize: 10 * 1024,
            },
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: 'body',
        template: 'public/index.html',
        favicon: 'public/favicon.ico',
        filename: "index.html",
        chunks: ['index'],
      }),
      new HtmlWebpackPlugin({
        inject: 'body',
        template: 'public/index.html',
        favicon: 'public/favicon.ico',
        filename: "about.html",
        chunks: ['about'],
      }),
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].css',
      }),
      new ESLintWebpackPlugin(),
    ],
    optimization: {
      minimize: !isEnvDevelopment,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
      minimizer: [
        new CssMinimizerWebpackPlugin(),
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
        }),
      ],
      runtimeChunk: {
        name: (entrypoint) => `runtime~${entrypoint.name}`,
      },
    },
    devServer: {
      port: 8080,
      static: './dest',
      compress: true,
      historyApiFallback: true,
      hot: true,
      client: {
        logging: 'none',
        overlay: false, // 关闭浏览器页面显示eslint错误
      },
      watchFiles: ['./src'],
      open: true,
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    performance: false,
  };
};
