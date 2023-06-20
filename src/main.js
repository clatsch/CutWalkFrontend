/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import store from './store/store'

// Composables
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'dark'
  }
})

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)
app.use(store)

registerPlugins(app)


app.mount('#app')
