import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
  })
  app.vueApp.use(vuetify)
  app.hook('app:mounted', () => {
    console.log('Nuxt app is mounted and vuetify is ready')
  })
})
