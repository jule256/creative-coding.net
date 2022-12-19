// import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
    ssr: false,
    css: [
        '@/assets/style/reset.css',
        '@/assets/style/variables.css',
        '@/assets/style/global.css',
    ],
    postcss: {
        plugins: {
            'postcss-nested': {},
        }
    }
})

