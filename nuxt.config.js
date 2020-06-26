import dotenv from 'dotenv'

// Prepare env variables
dotenv.config()

console.log('API_URL:', process.env.API_URL)
console.log('CSP:', process.env.CSP)
const PRIMARY_HOSTS = `api.covid-journal.org`

export default {
  mode: 'universal',
  dev: process.env.NODE_ENV !== 'production',
  /*
   ** Headers of the page
   */
  server: {
    host: process.env.HOST,
    port: 4000,
  },
  telemetry: false,
  head: {
    title: 'Covid Journal',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/png', href: '/icon.png' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~plugins/formatters',
    '~plugins/qrcode',
    { src: '~plugins/qrcodereader', mode: 'client' },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    [
      'nuxt-i18n',
      {
        locales: [
          {
            name: 'English',
            code: 'en',
            iso: 'en-EN',
            file: 'en-EN.js',
          },
          {
            name: 'Français',
            code: 'fr',
            iso: 'fr-FR',
            file: 'fr-FR.js',
          },
        ],
        strategy: 'prefix_and_default',
        defaultLocale: 'fr',
        vueI18nLoader: true,
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'i18n_redirected',
          alwaysRedirect: true,
        },
      },
    ],
    [
      'nuxt-env',
      {
        keys: ['FRONT_URL', 'API_URL'],
      },
    ],
  ],
  axios: {
    baseURL: process.env.API_URL || 'http://localhost:3000',
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(_config, _ctx) {},
  },
  render: {
    csp: {
      reportOnly: true,
      hashAlgorithm: 'sha256',
      policies: {
        'default-src': ["'self'"],
        'img-src': ['https:'],
        'worker-src': ["'self'", `blob:`, PRIMARY_HOSTS],
        'style-src': ["'self'", PRIMARY_HOSTS],
        'script-src': ["'self'", PRIMARY_HOSTS],
        'form-action': ["'self'"],
        'frame-ancestors': ["'none'"],
        'object-src': ["'none'"],
      },
    },
  },
}
