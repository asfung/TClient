// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// defineNuxtConfig
export default {
  // title: 'Talker',
  app: {
    head: {
      title: "Talker",
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Bro is Yapping' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/images/TALKER_PART2_BLACK.png' }
      ]
    }
  },
  // plugins: [
  //   '~/plugins/screen.js',
  // ],
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  // title: 'Hello Nuxt',
  // theme: {
  //   dark: true,
  //   colors: {
  //     primary: '#ff0000'
  //   }
  // }
  router: {
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { top: 0 };
      }
    }
  },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
  ],
  colorMode: {
    classSuffix: '',
  },

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    config: {},
    viewer: true,
  },

  // css: ['~/assets/css/main.css'],

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  ssr: false,

  // css: ['~/assets/css/fonts.css'],

  // tailwind
  // postcss: {
  //   plugins: {
  //     tailwindcss: {},
  //     autoprefixer: {},
  //   },
  // },
  // treesa


  plugins: [
    // '~/plugins/vuetify.js',
    // '~/plugins/AppIcon.js',
  ]


}
