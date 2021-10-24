const path = require('path');
const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env) => {
  console.log({env})
  return {
    mode: 'development',
    entry: {
      app: './src/index.js',
    },
    devtool: 'inline-source-map',
    devServer: {
      static: './dist',
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Caching',
      }),
      new BundleAnalyzerPlugin(),
    ],
    output: {
      filename: '[name].[contenthash].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      publicPath: '/',
    },
    resolve: {
      alias: {
        Static: path.resolve(__dirname, 'src/static'),
      },
      symlinks: false,    // 심볼릭 링크를 사용하지 않는 경우 resolve.symlinks: false를 설정하세요(예: npm link 또는 yarn link).
      cacheWithContext: false,    // 컨텍스트에 특정적이지 않은 커스텀 해석 플러그인을 사용하는 경우 resolve.cacheWithContext: false를 설정하세요.

    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          include: path.resolve(__dirname, 'src'),
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(csv|tsv)$/i,
          use: ['csv-loader'],
        },
        {
          test: /\.xml$/i,
          use: ['xml-loader'],
        },
        {
          test: /\.toml$/i,
          type: 'json',
          parser: {
            parse: toml.parse,
          },
        },
        {
          test: /\.yaml$/i,
          type: 'json',
          parser: {
            parse: yaml.parse,
          },
        },
        {
          test: /\.json5$/i,
          type: 'json',
          parser: {
            parse: json5.parse,
          },
        },
      ],
    },
    optimization: {
      moduleIds: 'deterministic',
      //  런타임 코드를 별도의 청크로 분할하는 최적화 기능, BundleAnalyzerPlugin 의 view 도 달라진다.
      runtimeChunk: 'single',
      // lodash 또는 react와 같은 타사 라이브러리는 로컬 소스 코드보다 변경 될 가능성이 적기 때문에 별도의 vendor 청크로 추출하는 것도 좋은 방법입니다. 이 단계를 통해 클라이언트는 최신 상태를 유지하기 위해 서버에 더 적은 요청을 할 수 있습니다.
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
  };
};
