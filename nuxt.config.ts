// import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
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

