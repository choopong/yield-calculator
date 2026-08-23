// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@vite-pwa/nuxt'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Yield Calculator',
      meta: [{ name: 'theme-color', content: '#121212' }],
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
        { rel: 'icon', href: '/logo.svg', sizes: 'any', type: 'image/svg+xml' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon-180x180.png' }
      ]
    }
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Yield Calculator',
      short_name: 'Yield Calc',
      description: 'Calculate yield per year in percentage based on price, cost, and income per month.',
      theme_color: '#121212',
      background_color: '#121212',
      display: 'standalone',
      orientation: 'portrait',
      start_url: '.',
      scope: '.',
      id: '.',
      icons: [
        { src: 'pwa-64x64.png', sizes: '64x64', type: 'image/png' },
        { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
        { src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
      ]
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff,woff2}']
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      type: 'module'
    }
  }
})
