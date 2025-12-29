const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 3000
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/assets/styles/style.scss";',
        implementation: require('sass')
      },
    },
  },
})
