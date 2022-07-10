<template>
    <div class="content">
        <main class="main">
            <div v-if="queryStatus.isLoading" style="text-align: center; padding: 30px;">
                ... is loading ... @todo
            </div>
            <WorkEntry v-else v-for="(WorkEntry, index) in workList" :data="WorkEntry" :index="index"
                @status-change="handleStatusChange" @update-height="handleHeightUpdate" />
        </main>
        <Sidebar :is-loading="queryStatus.isLoading" class="sidebar">
            <SidebarEntry v-for="workEntry in workList" :headline="workEntry.headline" :id="workEntry.id"
                @go-to="handleGoTo" @mouse-enter="enableHighlight" @mouse-leave="disableHighlight" />
        </Sidebar>
    </div>
</template>

<script setup>
import { work as workListRaw } from '../api/work.js'
import { DEFAULT_WORK_STORY_HEIGHT, OPEN_WORK_STORIES_BY_DEFAULT } from '../config/config.js'
import { useQuery } from 'vue-query'
import { fetchData } from '../helpers/network'
const emit = defineEmits(['updateTitle'])

const workList = ref([])

const {
    enableHighlight,
    disableHighlight,
    handleStatusChange,
    handleHeightUpdate,
    handleGoTo
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
    workList: computed(
        () => workQuery && workQuery.data
    ),
})

const enrichWorkList = queryStatus => {
    if (queryStatus.workList?.data) {
        return toRaw(queryStatus.workList.data)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((workListEntry, index) => {
                workListEntry.isHighlighted = false
                workListEntry.isExpanded = index < OPEN_WORK_STORIES_BY_DEFAULT
                workListEntry.height = DEFAULT_WORK_STORY_HEIGHT
                return workListEntry
            })
    } else {
        return []
    }
}

watch(
    () => queryStatus.workList?.data.length || 0,
    (newLength, oldLength) => {
        if (newLength !== oldLength) {
            // only enrich newslist with the status-values if the data was freshly fetched
            workList.value = enrichWorkList(queryStatus)
        }
    }
)


onMounted(() => {
    emit('updateTitle', 'work')

    workList.value = enrichWorkList(queryStatus)
})
</script>
<style lang="postcss" scoped>
</style>