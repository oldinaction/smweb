# webpack

## 介绍

- Webpack 是当下最热门的前端资源模块化管理和打包工具
- [webpack中文指南](http://webpackdoc.com/index.html)

## 笔记

- 依赖node.js
- 安装webpack：`npm install webpack -g` 使用npm全局安装webpack
    - `webpack -v` 查看版本(v2.2.1)

## 示例

- A-01-HelloWorld
    - 进入项目目录 (确定已经有 package.json，没有就通过 npm init 根据提示创建)
    - `npm install webpack --save-dev` 安装 webpack 依赖。`--save-dev`表示自动更新package.json中的依赖项
    - 创建一个静态页面 index.html 和一个 JS 入口文件 entry.js
    - `webpack entry.js bundle.js` 编译 entry.js 并打包到 bundle.js
- A-02
    - Webpack 本身只能处理 JavaScript 模块，如果要处理其他类型的文件，就需要使用 loader 进行转换。Loader 可以理解为是模块和资源的转换器，它本身是一个函数，接受源文件作为参数，返回转换的结果。这样，我们就可以通过 require 来加载任何类型的模块或文件，比如 CoffeeScript、 JSX、 LESS 或图片。
    - `npm install css-loader style-loader --save-dev` 安装样式相关loader：css-loader读取css文件，style-loader将样式插入到页面
    - webpack默认读取根目录名为`webpack.config.js`的文件
    - 创建页面
    - 运行 `webpack` 编译项目

## Demo (点击链接查看效果)
