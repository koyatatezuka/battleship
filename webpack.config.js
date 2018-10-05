const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
	entry: {
		index: './src/index.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	},
	watch: true,
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader']
				})
			},
			{
				test: /\.(png|jpg|gif)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 5000
						}
					}
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			}
		]
	},
	devServer: {
		hot: true
	},
	plugins: [
		new ExtractTextPlugin({ filename: 'index.css' }),
		new HtmlWebpackPlugin({
			inject: false,
			hash: true,
			template: './src/index.html',
			filename: 'index.html'
    }),
	new webpack.HotModuleReplacementPlugin(),
	new BrowserSyncPlugin({
		// browse to http://localhost:3000/ during development,
		// ./public directory is being served
		host: 'localhost',
		port: 3000,
		files: ['./dist/*.html', './dist/*.css'],
		server: { baseDir: ['dist'] }
	  })
	]
};
