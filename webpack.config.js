const isDev = process.env.NODE_ENV === 'development';
module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: ['@babel/polyfill', './client/index.js'],
  output: {
    path: __dirname,
    filename: './public/bundle.js',
  },
  watch: true,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
};
