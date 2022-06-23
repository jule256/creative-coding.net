<template>
    <div class="content">
        <main class="main">
            <WorkEntry v-for="(WorkEntry, index) in workList" :data="WorkEntry" :index="index"
                @status-change="handleStatusChange" @update-height="handleHeightUpdate" />
        </main>
        <Sidebar class="sidebar" name="work">
            <SidebarEntry v-for="workEntry in workList" :headline="workEntry.headline" :id="workEntry.id"
                @go-to="handleGoTo" @mouse-enter="enableHighlight" @mouse-leave="disableHighlight" />
        </Sidebar>
    </div>
</template>

<script setup>
import { work as workListRaw } from '../api/work.js'
import { DEFAULT_WORK_STORY_HEIGHT, OPEN_WORK_STORIES_BY_DEFAULT } from '../config/config.js'

const workList = ref([])

const {
    enableHighlight,
    disableHighlight,
    handleStatusChange,
    handleHeightUpdate,
    handleGoTo
} = useEntryList(workList, 'work')

const emit = defineEmits(['updateTitle'])

onMounted(() => {
    emit('updateTitle', 'work')

    workList.value = workListRaw.reverse().map((workListEntry, index) => {
        workListEntry.isHighlighted = false
        workListEntry.isExpanded = index < OPEN_WORK_STORIES_BY_DEFAULT
        workListEntry.height = DEFAULT_WORK_STORY_HEIGHT
        return workListEntry
    })
})
</script>
<style lang="postcss" scoped>
</style>