<template>
    <div class="content">
        <main class="main">
            <div class="contact">
                <h1>Julian Mollik</h1>
                <p>
                    <NuxtLink class="multiline"
                        to="https://www.google.ch/maps/search/saumackerstrasse+52+8048+Z%C3%BCrich+Switzerland/"
                        title="external link: Julian Mollik's address on Google Maps">
                        Saumackerstrasse 52<br>
                        8048 Zürich<br>
                        Switzerland
                    </NuxtLink>
                </p>
                <dl>
                    <dt>mobile phone (🇦🇹)</dt>
                    <dd>
                        <NuxtLink class="link2" to="tel:+43 650 5225202" title="call Julian Mollik">+43 650 5225202
                        </NuxtLink>
                    </dd>
                    <dt>mobile phone (🇨🇭)</dt>
                    <dd>
                        <NuxtLink class="link2" to="tel:+41 76 3888556" title="call Julian Mollik">+41 76
                            3888556</NuxtLink>
                    </dd>
                    <dt>email</dt>
                    <dd>
                        <NuxtLink class="link2" to="mailto:jule@creative-coding.net"
                            title="send email to Julian Mollik">jule@creative-coding.net</NuxtLink>
                    </dd>
                    <dt>Twitter</dt>
                    <dd>
                        <NuxtLink class="link2" to="https://twitter.com/jule2048"
                            title="external link: Twitter account of Julian Mollik">@jule2048</NuxtLink>
                    </dd>
                </dl>
            </div>
            <div class="techstack">
                <h1>made with <span class="love">♥️</span> and</h1>
                <ul>
                    <li v-for="(tech, index) in techSorted">
                        <NuxtLink :href="tech.url" :title="`external link: ${tech.title}`">{{ tech.text }}</NuxtLink>
                        <template v-if="(index === techSorted.length - 2)">&nbsp;&&nbsp;</template>
                        <template v-else-if="(index < techSorted.length - 1)">,&nbsp;</template>
                    </li>
                </ul>
            </div>
        </main>
    </div>
</template>

<script setup>
import { setHeadTitle } from '@/helpers/helpers'
const emit = defineEmits(['updateTitle'])
const pageId = 'contact'

useHead({
    title: setHeadTitle(pageId)
})

const techRaw = [
    {
        url: 'https://postcss.org/',
        title: 'A tool for transforming CSS with JavaScript',
        text: 'PostCSS'
    },
    {
        url: 'https://vuejs.org/',
        title: 'The Progressive JavaScript Framework',
        text: 'Vue.js'
    },
    {
        url: 'https://code.visualstudio.com/',
        title: 'Code editing. Redefined.',
        text: 'Visual Studio Code'
    },
    {
        url: 'https://developer.chrome.com/docs/devtools/',
        title: 'Chrome DevTools is a set of web developer tools built directly into the Google Chrome browser.',
        text: 'Chrome DevTools'
    },
    {
        url: 'https://de.wikipedia.org/wiki/Cascading_Style_Sheets',
        title: 'Cascading Style Sheets',
        text: 'CSS'
    },
    {
        url: 'https://nuxt.com/v3',
        title: 'The Intuitive Web Framework',
        text: 'Nuxt'
    },
    {
        url: 'https://github.com/',
        title: 'Where the world builds software',
        text: 'GitHub'
    },
    {
        url: 'https://en.wikipedia.org/wiki/HATEOAS',
        title: 'Hypermedia as the Engine of Application State',
        text: 'HATEOAS'
    },
    {
        url: 'https://github.com/DamianOsipiuk/vue-query',
        title: 'Hooks for fetching, caching and updating asynchronous data in Vue',
        text: 'vue-query'
    },
    {
        url: 'https://en.wikipedia.org/wiki/HTML',
        title: 'HyperText Markup Language',
        text: 'HTML'
    },
    {
        url: 'https://en.wikipedia.org/wiki/Scalable_Vector_Graphics',
        title: 'Scalable Vector Graphics',
        text: 'SVG'
    },
    {
        url: 'https://boxy-svg.com/',
        title: 'Scalable Vector Graphics Editor',
        text: 'BOXY SVG Editor'
    },
    {
        url: 'https://stackoverflow.com/',
        title: 'Where Developers Learn, Share, & Build Careers',
        text: 'Stackoverflow'
    },
    {
        url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties',
        title: 'Using CSS custom properties (variables)',
        text: 'CSS variables'
    },
]

const techSorted = computed(() => {
    return techRaw.sort((a, b) => (a.text > b.text) ? 1 : ((b.text > a.text) ? -1 : 0))
})

onMounted(() => {
    emit('updateTitle', pageId)
})
</script>
<style lang="postcss" scoped>
.contact,
.techstack {
    width: 240px;
    margin: 100px auto 0px auto;
}

.contact {
    h1 {
        margin-bottom: 10px;
    }

    dl {
        display: flex;
        flex-flow: row wrap;
        line-height: 14px;

        dt {
            width: 110px;
        }

        dd {
            text-align: right;
            flex-grow: 1;
            margin: 0;
        }
    }
}

.techstack {
    margin-top: 50px;

    h1 {
        margin-bottom: 7px;
    }

    .love {
        color: var(--extra-accent-color);
        font-size: 200%;
        vertical-align: sub;
    }

    ul {
        display: flex;
        flex-wrap: wrap;
    }
}
</style>