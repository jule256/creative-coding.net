<template>
    <div class="content">
        <main class="main">
            <template v-for="entry in entries">
                <section :class="entry.id">
                    <h1>
                        <NuxtLink :to="entry.to" class="entry">{{ entry.title['en'] }}</NuxtLink>
                    </h1>
                    <Component :is="entry.component" />
                </section>
            </template>
        </main>
    </div>
</template>

<script setup>
import { SitemapHome, SitemapWork, SitemapCv, SitemapContact } from '#components'
import { SECTIONS } from '../config/sections.js'
const emit = defineEmits(['updateTitle'])

const getComponent = id => {
    switch (id) {
        case 'home':
            return SitemapHome
        case 'work':
            return SitemapWork
        case 'cv':
            return SitemapCv
        case 'contact':
            return SitemapContact
    }
}

const entries = computed(() => {
    const result = SECTIONS.map(section => {
        return {
            ...section,
            component: getComponent(section.id) // resolveComponent(`SitemapHome`)
        }
    })
    return result
})

onMounted(() => {
    emit('updateTitle', 'sitemap')
})
</script>
<style lang="postcss" scoped>
.main {
    display: grid;
    grid-template-columns: calc(50% - 10px) calc(50% - 10px);
    grid-template-rows: minmax(min-content, max-content);
    gap: 30px 20px;
    grid-template-areas:
        "home work"
        "cv contact";
}

.work {
    grid-area: work;
    /* @todo ➔ temporary (🤔) hack to prevent jumping of content after load-complete */
    min-height: 205px;
}

.home {
    grid-area: home;
}

.cv {
    grid-area: cv;
}

.contact {
    grid-area: contact;
}

h1 {
    margin-bottom: 10px;
}
</style>