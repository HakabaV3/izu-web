var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var TransferWebpackPlugin = require('transfer-webpack-plugin');

const PATH_BUILD = path.resolve(__dirname, 'www');
const PATH_NODE_MODULES = path.resolve(__dirname, './node_modules');

module.exports = {
	entry: [
		path.join(__dirname, './app/index.js')
	],
	resolve: {
		extensions: ['', '.js', '.jsx', '.md', '.txt'],
		modulesDirectories: [
			'web_modules',
			'node_modules',
			PATH_NODE_MODULES,
			path.resolve(__dirname, '../node_modules'),
			path.resolve(__dirname, './app'),
			path.resolve(__dirname, '../')
		]
	},
	devtool: 'source-map',
	devServer: {
		contentBase: PATH_BUILD,
		inline: true,
		hot: false,
		port: process.env.PORT || 3000
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
			inject: false,
			template: path.join(__dirname, './www/index.html')
		}),
		new webpack.NoErrorsPlugin(),
		new TransferWebpackPlugin([{
			from: 'www/css',
			to: 'css'
		}, {
			from: 'www/images',
			to: 'images'
		}], __dirname)
	],
	module: {
		loaders: [{
			test: /\.(js|jsx)$/,
			loaders: [
				'babel-loader?optional=runtime&stage=0'
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
	},
	eslint: {
		configFile: '../.eslintrc'
	}
};
