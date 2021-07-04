module.exports = {
  mode: "development",
  context: __dirname,
  entry: {
    app: "./src/app.js",
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].bundle.js",
  },
};
