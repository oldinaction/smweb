import RemoteButton from './index.vue'

const install = (app) => {
    app.component(RemoteButton.name, RemoteButton)
}

export default {
    install,
    RemoteButton
}