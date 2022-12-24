import Pages from './lang/pages/index';
import Locales from './constants/locales';

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s | Colors',
    title: 'COLORS',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/rgb.png' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/style.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~/plugins/i18n.js' }, { src: '~/plugins/utils.js' }, { src: '~/plugins/api.js' }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/i18n', '@nuxtjs/proxy', '@nuxtjs/auth-next', '@nuxtjs/axios', '@nuxtjs/pwa'],
  proxy: {
    '/api': 'https://sys-dev.searchandstay.com'
  },
  auth: {
    strategies: {
      local: {
        token: {
          property: 'access_token',
          global: true
        },
        user: {
          property: false
        },
        endpoints: {
          login: { url: '/api/admin/login_json', method: 'post' },
          logout: false,
          user: false
        }
      }
    },
    redirect: false
    /* redirect: {
      login: '/login',
      logout: '/',
      callback: 'login',
      home: '/'
    } */
  },
  router: {
    middleware: ['auth'],
    trailingSlash: true
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // proxy: true, // Can be also an object with default options,
    baseURL: 'https://sys-dev.searchandstay.com' || '/'
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'es'
    }
  },

  i18n: {
    lazy: true,
    vueI18nLoader: true,
    parsePages: false,
    langDir: 'lang/',
    locales: Locales,
    defaultLocale: 'pt',
    strategy: 'prefix',
    detectBrowserLanguage: false,
    baseUrl: 'https://www.colors.com',
    pages: Pages
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    optionsPath: '~/plugins/vuetify.options.js'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      sass: {
        implementation: require('sass')
      },
      scss: {
        implementation: require('sass')
      }
    }
  },
  // Progress Bar and Initial loading

  loading: {
    color: 'blue',
    height: '5px'
  },

  loadingIndicator: {
    name: 'fading-circle',
    color: '#2196F3',
    background: 'white'
  }
};
