const os = require('node:os');
const path = require('node:path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

// cpu核数，多进程打包
const threads = os.cpus().length;

module.exports = (env) => {
  const isEnvDevelopment = env.development;
  const getStyleLoaders = (preLoader) => [
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
            'postcss-preset-env',
          ],
        },
      },
    },
    preLoader,
  ].filter(Boolean);

  return {
    entry: {
      about: './src/About.tsx',
      index: './src/ReactRedux.tsx',
    },
    mode: isEnvDevelopment ? 'development' : 'production',
    devtool: isEnvDevelopment ? 'inline-source-map' : 'source-map',
    output: {
      path: path.resolve(__dirname, './dist'),
      // 入口文件打包输出资源命名方式
      filename: isEnvDevelopment ? 'static/js/[name].js' : 'static/js/[name].[contenthash:8].js',
      // 动态导入输出资源命名方式
      chunkFilename: 'static/js/[name].chunk.js',
      // 图片、字体等资源命名方式
      assetModuleFilename: isEnvDevelopment ? 'static/media/[name][ext]' : 'static/media/[contenthash:8][ext]',
      clean: true,
      pathinfo: false,
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          oneOf: [ // 打包时每个文件都会经过所有 loader 处理，`test` 正则不匹配不处理，但是都要过一遍。比较慢。
            {
              test: /\.(js?x)$/,
              use: [
                {
                  loader: 'thread-loader', // 开启多进程
                  options: {
                    workers: threads, // 数量
                  },
                },
                {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                      ['@babel/preset-env', { modules: false }],
                      '@babel/preset-react',
                    ],
                    plugins: [
                      [
                        '@babel/plugin-transform-runtime',
                      ],
                    ],
                    cacheDirectory: true, // 开启babel编译缓存 [缓存之前的 Eslint 检查 和 Babel 编译结果，第二次打包时速度就会更快]
                    cacheCompression: false, // 缓存文件不要压缩
                  },
                },
              ],
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
                ...getStyleLoaders('less-loader'),
              ],
            },
            {
              test: /\.ts(x)?$/,
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
              exclude: /node_modules/,
            },
            {
              test: /\.(svg|png|jpe?g)$/,
              type: 'asset',
              parser: {
                dataUrlCondition: {
                  maxSize: 10 * 1024,
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: 'body',
        template: 'public/index.html',
        favicon: 'public/favicon.ico',
        filename: 'index.html',
        chunks: ['index'],
      }),
      new HtmlWebpackPlugin({
        inject: 'body',
        template: 'public/index.html',
        favicon: 'public/favicon.ico',
        filename: 'about.html',
        chunks: ['about'],
      }),
      new MiniCssExtractPlugin({
        filename: isEnvDevelopment ? 'static/css/[name].css' : 'static/css/[name].[contenthash:8].css',
        chunkFilename: isEnvDevelopment ? 'static/css/[name].css' : 'static/css/[name].[contenthash:8].css',
      }),
      new ESLintWebpackPlugin({
        context: path.resolve(__dirname, 'src'),
        exclude: 'node_modules', // 默认值
        cache: true, // 开启缓存
        // 缓存目录
        cacheLocation: path.resolve(
          __dirname,
          '../node_modules/.cache/.eslintcache',
        ),
        threads, // 开启多进程
      }),

    ],
    optimization: {
      minimize: !isEnvDevelopment,
      splitChunks: { // 代码分割配置
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
      removeAvailableModules: false,
      removeEmptyChunks: false,
      // splitChunks: false,
      minimizer: [
        new CssMinimizerWebpackPlugin(),
        new TerserPlugin({
          parallel: threads, // 开启多进程
        }),
      ],
      runtimeChunk: {
        name: (entrypoint) => `runtime~${entrypoint.name}`,
      },
    },
    devServer: {
      port: 80,
      static: './dist',
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
