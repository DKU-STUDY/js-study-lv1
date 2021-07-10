const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  // entry files
  entry: ['@babel/polyfill', './src/js/main.js', './src/sass/main.scss'],
  // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
  output: {
    path: path.resolve(__dirname, 'dist'), // ✏️
    filename: 'js/bundle.js', // ✏️
  },
  plugins: [
    new MiniCssExtractPlugin({filename: 'css/style.css'})
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src/js')],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // ✏️
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to Css, using Node Sass by default
        ],
        exclude: /node_modules/
      },
    ]
  },
  devtool: 'source-map',
  mode: 'development',
};