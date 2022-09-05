<template>
    <div class="content">
        <main class="main">
            <transition name="loading" @after-leave="onLoadingComplete">
                <Loading v-if="queryStatus.isLoading" />
            </transition>
            <transition name="loading">
                <div v-if="showLoadedContent">
                    <WorkEntry v-for="(workEntry, index) in workList" :data="workEntry" :index="index"
                        @status-change="handleStatusChange" @update-height="handleHeightUpdate" />
                </div>
            </transition>
        </main>
        <Sidebar :is-loading="queryStatus.isLoading" :show-content="showLoadedContent" class="sidebar">
            <SidebarEntry v-for="workEntry in workList" :headline="workEntry.headline" :id="workEntry.id"
                @go-to="handleGoTo" @mouse-enter="enableHighlight" @mouse-leave="disableHighlight" />
        </Sidebar>
    </div>
</template>

<script setup>
import { useQuery } from 'vue-query'
import { fetchData } from '@/helpers/network'
import { enrichEntryList } from '@/helpers/helpers'
import { navigationState } from '@/helpers/navigation'
const emit = defineEmits(['updateTitle'])

const route = useRoute()

const workList = ref([])

const {
    enableHighlight,
    expandDefaults,
    expandById,
    disableHighlight,
    handleStatusChange,
    handleHeightUpdate,
    handleGoTo,
} = useEntryList(workList, 'work')

const {
    isHateoasLoading,
    isHateoasError,
    hateoasError,
    getUrl,
} = useHateoas()

const workQuery = reactive(useQuery(
    ['work'],
    () => fetchData(getUrl('work')),
    { staleTime: 10000000 }
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
    showLoadedContent,
    onLoadingComplete,
} = useLoading(queryStatus)

watch(
    () => queryStatus.entryList?.data.length || 0,
    (newLength, oldLength) => {
        if (newLength !== oldLength) {
            // only enrich work-list with the status-values if the data was freshly fetched
            workList.value = enrichEntryList(queryStatus, 'work')
            expandDefaults('work')
            expandById(route.params.slugs)
            navigationState.update('work', route.params.slugs)
        }
    }
)

onMounted(() => {
    emit('updateTitle', 'work')
    workList.value = enrichEntryList(queryStatus, 'work')
    expandDefaults('work')
    expandById(route.params.slugs)
})

</script>