/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { VDataTable } from 'vuetify/labs/VDataTable'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
    VDataTable,
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      dark: {
        primary: '#1976D2',
        secondary: '#FFA726',
        accent: '#82B1FF',
        error: '#FF5252',
        // Add more theme colors or modify existing ones as needed
      },
    },
  },
});

// export default createVuetify({
//   theme: {
//     themes: {
//       light: {
//         colors: {
//           primary: '#1867C0',
//           secondary: '#5CBBF6',
//         },
//       },
//     },
//   },
// })
