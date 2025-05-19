const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: 'development',
	devtool: 'source-map',
	entry: './src/main.tsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		assetModuleFilename: 'assets/[name][ext]',
		clean: true // Очищает папку dist перед каждой сборкой
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss', '.css'],
		modules: [path.resolve(__dirname, 'src'), 'node_modules'],
		alias: {
			'@fontsource': path.resolve(__dirname, 'node_modules/@fontsource'),
			'@assets': path.resolve(__dirname, 'public/assets')
		}
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				use: {
					loader: 'ts-loader',
					options: {
						configFile: 'tsconfig.json',
						transpileOnly: true
					}
				},
				exclude: /node_modules/,
			},
			{
				test: /\.module\.scss$/,
				use: [
					require.resolve('style-loader'),
					{
						loader: require.resolve('css-loader'),
						options: {
							importLoaders: 1,
							modules: {
								localIdentName: '[local]', // оригинальные имена классов
							},
						},
					},
					{
						loader: require.resolve('sass-loader'),
						options: {
							implementation: require('sass'),
							sassOptions: {
								fiber: false,
								quietDeps: true,
								includePaths: [path.resolve(__dirname, 'node_modules')]
							},
						},
					},
				],
			},
			{
				test: /\.scss$/,
				exclude: /\.module\.scss$/,
				use: [
					require.resolve('style-loader'),
					require.resolve('css-loader'),
					{
						loader: require.resolve('sass-loader'),
						options: {
							implementation: require('sass'),
							sassOptions: {
								fiber: false,
								quietDeps: true,
								includePaths: [path.resolve(__dirname, 'node_modules')]
							},
						},
					},
				],
			},
			{
				test: /\.css$/,
				use: [
					require.resolve('style-loader'),
					require.resolve('css-loader')
				]
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg|webp)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'assets/images/[name][ext]'
				}
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'assets/fonts/[name][ext]'
				}
			}
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: 'public/assets',
					to: 'assets',
					noErrorOnMissing: true // Не выдавать ошибку, если папка пустая
				}
			]
		})
	],
	stats: {
		loggingDebug: ['sass-loader', 'css-loader', 'style-loader']
	}
};
