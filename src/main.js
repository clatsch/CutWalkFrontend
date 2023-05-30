/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

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

registerPlugins(app)


app.mount('#app')
