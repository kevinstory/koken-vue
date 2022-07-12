import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './index.css'
import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const app = createApp(App)

const pinia = createPinia();
app.use(router)
pinia.use(piniaPluginPersistedstate)
app.use(pinia)


app.mount('#app')
