// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: '/web-tools/',
    head: {
      title: "kyoruni | web-tools",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/web-tools/favicon.png" },
      ],
    }
  },
  devtools: { enabled: true },
  devServer: {
    port: 7777
  },
  modules: [
    '@nuxtjs/tailwindcss'
  ],
})
