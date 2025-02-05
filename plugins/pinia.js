import { createPinia } from 'pinia'

export default defineNuxtPlugin((app) => {
    const pinia = createPinia()
    app.vueApp.use(pinia)
    // app.provide('pinia', pinia);
})
