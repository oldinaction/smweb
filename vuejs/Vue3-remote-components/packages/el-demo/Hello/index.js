import RemoteHello from './index.vue'

const install = (app) => {
    app.component(RemoteHello.name, RemoteHello)
}

export default{
    install,
    RemoteHello
}