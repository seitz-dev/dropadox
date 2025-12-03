import tailwindcss from "@tailwindcss/vite"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['shadcn-nuxt', '@nuxtjs/i18n', '@nuxt/test-utils/module'],
  shadcn: {
    prefix: '',
    componentDir: '@/components/ui'
  },
  i18n: {
    langDir: 'locales',
    locales: [
      {
        code: 'en', name: 'English', files: [
          'en/common.json', 
          'en/index.json', 
          'en/signIn.json', 
          'en/signUp.json', 
          'en/dashboard.json', 
          'en/settings.json',
          'en/view.json'
        ]
      }
    ],
    defaultLocale: 'en'
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [
      tailwindcss(),
    ]
  }
});
