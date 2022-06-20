<template>
    <div class="content">
        <main class="main">
            <div class="intro">
                <div class="text">
                    <p>
                        Welcome to my website. My Name is Julian Mollik, I am {{ age }} years old and I live in Zürich,
                        Switzerland.
                    </p>
                    <p>
                        In July 2006 I graduated from the University of Applied Sciences in Hagenberg, Upper Austria, in
                        <NuxtLink href="http://dm.fh-hagenberg.at/"
                            title="external link: website Digital Media (german)">Digital Media</NuxtLink> with the
                        special
                        field "Interactive Media". More details on my master's thesis "Automatic Location of
                        Text-Elements in Visual Media" can be found on the <NuxtLink
                            href="http://thesis.creative-coding.net/"
                            title="external link: website thesis Julian Mollik (german)">project's website</NuxtLink>.
                    </p>
                    <p>
                        I am also the administrator of the website of <NuxtLink href="http://claudia.klucaric.eu/"
                            title="external Website: Claudia Klučarić">Claudia Klučarić</NuxtLink> which I developed in
                        summer
                        2009.
                    </p>
                    <p>
                        Since September 2016 I work as a software engineer for the <NuxtLink
                            href="http://www.sanitas.com/" title="external website: Sanitas Health Insurance Website">
                            Sanitas Health Insurance</NuxtLink> in
                        Zürich, Switzerland.
                    </p>
                </div>
                <div class="picture">
                    <img class="framed" src="/picture/julian.mollik.jpg" data-width="90" data-height="133">
                </div>
            </div>
            <div class="news">
                <NewsEntry v-for="(newsEntry, index) in newsList" :data="newsEntry" @status-change="handleStatusChange"
                    @update-height="handleHeightUpdate" />
            </div>
        </main>
        <Sidebar class="sidebar" name="home">
            <SidebarEntry v-for="(newsEntry, index) in newsList" :headline="newsEntry.headline" :id="newsEntry.id"
                @go-to="handleGoTo" @mouse-enter="enableHighlight" @mouse-leave="disableHighlight" />
        </Sidebar>
    </div>
</template>

<script setup>
import { news as newsListRaw } from '../api/news.js'
import { DEFAULT_NEWS_STORY_HEIGHT, OPEN_NEWS_STORIES_BY_DEFAULT } from '../config/config.js'

const newsList = ref([])

const emit = defineEmits(['updateTitle'])

onMounted(() => {
    emit('updateTitle', 'home')

    newsList.value = newsListRaw.reverse().map((newsListEntry, index) => {
        newsListEntry.isHighlighted = false
        newsListEntry.isExpanded = index < OPEN_NEWS_STORIES_BY_DEFAULT
        newsListEntry.height = DEFAULT_NEWS_STORY_HEIGHT
        return newsListEntry
    })
})

const age = computed(() => {
    const today = new Date();
    const birthDate = new Date('1981/02/13');
    const m = today.getMonth() - birthDate.getMonth();
    let age = today.getFullYear() - birthDate.getFullYear();
    return (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) ? age - 1 : age;
})

const isElementInViewport = (el, expandedHeight) => {
    const lowerEnd = el.offsetTop + el.offsetHeight + expandedHeight
    return lowerEnd < window.scrollY + window.innerHeight && lowerEnd > window.scrollY
}

const handleGoTo = id => {
    const target = document.querySelector(`#news-entry-${id}`);
    const index = newsList.value.findIndex(newsListEntry => newsListEntry.id === id)

    if (isElementInViewport(target, newsList.value[index].height)) {
        target.scrollIntoView({ behavior: "smooth" })
        newsList.value[index].isExpanded = true
    } else {
        if (newsList.value[index].isExpanded) {
            target.scrollIntoView({ behavior: "smooth" })
        } else {
            let scrollTimeout;
            const scrollHandler = () => {
                clearTimeout(scrollTimeout)
                scrollTimeout = setTimeout(() => {
                    console.log('Scroll ended')
                    removeEventListener('scroll', scrollHandler)
                    newsList.value[index].isExpanded = true
                }, 100)
            }
            addEventListener('scroll', scrollHandler)
            target.scrollIntoView({ behavior: "smooth" })
        }
    }
}
const enableHighlight = id => {
    newsList.value[newsList.value.findIndex(newsListEntry => newsListEntry.id === id)].isHighlighted = true
}
const disableHighlight = id => {
    newsList.value[newsList.value.findIndex(newsListEntry => newsListEntry.id === id)].isHighlighted = false
}

// @todo ➔ make "expand" & "collaps" re-usable constants
const handleStatusChange = data => {
    newsList.value[newsList.value.findIndex(newsListEntry => newsListEntry.id === data.id)].isExpanded = data.type === 'expand'
}

const handleHeightUpdate = data => {
    newsList.value[newsList.value.findIndex(newsListEntry => newsListEntry.id === data.id)].height = parseInt(data.height, 10)
}

</script>
<style lang="postcss" scoped>
.intro {
    display: grid;
    grid-template-columns: 372px 90px;
    gap: 0 12px;
    margin-bottom: 19px;

    .text {
        text-align: justify;
    }

    .picture {
        width: 100px;

        .framed {
            width: 90px;
        }
    }
}
</style>