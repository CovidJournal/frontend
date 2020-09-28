import dotenv from 'dotenv'

// Prepare env variables
dotenv.config()

console.log('API_URL:', process.env.API_URL)

export default {
  target: 'server',
  dev: process.env.NODE_ENV !== 'production',
  /*
   ** Headers of the page
   */
  server: {
    host: process.env.HOST,
    port: 4000,
  },
  publicRuntimeConfig: {
    frontUrl: process.env.FRONT_URL,
    apiUrl: process.env.API_URL,
  },
  head: {
    titleTemplate: '%s - Covid-Journal',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          "Enregistrez votre passage et soyez notifié d'un contact potentiel avec une personne infectée.",
      },
      { hid: 'og:type', name: 'og:type', content: 'website' },
      {
        hid: 'og:title',
        name: 'og:title',
        content: 'Bienvenue sur Covid-Journal !',
      },
      { hid: 'og:site_name', name: 'og:site_name', content: 'Covid-Journal' },
      {
        hid: 'og:description',
        name: 'og:description',
        content:
          "Enregistrez votre passage et soyez notifié d'un contact potentiel avec une personne infectée.",
      },
      { name: 'msapplication-TileColor', content: '#5299d3' },
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
  css: ['@/assets/css/main.scss'],
  styleResources: {
    scss: ['@/assets/css/_variables.scss'],
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~plugins/formatters',
    '~plugins/qrcode',
    { src: '~plugins/vcalendar', mode: 'client' },
    '~plugins/vue2picker',
    '~plugins/i18n',
    { src: '~plugins/qrcodereader', mode: 'client' },
    { src: '~/plugins/axios', mode: 'client' },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/style-resources',
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
        defaultLocale: 'fr',
        baseUrl: process.env.FRONT_URL,
        vueI18nLoader: true,
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'i18n_redirected',
          alwaysRedirect: true,
        },
      },
    ],
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
  ],
  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false,
    icons: true,
  },
  sitemap: {
    hostname: process.env.FRONT_URL,
    i18n: true,
    exclude: ['/validate-session', '/user/**', '/organization/**'],
  },
  robots: {
    UserAgent: '*',
    Disallow: ['/validate-session', '/user', '/organization'],
    Sitemap: '/sitemap.xml',
  },
  /*
   ** Build configuration
   */
  build: {
    extractCSS: process.env.NODE_ENV === 'production',
    cache: process.env.NODE_ENV === 'production',
  },
}
