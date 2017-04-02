# webpack

## 介绍

- Webpack 是当下最热门的前端资源模块化管理和打包工具
- [webpack中文指南](http://webpackdoc.com/index.html)

## 笔记

- 依赖node.js
- 安装：`npm install webpack -g` 使用npm全局安装webpack
    - `webpack -v` 查看版本(v2.2.1)

## 示例

- A-01-HelloWorld
    - 进入项目目录 (确定已经有 package.json，没有就通过 npm init 根据提示创建)
    - `npm install webpack --save-dev` 安装 webpack 依赖
    - 创建一个静态页面 index.html 和一个 JS 入口文件 entry.js
    - `webpack entry.js bundle.js` 编译 entry.js 并打包到 bundle.js

## Demo (点击链接查看效果)
