import vuePlugin from 'rollup-plugin-vue'
import babel from '@rollup/plugin-babel'
import json from "@rollup/plugin-json";
import postcss from 'rollup-plugin-postcss'
import path from 'path'

// 有点问题
const resolve = (p) => {
    return path.resolve(__dirname, p)
}
const getEntry = (component) => {
    return resolve(`./packages/demo/${component}/index.js`)
}

const titleCase = (strs) =>{
    let arr = strs.split('-')
    let newTitle =''
    arr.forEach(o=>{
        newTitle+= (o.slice(0,1).toUpperCase() + o.slice(1).toLowerCase())
    })
    return newTitle
}

const basePlugins = [
    vuePlugin(),
    json(), // 可以将 .json 文件转换为 ES6 模块
    babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**'
    }),
    
]
const devPlugins= []
const prodPlugins = []
const generalPlugins = (name) => {
    return [
        ...basePlugins,
        postcss({
            extract: true,
            // Or with custom file name
            // extract: path.resolve(`lib/${name}/RemoteLib-${name}.css`)
        })
    ]
}
const externals = ["vue"]
const getPackageConfig = (name) => {
    return {
        input: getEntry(name),
        output: [
            {
                file: `lib/${name}/RemoteLib-${name}.umd.js`,
                format: 'umd',
                name: `RemoteLib_${titleCase(name)}`,
                globals: {
                    'vue': 'Vue',
                    'element-plus': 'ElementPlus'
                },
                exports: "named",
            },

        ],
        plugins: [
            ...generalPlugins(name)
        ],
        external: [...externals]
    }
}
export default [
    getPackageConfig('hello'),
    getPackageConfig('button')
]