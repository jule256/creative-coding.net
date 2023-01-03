<template>
    <transition name="loading" @after-leave="onLoadingComplete">
        <Loading v-if="queryStatus.isLoading" loading-text="" :config="compactLoadingConfig" />
    </transition>
    <transition name="loading">
        <ul v-if="showLoadedContent" class="sitemap">
            <li v-for="cvEntry in cvList">
                <NuxtLink :to="`/cv${getSitemapLinkParameter(cvEntry.id, 'cv', cvList, true)}`">
                    {{ cvEntry.headline['en'] }}
                </NuxtLink>
            </li>
        </ul>
    </transition>
</template>

<script setup>
import { useQuery } from 'vue-query'
import { fetchData } from '../helpers/network'
import { enrichEntryList, getSitemapLinkParameter } from '../helpers/helpers'

const cvList = ref([])

const {
    isHateoasLoading,
    isHateoasError,
    isHateoasSuccess,
    hateoasError,
    getUrl,
} = useHateoas()

const cvQuery = reactive(useQuery(
    ['cv'],
    () => fetchData(getUrl('cv')),
    {
        staleTime: 10000000,
        enabled: isHateoasSuccess
    }
))

const queryStatus = reactive({
    isLoading: computed(
        () => cvQuery.isLoading || isHateoasLoading.value
    ),
    isError: computed(
        () => cvQuery.isError || isHateoasError.value
    ),
    error: computed(
        () => queryStatus.isError ? (cvQuery.error || hateoasError.value) : ''
    ),
    entryList: computed(
        () => cvQuery && cvQuery.data
    ),
})

const {
    compactLoadingConfig,
    onLoadingComplete,
    showLoadedContent,
} = useLoading(queryStatus)

watch(
    () => queryStatus.entryList?.data.length || 0,
    (newLength, oldLength) => {
        if (newLength !== oldLength) {
            // only enrich cv-list with the status-values if the data was freshly fetched
            cvList.value = enrichEntryList(queryStatus, 'cv')
        }
    }
)

onMounted(() => {
    cvList.value = enrichEntryList(queryStatus, 'cv')
})
</script>