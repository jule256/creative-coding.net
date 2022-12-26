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
    },
    app: {
        head: {
            title: "Julian Mollik",
            meta: [
                { charset: "utf-8" },
                { name: "viewport", content: "width=device-width, initial-scale=1" },
                {
                    hid: "description",
                    name: "description",
                    content: "description content"
                }
            ],
            link: [
                { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
            ]
        },
    }
})

