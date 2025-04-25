// https://nuxt.com/docs/api/configuration/nuxt-config
import { build } from 'vite';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// defineNuxtConfig
export default defineNuxtConfig({
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
  appConfig: {
    storagelUrl: process.env.STORAGE_URL,
  },
  runtimeConfig: {
    TALKER_API: process.env.TALKER_API,
    public: {
      storagelUrl: process.env.STORAGE_URL,
      baseUrl: process.env.TALKER_API,
      pusherId: process.env.PUSHER_APP_ID,
      pusherKey: process.env.PUSHER_APP_KEY,
      pusherSecret: process.env.PUSHER_APP_SECRET,
      pusherCluster: process.env.PUSHER_APP_CLUSTER,
      encryptionKey: process.env.ENCRYPTION_KEY,
      encryptionIv: process.env.ENCRYPTION_IV,
    }
  },
  hooks: {
    'pages:extend' (pages) {
      function setMiddleware (pages) {
        for (const page of pages) {
          if (page.path.startsWith('/dashboard')) {
            page.meta ||= {}
            page.meta.middleware = ['dashboard-middleware'];
          }
          if (page.children) {
            setMiddleware(page.children);
          }
        }
      }
      setMiddleware(pages);
    }
  },

  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  router: {
    // scrollBehavior(to, from, savedPosition) {
    //   if (savedPosition) {
    //     return savedPosition;
    //   } else {
    //     // return savedPosition;
    //     // return { top: 0 };
    //     const position = {};
    //     if (to.hash) {
    //       position.selector = to.hash;
    //     }
    //     if (to.matched.some((m) => m.meta.scrollToTop)) {
    //       position.x = 0;
    //       position.y = 0;
    //     }
    //     return position;
    //   }
    // }
  },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    [(_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true, treeShake: true }))
      })
    }],
  ],
  colorMode: {
    classSuffix: '',
    preference: 'dark'
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
    // '~/plugins/pinia.js',
  ]


})
