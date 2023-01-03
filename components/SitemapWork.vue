<template>
    <transition name="loading" @after-leave="onLoadingComplete">
        <Loading v-if="queryStatus.isLoading" loading-text="" :config="compactLoadingConfig" />
    </transition>
    <transition name="loading">
        <ul v-if="showLoadedContent" class="sitemap">
            <li v-for="workEntry in workList">
                <NuxtLink :to="`/work${getSitemapLinkParameter(workEntry.id, 'work', workList)}`">{{ workEntry.headline
                    }}
                </NuxtLink>
            </li>
        </ul>
    </transition>
</template>

<script setup>
import { useQuery } from 'vue-query'
import { fetchData } from '../helpers/network'
import { enrichEntryList, getSitemapLinkParameter } from '../helpers/helpers'

const workList = ref([])

const {
    isHateoasLoading,
    isHateoasError,
    isHateoasSuccess,
    hateoasError,
    getUrl,
} = useHateoas()

const workQuery = reactive(useQuery(
    ['work'],
    () => fetchData(getUrl('work')),
    {
        staleTime: 10000000,
        enabled: isHateoasSuccess
    }
))

const queryStatus = reactive({
    isLoading: computed(
        () => workQuery.isLoading || isHateoasLoading.value
    ),
    isError: computed(
        () => workQuery.isError || isHateoasError.value
    ),
    error: computed(
        () => queryStatus.isError ? (workQuery.error || hateoasError.value) : ''
    ),
    entryList: computed(
        () => workQuery && workQuery.data
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
            // only enrich work-list with the status-values if the data was freshly fetched
            workList.value = enrichEntryList(queryStatus, 'work')
        }
    }
)

onMounted(() => {
    workList.value = enrichEntryList(queryStatus, 'work')
})
</script>