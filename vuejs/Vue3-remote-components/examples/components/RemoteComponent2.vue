<template>
  <div>
    <component :is="module" v-bind="$attrs"></component>
    <remote-css :href="componentInfo.cssUrl"></remote-css>
  </div>
</template>

<script>
import {markRaw, h, ref, defineComponent, toRef, watch} from "vue";

export default defineComponent({
  name: "RemoteComponent2",
  inheritAttrs: false,
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
  components: {
    'remote-css': {
      render() {
        return h('link', {
          rel: "stylesheet",
          type: 'text/css',
          href: this.href
        });
      },
      props: {
        href: { type: String, required: true },
      },
    },
  },
  setup(props, { emit }) {
    let lib = ref(null);
    let module = ref(null);

    const componentInfoRef = toRef(props.componentInfo);

    watch(() => props.componentInfo.jsUrl, (n, o) => {
      if (n) systemJsLoad(componentInfoRef.value.jsUrl);
    }, { immediate:true })

    watch(() => props.componentInfo.componentName, (n, o) => {
      if (n && lib.value) {
        module.value = markRaw(lib.value[n]);
      }
    }, { immediate:true })

    /**
     * 使用system.js加载远程js
     */
    function systemJsLoad(url) {
      window.System.import(url).then((mod) => {
        console.log(mod);
        lib.value = mod;
        module.value = markRaw(mod[componentInfoRef.value.componentName]);
      });
    }

    return {
      module,
    };
  },
});
</script>