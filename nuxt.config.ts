// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Yield Calculator'
    }
  },
  features: {
    inlineStyles: true // Inlines all global and component CSS into the HTML head
  }
})
