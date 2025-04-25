import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      themes: {
        light: {
          colors: {
            primary: '#7985E6',
            drawerPrimary: '#545FDE',
            // neutral: '#F3F4F6',
          },
        },
        dark: {
          colors: {
            primary: '#323AAF',
            drawerPrimary: '#545FDE',
            // neutral: '#1A1A1A',
          },
        },
      },
    },
    defaults: {
      global: {
        style: {
          // fontFamily: `'IA Writer Quattro S', sans-serif`
        }
      }
    }
  })
  app.vueApp.use(vuetify)
  app.hook('app:mounted', () => {
    console.log('Vuetify PLugin ✅')
  })
})
