# vue.js

## 介绍

- [官方Doc (v2.0)](http://cn.vuejs.org/v2/guide/)

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

- [A-01-HelloWorld]((https://oldinaction.github.io/smweb/vuejs/A-01-HelloWorld/))

## Demo (点击链接查看效果)

- [D-01-GithubCommit](https://oldinaction.github.io/smweb/vuejs/D-01-GithubCommit/)
