import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import clash from './clash-api'


const app = createApp(App)
app.use(router)
app.mount('#app')

window.clash = clash
window.start?.call();
