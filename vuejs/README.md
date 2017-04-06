# vue.js

## 介绍

- [官方Doc (v2.0)](http://cn.vuejs.org/v2/guide/)
- 工具介绍
    - `vue-cli` vue脚手架：可通过npm安装，主要用于快速构建项目基本框架
    - `vue-devtools` vue调试工具，可在chrome商店下载安装此浏览器插件

## 笔记

- 表单控件修饰符：`.lazy`、`.number`、`.trim`
- 组件
    - [属性data必须是函数](http://cn.vuejs.org/v2/guide/components.html#data-必须是函数)
        - 函数中 `return obj`(obj = {count: 0}) 和 `return {count: 0}` 不同。前者组件的实例共享一个对象，后者组件实例使用不同的对象
    - [属性Prop的字面量语法和动态语法](http://cn.vuejs.org/v2/guide/components.html#字面量语法-vs-动态语法)
        - `<comp some-prop="1"></comp>`传递给子组件的是字符串、`<comp v-bind:some-prop="1"></comp>`传递的是number类型
    - [属性Prop为单向数据流](http://cn.vuejs.org/v2/guide/components.html#单向数据流)
        - prop 是单向绑定的：当父组件的属性变化时，将传导给子组件，但是不会反过来

## 示例

- [A01-helloworld](https://oldinaction.github.io/smweb/vuejs/A01-helloworld/)
    - 无需安装任何依赖，只需要将vue.js引入到html文件中即可

## 进阶

- B01-vuecli-webpack 使用vue-cli工具，初始化一个基于webpack模板的项目

    ```shell
    # 全局安装 vue-cli (vue脚手架：可初始化一个基本vue项目)
    $ npm install --global vue-cli
    # 在当前目录创建一个基于 webpack 模板的项目
    $ vue init webpack-simple
    # 安装依赖，走你 (根据初始化的package.json安装)
    $ npm install
    # 启动服务器
    $ npm run dev
    ```

## Demo (点击链接查看效果)

- [D01-github-commit](https://oldinaction.github.io/smweb/vuejs/D01-github-commit/)
    - 基于github提供的api，展示项目提交详情 (生命周期钩子、计算属性、观测、过滤器、ajax)
- [D02-work-element](https://oldinaction.github.io/smweb/vuejs/D02-work-element/)
    - 使用[element-starter通用模板(webpack)](https://github.com/ElementUI/element-starter)
    - `npm install` 安装依赖
    - `npm i vuex -S`、`npm i vue-router -S` 安装vue的vue-router(路由)和mixin
    - `npm run dev` 启动服务
