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
import { useQuery } from 'vue-query'
import { fetchData } from '../helpers/network'
import { enrichEntryList } from '../helpers/helpers'
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
    entryList: computed(
        () => workQuery && workQuery.data
    ),
})

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
    emit('updateTitle', 'work')
    workList.value = enrichEntryList(queryStatus, 'work')
})
</script>
<style lang="postcss" scoped>
</style>