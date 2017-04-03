var webpack = require('webpack')

module.exports = {
    // 页面入口文件配置
    entry: './entry.js',
    // 入口文件输出配置
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    // 插件项，需要new一个这个插件的实例
    plugins: [
        // 运行webpack后，可看到此项目的bundle.js相比A-01-HelloWorld中的bundle.js会在顶部多出下面的这行注释
        new webpack.BannerPlugin('This file is created by smalle')
    ],
    module: {
        // 加载器配置
        //.css 文件使用 style-loader 和 css-loader 来处理
        loaders: [{
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }]
    }
}
