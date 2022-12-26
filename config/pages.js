// title.head       is for the title tag in the HTML's head tag
// title.header     is for the area above the navigation
// title.navigation is for the entries in the navigation section below the head
export const PAGES = [
    {
        id: 'home',
        title: {
            header: {
                en: 'home'
            },
            head: {
                en: 'home'
            },
            navigation: {
                en: 'home'
            },
        },
        to: '/home',
        mainNavigation: true
    },
    {
        id: 'work',
        title: {
            header: {
                en: 'work'
            },
            head: {
                en: 'work'
            },
            navigation: {
                en: 'work'
            },
        },
        to: '/work',
        mainNavigation: true
    },
    {
        id: 'cv',
        title: {
            header: {
                en: 'curriculum vitae'
            },
            head: {
                en: 'curriculum vitae'
            },
            navigation: {
                en: 'cv'
            },
        },
        to: '/cv',
        mainNavigation: true
    },
    {
        id: 'contact',
        title: {
            header: {
                en: 'contact'
            },
            head: {
                en: 'contact'
            },
            navigation: {
                en: 'contact'
            },
        },
        to: '/contact',
        mainNavigation: true
    },
    {
        id: 'sitemap',
        title: {
            header: {
                en: 'sitemap'
            },
            head: {
                en: 'sitemap'
            },
            navigation: {
                en: 'contact'
            },
        },
        to: '/sitemap',
        mainNavigation: false
    }
]