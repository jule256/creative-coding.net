<template>
    <div class="content">
        <main class="main">
            <template v-for="page in mainNavigationPages">
                <section :class="page.id">
                    <h1>
                        <!-- @todo ➔ check if class .entry exists and if it needs to be refactored to .page -->
                        <NuxtLink :to="page.to" class="entry">{{ page.title.header['en'] }}
                        </NuxtLink>
                    </h1>
                    <Component :is="page.component" />
                </section>
            </template>
        </main>
    </div>
</template>

<script setup>
import { PAGES } from '@/config/pages'
import { SitemapHome, SitemapWork, SitemapCv, SitemapContact } from '#components'
const emit = defineEmits(['updatePageId'])
const pageId = 'sitemap'

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

const mainNavigationPages = computed(() => {
    const result = PAGES
        .filter(page => page.mainNavigation)
        .map(page => {
            return {
                ...page,
                component: getComponent(page.id)
            }
        })
    return result
})

onMounted(() => {
    emit('updatePageId', pageId)
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