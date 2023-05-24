<template>
    <div class="content">
        <main class="main">
            <div class="history">
                <dl>
                    <template v-for="entry in history">
                        <dt>
                            <h1>{{ entry.title }}</h1>
                            [&nbsp;<NuxtLink :href="entry.url"
                                :title="`external link: GitHub, creative-coding.net version ${entry.version}`">v{{
                                    entry.version
                                }}</NuxtLink>&nbsp;]
                        </dt>
                        <dd v-html="`${parseInline(entry.text)}`"></dd>
                    </template>
                </dl>
            </div>
        </main>
    </div>
</template>

<script setup>
import { parseInline } from 'marked'

const emit = defineEmits(['updatePageId'])
const pageId = 'version'

const gitHubBaseReleaseUrl = 'https://github.com/jule256/creative-coding.net/releases/tag/v'

const historyRaw = [
    {
        version: '1.0.0',
        title: 'initial release',
        text: 'migration from the old [PHP based version](https://v1.creative-coding.net/ \"archived version of this website, as of 2022\") to [Nuxt 3](https://nuxt.com/v3)'
    },
    {
        version: '1.1.0',
        title: 'mobile viewport',
        text: 'adds support for mobile devices with less than 700px viewport-width'
    },
    {
        version: '1.1.1',
        title: 'dependency updates',
        text: 'updates various dependencies'
    }
]

const history = computed(() => {
    return historyRaw.map(entry => ({ ...entry, url: `${gitHubBaseReleaseUrl}${entry.version}` }))
})

onMounted(() => {
    emit('updatePageId', pageId)
})
</script>
<style lang="postcss" scoped>
.history {
    width: 70%;
    margin: 100px auto 0 auto;

    dt {
        display: flex;

        h1 {
            margin-right: 6px;
        }
    }

    dd {
        margin-bottom: 20px;
    }
}
</style>