基于 Vue3 + Vite + element-plus 实现远程组件动态加载

## 运行

```bash
npm run i
npm run dev
```

## 远程打包方式

- 远程组件打包成UMD, 主应用中通过script标签加载: 参考此案例 RemoteComponent.vue
- 远程组件打包成UMD, 主应用中通过system.js加载(还存在问题): 参考此案例 RemoteComponent2.vue
- 基于 vue3-sfc-loader 库动态加载 vue 源码文件(无需打包): 参考 https://www.cnblogs.com/heavenYJJ/p/18346051
- 基于 vite 打包库: https://cloud.tencent.com/developer/article/1908336
