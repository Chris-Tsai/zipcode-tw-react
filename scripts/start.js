const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const config = require("../webpack.config");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 3001;
const host = process.env.HOST || 'localhost';

const cfg = config();

fs.unlink(path.resolve(cfg.output.path, cfg.output.filename), function() {});

cfg.entry.app.unshift(
	"webpack-dev-server/client?http://"+host+":"+port+"/",
	"webpack/hot/dev-server"
);

cfg.plugins.unshift(
    new webpack.HotModuleReplacementPlugin()
);

// console.log(JSON.stringify(cfg));

const compiler = webpack(cfg);

// webpack-dev-server options: https://webpack.github.io/docs/webpack-dev-server.html#api
const server = new WebpackDevServer(compiler, {
	hot: true,
	before: function(app) {
		// Here you can access the Express app object and add your own custom middleware to it.
		// For example, to define custom handlers for some paths:
		// app.get('/some/path', function(req, res) {
		//   res.json({ custom: 'response' });
		// });
	},
	quiet: true,
	publicPath:  '/build/',
	stats: { colors: true }
});
server.listen(port, host, function(err) {
	if (err) {
		throw new Error(err);
	}
	console.log('Listening on http://' + host + ':' + port);
});