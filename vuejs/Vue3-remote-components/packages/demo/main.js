import RemoteHello from './Hello/index.vue';
import RemoteButton from './Button/index.vue';
import { version } from "../../package.json";

const components = [
  RemoteHello,
  RemoteButton
];

const install = (app)=> {
  components.map((component) => {
    app.component(component.name, component);
  })
}

export default {
  install, // 全量引入
  version,
  RemoteHello,
  RemoteButton
}