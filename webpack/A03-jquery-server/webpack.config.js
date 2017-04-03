var webpack = require("webpack");
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	// 配置生成Source Maps利于调试
	devtool: 'eval-source-map',
	devServer: {
		port: "80",
		contentBase: "./dist", //本地服务器根目录为编译后的dist目录
		historyApiFallback: true, //不跳转
		inline: true //实时刷新
	},

	// 页面入口文件配置
	entry: {
		index: "./app/js/index.js"
	},
	// 入口文件输出配置
	output: {
		path : path.resolve(__dirname, "dist"), // 编译后的文件的路径
		filename: "[name].bundle.js", // [name]代表entry的每一个键值. 如index.js会编译成index.bundle.js
	},
	// 插件项，需要new一个这个插件的实例
    plugins: [
		// 提取多个入口文件的公共脚本部分(如每个页面引入了jquery)，然后生成一个 common.js
		new webpack.optimize.CommonsChunkPlugin('common.js'),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "/app/index.tmpl.html")
		}),
		// 热加载(修改js代码，无需运行webpack再次编译)
		new webpack.HotModuleReplacementPlugin(),
		// 开发环境标识
		// new webpack.DefinePlugin({
		// 	__DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
		// });
	],
	module: {
		// 加载器配置
		loaders: [
			//.css 文件使用 style-loader 和 css-loader 来处理
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            //.js 文件使用 jsx-loader 来编译处理
            // { test: /\.js$/, loader: 'jsx-loader?harmony' },
            //.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理("-loader"其实是可以省略不写的，多个loader之间用"!")
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
		]
	},
	// 其它解决方案配置(webpack2.0中resolve无root属性)
	resolve: {
		// 模块别名定义，方便后续直接引用别名，无须多写长长的地址
		alias: {
			jquery: path.join(__dirname, "/node_modules/jquery/dist/jquery.min.js")
		},
		//自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
		extensions: ['.js', '.json', '.scss'],
	},
	/*
	externals: {
		// 对应全局变量 jQuery(此时需要在html页面通过<script>标签引入jquery)
		jquery: "jQuery"
	}
	*/
}
