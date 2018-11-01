const path = require('path');

module.exports = function (app = "app.js") {
  return {
    entry: {
      app: ['@babel/polyfill', path.resolve(__dirname, app)]
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'zipcode-tw-react-example.js',
      chunkFilename: '[name].js'
    },
    module: {
      loaders: [{
        test: /\.(js|jsx)$/,
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        loaders: ['babel-loader']
      }]
    },
    plugins: [],
    node: {}
  };
};
