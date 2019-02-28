module.exports = {
  head: {
    title: 'Batch converter',
    htmlAttrs: {
      lang: 'en-US',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  },
  css: [
    'normalize-scss',
    '@/assets/style/base.scss'
  ],
  resolve: {
    alias: {
      style: 'assets/style'
    }
  },
  loading: { color: '#FF4626' },
  generate: {
    fallback: true,
    routes: [
      '/'
    ]
  },
  build: {
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (ctx.isServer) {
        config.externals = [
          require('webpack-node-externals')({
            whitelist: [/^vue-slick/]
          })
        ]
      }
    }
  }
}
