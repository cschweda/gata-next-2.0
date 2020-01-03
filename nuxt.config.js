const pkg = require('./package')
const routes = require('./routes')
const config = require('./config.json')

console.log(process.env.NODE_ENV)

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    titleTemplate: '%s',

    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    script: [
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.26.0/polyfill.min.js'
      },
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/event-source-polyfill/0.0.9/eventsource.min.js'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700, 900|Material+Icons'
      },

      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.8.1/css/all.css'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['@/assets/css/github-markdown.css', '@/assets/css/app.css'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/vuetify', '@/plugins/filters'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  generate: {
    routes
  },

  buildModules: [
    [
      '@nuxtjs/vuetify',
      { treeShake: true },
      '@nuxtjs/google-analytics',
      {
        id: 'UA-150082887-4'
        // debug: {
        //   enabled: false,
        //   sendHitTask: true
        // }
      }
    ]
  ],
  // features: { transitions: false },

  router: {
    base: process.env.NODE_ENV === 'development' ? '' : `/${config.base}/`
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */

    extend(config, ctx) {
      // Run ESLint on save

      if (ctx.isDev && ctx.isClient) {
        // config.module.rules.push({
        //   enforce: 'pre',
        //   test: /\.(js|vue)$/,
        //   loader: 'eslint-loader',
        //   exclude: /(node_modules)/
        // })
      }
    }
  }
}
