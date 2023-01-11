import pkg from './package.json'

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
            htmlAttrs: {
                lang: 'en'
            },
            title: "Julian Mollik",
            meta: [
                { charset: "utf-8" },
                { name: "viewport", content: "width=device-width, initial-scale=1" },
                {
                    hid: "description",
                    name: "description",
                    content: "Website of Julian Mollik MSc; software engineer & alumnus of the University of Applied Siences in Hagenberg/Austria (master's program Digital Media)"
                },
                {
                    hid: "author",
                    name: "author",
                    content: "Julian Mollik"
                },
                {
                    hid: "copyright",
                    name: "copyright",
                    content: "Julian Mollik"
                },
                {
                    hid: "keywords",
                    name: "keywords",
                    content: "Julian, Mollik, Hagenberg, Zürich, Digital, Media, internet, coding, code, programming, frontend, HTML, CSS, Javascript, Vue, devops, engineer"
                },
                {
                    hid: "robots",
                    name: "robots",
                    content: "index,follow"
                },
                {
                    hid: "generator",
                    name: "generator",
                    content: "Microsoft VSCode, JetBrains WebStorm, Sublime Text"
                },
                {
                    hid: "theme-color",
                    name: "theme-color",
                    content: "#C61919"
                },
                {
                    hid: "date",
                    name: "date",
                    content: "2023-01-01T20:23:01+01:00"
                }
            ]
        },
    },
    runtimeConfig: {
        public: {
            HATEOAS_INDEX: process.env.HATEOAS_INDEX || "https://un.de.fin.edx/x",
            IDS_ENDPOINT: process.env.IDS_ENDPOINT || "https://un.de.fin.ed/",
            VERSION: pkg.version || "0.0.0",
            IS_UNIT_TEST: process.env.IS_UNIT_TEST || false,
        }
    },
    hooks: {
        // get all possible paths from the API in order to be able to add static routes during build-time
        async 'nitro:config'(nitroConfig) {
            if (nitroConfig.dev) { return }
            if (nitroConfig.runtimeConfig?.public.IS_UNIT_TEST) { return }

            const response = await fetch(nitroConfig.runtimeConfig?.public.IDS_ENDPOINT)
            let json = {}
            if (response.ok) {
                json = await response.json()
            } else {
                console.error(`response not ok:`, response)
            }

            if (nitroConfig && nitroConfig.prerender && nitroConfig.prerender.routes) {
                nitroConfig.prerender.routes.push(...json.paths)
            }
        }
    }
})

