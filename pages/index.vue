<template>
    <div class="content">
        <main class="main">
            <div class="intro">
                <div class="text">
                    <p>
                        Welcome to my website. My Name is Julian Mollik, I am {{ age }} years old and I live in
                        Zürich, Switzerland.
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
                    <img class="framed" src="/picture/julian.mollik.jpg">
                </div>
            </div>
            <div class="news">
                <div v-if="queryStatus.isLoading" style="text-align: center; padding: 30px;">
                    ... is loading ... @todo
                </div>
                <NewsEntry v-else v-for="newsEntry in newsList" :data="newsEntry" @status-change="handleStatusChange"
                    @update-height="handleHeightUpdate" />
            </div>
            <div
                style="border: 1px dashed deeppink; padding: 4px; margin: 4px; font-family: monospace; white-space: pre-wrap">
                newsList.length ➔ {{ newsList.length }}<br />
                queryStatus.isLoading ➔ {{ queryStatus.isLoading }}<br />
                <!-- hateoasQuery.isLoading ➔ {{ hateoasQuery.isLoading }}<br /> -->
                isHateoasLoading ➔ {{ isHateoasLoading }}<br />
                <!-- hateoasQuery.data.links ➔ {{ hateoasQuery.data && hateoasQuery.data.links }}<br /> -->
            </div>
        </main>
        <Sidebar class="sidebar" name="home">
            <SidebarEntry v-for="newsEntry in newsList" :headline="newsEntry.headline" :id="newsEntry.id"
                @go-to="handleGoTo" @mouse-enter="enableHighlight" @mouse-leave="disableHighlight" />
        </Sidebar>
    </div>
</template>

<script setup>
import { DEFAULT_NEWS_STORY_HEIGHT, OPEN_NEWS_STORIES_BY_DEFAULT } from '../config/config.js'
import { useQuery } from 'vue-query'
import { fetchData } from '../helpers/network'
const emit = defineEmits(['updateTitle']);

const newsList = ref([])

const {
    enableHighlight,
    disableHighlight,
    handleStatusChange,
    handleHeightUpdate,
    handleGoTo
} = useEntryList(newsList, 'news')

const {
    isHateoasLoading,
    isHateoasError,
    hateoasError,
    getUrl,
} = useHateoas()

const newsQuery = reactive(useQuery(
    ['news'],
    () => fetchData(getUrl('news')),
    { staleTime: 10000000 }
))

const queryStatus = reactive({
    isLoading: computed(
        () => newsQuery.isLoading || isHateoasLoading.value
    ),
    isError: computed(
        () => newsQuery.isError || isHateoasError.value
    ),
    error: computed(
        () => queryStatus.isError ? (newsQuery.error || hateoasError.value) : ''
    ),
    newsList: computed(
        () => newsQuery && newsQuery.data
    ),
})

const age = computed(() => {
    const today = new Date();
    const birthDate = new Date('1981/02/13');
    const m = today.getMonth() - birthDate.getMonth();
    let age = today.getFullYear() - birthDate.getFullYear();
    return (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) ? age - 1 : age;
})

watch(queryStatus, newValue => {
    if (toRaw(newValue).newsList.value?.data) {
        const newsListRaw = toRaw(newValue).newsList.value.data
        newsList.value = toRaw(newsListRaw).reverse().map((newsListEntry, index) => {
            newsListEntry.isHighlighted = false
            newsListEntry.isExpanded = index < OPEN_NEWS_STORIES_BY_DEFAULT
            newsListEntry.height = DEFAULT_NEWS_STORY_HEIGHT
            return newsListEntry
        })
    }
})

onMounted(() => {
    emit('updateTitle', 'home')
})

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