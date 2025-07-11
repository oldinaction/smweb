<template>
  <div>
    <component :is="module" v-bind="$attrs"></component>
  </div>
</template>

<script>
import { markRaw, ref, defineComponent, watch, toRef } from "vue";

export default defineComponent({
  name: "RemoteComponent",
  inheritAttrs: false, // 关闭组件的根元素继承特性
  props: {
    componentInfo: {
      type: Object,
      default() {
        return {
          jsUrl: '',
          cssUrl: '',
          libName: '',
          componentName: ''
        }
      }
    },
  },
  setup(props, { emit }) {
    let libCache = ref({});
    let lib = ref(null);
    let module = ref(null);

    const componentInfoRef = toRef(props, 'componentInfo');

    watch(() => componentInfoRef.value.jsUrl, (n, o) => {
      if (n && !libCache.value[n]) init()
    }, { immediate:true })

    watch(() => componentInfoRef.value.componentName, (n, o) => {
      if (n && lib.value) {
        setModule(componentInfoRef.value.jsUrl)
      }
    }, { immediate:true })

    function init() {
      loadStyles(componentInfoRef.value.cssUrl);
      loadScript(componentInfoRef.value.jsUrl, componentInfoRef.value.componentName);
    }

    async function loadStyles(url) {
      let link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = url;
      let head = document.getElementsByTagName("head")[0];
      head.appendChild(link);
    }

    async function loadScript(url, componentName) {
      // await asyncAjax(url);
      await asyncScript(url);
      setModule(url)
    }

    /**
     * 使用动态 script 方式加载远程js
     */
    function asyncScript(url) {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        const target =
          document.getElementsByTagName("script")[0] || document.head;
        script.type = "text/javascript";
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        target.parentNode.insertBefore(script, target);
      });
    }

    /**
     * 使用动态 ajax 方式加载远程js
     */
    function asyncAjax(url) {
      fetch(url).then((res) => {
        if (res.status === 200) {
          res.text().then((code) => {
            // window.eval(code)
            new Function(`${code}`)();
            setModule(url)
          });
        }
      });
    }

    function setModule(url) {
      lib.value = libCache.value[url];
      if (!lib.value) {
        lib.value = window[componentInfoRef.value.libName];
        libCache.value[url] = lib.value;
      }
      const component = lib.value[componentInfoRef.value.componentName];
      module.value = markRaw(component);
    }

    return {
      module,
    };
  }
});
</script>