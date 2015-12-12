var path = require('path')
var webpack = require('webpack')

module.exports = {
	devtool: 'cheap-module-eval-source-map',
	entry: [
		'./index'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.NoErrorsPlugin()
	],
	module: {
		loaders: [{
			test: /\.js$/,
			loaders: [
				'babel'
			],
			exclude: /node_modules/,
			include: __dirname
		}, {
			test: /\.scss$/,
			loaders: [
				'style',
				'css',
				'autoprefixer?browsers=last 3 versions',
				'sass?outputStyle=expanded'
			]
		}]
	}
}
