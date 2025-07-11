import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')

// 发布库的设置
const lib = defineConfig({
  plugins: [vue()],
  // 使用vite打包(lib模式)
  build: {
    // outDir: 'lib',
    outDir: path.resolve(__dirname, 'examples/lib'),
    emptyOutDir: true,
    lib: {
      // entry: path.resolve(__dirname, 'packages/demo/main.js'),
      entry: path.resolve(__dirname, 'packages/el-demo/main.js'),
      name: 'RemoteLib',
      formats: ['cjs', 'es', 'iife', 'umd'],
      fileName: 'RemoteLib'
    },
    rollupOptions: {
      // 将包中不需要的依赖在此处声明
      external: ['vue', 'element-plus'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus'
        },
        // exports: 'named', // 默认会把对象放到 window.RemoteLib 下, named会到 window.RemoteLib.default 下
      }
    }
  }
})

// 开发模式/生产模式
const project = (url) => {
  return defineConfig({
    base: url,
    root: './examples', // 因为要在当前项目跑案例，所以将运行根目录设置为示例目录
    plugins: [
      vue(),
    ],
    build: {
      // rollupOptions: {
      //   // 将包中不需要的依赖在此处声明
      //   external: ['vue', 'element-plus'],
      //   output: {
      //     // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
      //     globals: {
      //       vue: 'Vue',
      //       'element-plus': 'ElementPlus'
      //     },
      //   }
      // }
    },
    // 服务端渲染
    server: {
      host: "0.0.0.0",
      port: 3000, // 端口号
      strictPort: false, // 设为 false 时，若端口已被占用则会尝试下一个可用端口,而不是直接退出
      open: true, // 在服务器启动时自动在浏览器中打开应用程序
      cors: true, // 为开发服务器配置 CORS。默认启用并允许任何源
    },
  })
}

// 用 loadEnv 读取模式，然后返回对应的 defineConfig
export default ({ mode }) => {
  const url = loadEnv(mode, process.cwd()).VITE_BASE_URL
  if (url === 'lib') {
    // 打包库文件
    return lib
  } else {
    // 开发模式/生产模式
    return project(url)
  }
}

