<template>
    <transition name="loading" @after-leave="onLoadingComplete">
        <Loading v-if="queryStatus.isLoading" loading-text="" :config="compactLoadingConfig" />
    </transition>
    <transition name="loading">
        <ul v-if="showLoadedContent" class="sitemap">
            <li v-for="newsEntry in newsList">
                <!-- @todo ➔ expand selected id on index-page -->
                <NuxtLink :to="`/?id=${newsEntry.id}`">{{ newsEntry.headline }}</NuxtLink>
            </li>
        </ul>
    </transition>
</template>

<script setup>
import { useQuery } from 'vue-query'
import { fetchData } from '../helpers/network'
import { enrichEntryList } from '../helpers/helpers'

const newsList = ref([])

const {
    isHateoasLoading,
    isHateoasError,
    isHateoasSuccess,
    hateoasError,
    getUrl,
} = useHateoas()

const {
    compactLoadingConfig,
    onLoadingComplete,
    showLoadedContent,
} = useLoading()

const newsQuery = reactive(useQuery(
    ['news'],
    () => fetchData(getUrl('news')),
    {
        staleTime: 10000000,
        enabled: isHateoasSuccess
    }
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
    entryList: computed(
        () => newsQuery && newsQuery.data
    ),
})

watch(
    () => queryStatus.entryList?.data.length || 0,
    (newLength, oldLength) => {
        if (newLength !== oldLength) {
            // only enrich news-list with the status-values if the data was freshly fetched
            newsList.value = enrichEntryList(queryStatus, 'news')
        }
    }
)

onMounted(() => {
    newsList.value = enrichEntryList(queryStatus, 'news')
})

</script>