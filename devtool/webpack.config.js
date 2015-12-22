var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var TransferWebpackPlugin = require('transfer-webpack-plugin');

const PATH_BUILD = path.resolve(__dirname, './build/www');
const PATH_NODE_MODULES = path.resolve(__dirname, '../node_modules');

module.exports = {
	entry: [
		path.join(__dirname, './src/index.js')
	],
	resolve: {
		extensions: ['', '.js', '.jsx'],
		modulesDirectories: [
			PATH_NODE_MODULES,
			path.join(__dirname, './src'),
			path.join(__dirname, '../')
		],
	},
	output: {
		path: PATH_BUILD,
		filename: 'app.js',
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, './src/index.html')
		}),
		new webpack.NoErrorsPlugin()
	],
	module: {
		loaders: [{
			test: /\.(js|jsx)$/,
			loaders: [
				'babel-loader'
			],
			exclude: [
				PATH_NODE_MODULES
			]
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
};
