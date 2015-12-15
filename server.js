var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var config = require('./webpack.config')

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}))
app.use(express.static(__dirname));
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html')
});

app.listen(port, function(error) {
	if (error) {
		console.error(error)
	} else {
		console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
	}
})
