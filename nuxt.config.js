import Pages from './lang/pages/index'
import Locales from './constants/locales'
//import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s | Crypto Lottery',
    title: 'ATOMIK',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon.png' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/style.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/i18n.js' },
    { src: '~/plugins/utils.js' },
    { src: '~/plugins/api.js' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/proxy',
    '@nuxtjs/auth-next',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],
  proxy: {
    '/api': 'https://atomikbtc.herokuapp.com',
  },
  auth: {
    plugins: ['~/plugins/auth.js'],
    strategies: {
      local: {
        token: {
          property: 'accessToken',
        },
        user: {
          property: false,
          autoFetch: false,
        },
        endpoints: {
          login: {
            url: '/api/v1/auth/signin/',
            method: 'post',
          },
          /* refresh: {
            url: '/api/v1/auth/refreshtoken/',
            method: 'post',
          }, */
          logout: {
            url: '/api/v1/auth/logout/',
            method: 'post',
          },
          user: {
            url: '/api/v1/user/',
            method: 'get',
          },
        },
      },
    },
    localStorage: false,
    cookie: true,
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/index',
    },
  },
  router: {
    middleware: ['auth'],
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    proxy: true, // Can be also an object with default options
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'es',
    },
  },
  /*
  moment: {
    defaultLocale: 'es',
    locales: ['es', 'de', 'en-in', 'fr', 'ru'],
  },
  */

  i18n: {
    lazy: true,
    vueI18nLoader: true,
    parsePages: false,
    langDir: 'lang/',
    locales: Locales,
    defaultLocale: 'es',
    strategy: 'prefix',
    detectBrowserLanguage: false,
    baseUrl: 'https://www.syp.com',
    pages: Pages,
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    optionsPath: '~/plugins/vuetify.options.js',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      sass: {
        implementation: require('sass'),
      },
      scss: {
        implementation: require('sass'),
      },
    },
  },
  // Progress Bar and Initial loading

  loading: {
    color: 'blue',
    height: '5px',
  },

  loadingIndicator: {
    name: 'fading-circle',
    color: '#48adf0',
    background: 'white',
  },
}
