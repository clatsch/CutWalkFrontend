

// Components
import App from './App.vue'
import store from './store/store'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)
app.use(store)

registerPlugins(app)


app.mount('#app')
