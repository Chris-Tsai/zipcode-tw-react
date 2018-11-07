const webpack = require("webpack");
const config = require("../webpack.config");
const path = require('path');
const fs = require('fs-extra');

console.log('Creating an optimized build...');

const cfg = config();
cfg.output.path = path.resolve(__dirname, '../dist');

// delete build folder
const deleteFolderRecursive = function (path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file, index) {
      const curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    // fs.rmdirSync(path);
  }
};

deleteFolderRecursive(cfg.output.path);
console.log('Successfully deleted dist folder');

webpack(cfg).run(function (err, stats) {
  if (err) {
    throw new Error(err);
  }
  const jsonStats = stats.toJson();
  if (jsonStats.errors.length > 0) {
    throw new Error(jsonStats.errors);
  }
  console.log('Successfully compiled: ' + path.resolve(cfg.output.path,
      cfg.output.filename));
});

// begin compile uglify file
const minCfg = config();
minCfg.output.path = path.resolve(__dirname, '../dist');
minCfg.output.filename = 'zipcode-tw-react.min.js';

minCfg.plugins.unshift(
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
);

webpack(minCfg).run(function (err, stats) {
  if (err) {
    throw new Error(err);
  }
  const jsonStats = stats.toJson();
  if (jsonStats.errors.length > 0) {
    throw new Error(jsonStats.errors);
  }
  console.log(
      'Successfully compiled uglify: ' + path.resolve(minCfg.output.path,
      minCfg.output.filename));
});