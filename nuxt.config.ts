import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    css: [
        '@/assets/style/reset.css',
        '@/assets/style/variables.css',
        '@/assets/style/global.css'
    ],
    build: {
        postcss: {
            postcssOptions: require('./postcss.config.js'),
        },
    }
})

