import colors from 'vuetify/lib/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: 'Bravesoft',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vuelidate.js', mode: 'client' },
    '~/plugins/axios'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,
  loading: false,
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/eslint-module'
    // '@nuxtjs/stylelint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', '@nuxtjs/auth-next', '@nuxtjs/i18n'],

  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-EN',
        name: 'English',
        file: 'en.json'
      },
      {
        code: 'ja',
        iso: 'ja-JP',
        name: 'Japanese',
        file: 'ja.json'
      }
    ],
    lazy: true,
    langDir: 'locales/',
    defaultLocale: 'ja',
    strategy: 'no_prefix',

    vueI18n: {
      fallbackLocale: 'en'
      // messages: {
      //   en: require('./locales/en.json'),
      //   ja: require('./locales/ja.json'),
      // }
    },
    // Netlify will do the language detection
    detectBrowserLanguage: false
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/scss/variables.scss'],
    treeShake: true,
    // options: {
    //   customProperties: true
    // },
    theme: {
      light: true,
      themes: {
        light: {
          // primary: colors.blue.darken2,
          primary: colors.red.darken4,
          accent: colors.red.accent1,
          secondary: '#3c3c3c',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  env: {
    baseUrl: process.env.BASE_URL
  },
  auth: {
    // Options
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/',
      home: '/home'
    },
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: 'user'
          // autoFetch: true
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/auth/user', method: 'get' }
        }
      }
    }
  },

  router: {
    middleware: ['authenticated']
  },
  dev: process.env.NODE_ENV !== 'production'
  // publicRuntimeConfig: {
  //   recaptcha: {
  //     /* reCAPTCHA options */
  //     siteKey: process.env.RECAPTCHA_SITE_KEY, // for example
  //     size: 'invisible',
  //     hideBadge: false,
  //     version: 2,
  //   },
  // },
}
