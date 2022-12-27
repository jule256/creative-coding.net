<template>
    <div class="content">
        <main class="main">
            <div style="margin-bottom: 20px;">
                <strong>note:</strong> a more detailed cv is available <NuxtLink to="/contact">upon
                    request</NuxtLink>.
            </div>
            <transition name="loading" @after-leave="onLoadingComplete">
                <Loading v-if="queryStatus.isLoading" />
            </transition>
            <transition name="loading">
                <div v-if="showLoadedContent">
                    <CvEntry v-for="(cvEntry, index) in cvList" :data="cvEntry" :index="index"
                        @status-change="handleStatusChange" @update-height="handleHeightUpdate" />
                </div>
            </transition>
        </main>
        <Sidebar :is-loading="queryStatus.isLoading" :show-content="showLoadedContent" class="sidebar">
            <SidebarEntry v-for="cvEntry in cvList" :headline="cvEntry.headline['en']" :id="cvEntry.id"
                @go-to="handleGoTo" @mouse-enter="enableHighlight" @mouse-leave="disableHighlight" />
        </Sidebar>
    </div>
</template>

<script setup>
import { useQuery } from 'vue-query'
import { fetchData } from '@/helpers/network'
import { enrichEntryList, setExpandState } from '@/helpers/helpers'
const emit = defineEmits(['updatePageId'])
const pageId = 'cv'

const route = useRoute()

const cvList = ref([])

const {
    enableHighlight,
    expandDefaults,
    expandById,
    disableHighlight,
    handleStatusChange,
    handleHeightUpdate,
    handleGoTo,
} = useEntryList(cvList, 'cv')

const {
    isHateoasLoading,
    isHateoasError,
    hateoasError,
    getUrl,
} = useHateoas()

const cvQuery = reactive(useQuery(
    ['cv'],
    () => fetchData(getUrl('cv')),
    { staleTime: 10000000 }
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
    showLoadedContent,
    onLoadingComplete,
} = useLoading(queryStatus)

watch(
    () => queryStatus.entryList?.data.length || 0,
    (newLength, oldLength) => {
        if (newLength !== oldLength) {
            // only enrich cv-list with the status-values if the data was freshly fetched
            cvList.value = enrichEntryList(queryStatus, 'cv')
            setExpandState('cv', route.params.slugs, expandById, expandDefaults)
        }
    }
)

onMounted(() => {
    emit('updatePageId', pageId)
    cvList.value = enrichEntryList(queryStatus, 'cv')
    setExpandState('cv', route.params.slugs, expandById, expandDefaults)
})

</script>