export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'rsms-frontend',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/DepotService.js',
    '~/plugins/RoleService.js',
    '~/plugins/PermissionService.js',
    '~/plugins/UserService.js',
    '~/plugins/PassengerInteriorTypeService.js',
    '~/plugins/PassengerWagonTypeService.js',
    '~/plugins/FreightWagonTypeService.js',
    '~/plugins/StatusService.js',
    '~/plugins/RepairTypeService.js',
    '~/plugins/OwnerService.js',
    '~/plugins/RepairWorkshopService.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],

  bootstrapVue: {
    icons: true,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    credentials: true,
    mode: 'server',
    baseURL: `${process.env.API_ROOT}/api`,
    prefix: `${process.env.API_ROOT}/api`,
    proxy: true,
  },
  proxy: {
    '/laravel': {
      target: `${process.env.API_ROOT}`,
      pathRewrite: { '^/laravel': '/' },
    },
  },

  // Auth module config
  auth: {
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/',
    },
    strategies: {
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: `${process.env.API_ROOT}/api`,
        endpoints: {
          login: { url: '/login', method: 'post' },
          logout: { url: '/logout', method: 'post' },
          user: { url: '/auth-user', method: 'get' },
        },
      },
    },
    plugins: ['~/plugins/UserRolePermissionPlugin'],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
