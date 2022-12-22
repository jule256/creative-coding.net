<template>
    <article class="entry XXX" :class="{ 'is-highlighted': isHighlighted }" :id="`cv-entry-${data.id}`">
        <div class="header">
            <h2>{{ data.headline['en'] }}</h2>
            <div class="control">
                [ <NuxtLink @mouseover="isHover = true" @mouseleave="isHover = false" @click="handleToggle"
                    :title="toggleTitle">{{ data.isExpanded ?
                            'hide' : 'show'
                    }}</NuxtLink> ]
            </div>
        </div>
        <transition name="toggle" @after-enter="handleUpdateHeight" @before-leave="handleUpdateHeight">
            <div v-if="data.isExpanded" class="story">
                <ul>
                    <CvSection v-for="(content, index) in data.content" :content="content" :index="index"
                        @content-status-change="handleContentStatusChange"
                        @update-content-height="handleContentHeightUpdate" />
                </ul>
            </div>
        </transition>
    </article>
</template>
<script setup>
import { ENTRY_CONFIG } from '../config/config.js'

const emit = defineEmits(['status-change', 'update-height'])

const props = defineProps({
    data: {
        type: Object,
        default: () => { }
    },
    index: {
        type: Number,
        default: 0
    }
})

const {
    contentMaxHeight, // @todo → maybe refactor "content"
    handleToggle,
    handleUpdateHeight,
    isHover,
    isHighlighted,
    toggleTitle,
} = useEntry(props.data, emit)

const handleContentStatusChange = payload => {
    props.data.content[props.data.content.findIndex(section => section.id === payload.id)].isExpanded = payload.type === ENTRY_CONFIG.STATUS_TYPE_EXPAND

}

const handleContentHeightUpdate = payload => {
    props.data.content[props.data.content.findIndex(section => section.id === payload.id)].height = parseInt(payload.height, 10)
}

</script>

<style lang="postcss" scoped>
.story {
    overflow: hidden;
    max-height: v-bind(contentMaxHeight);
    margin: 0 -6px;
    padding: 0 6px;

    margin-bottom: 10px;

    h2 {
        display: inline;
    }
}

.toggle-enter-active {
    transition: max-height 1s ease-out;
}

.toggle-leave-active {
    transition: max-height 1s cubic-bezier(1, 0.5, 0.8, 1);
}

.toggle-enter-from,
.toggle-leave-to {
    max-height: 0;
}

.entry {
    margin: 0 -6px;
    padding: 0 6px;

    transition: background-color var(--mouseover-transition-duration) ease-in;
    border-radius: 4px;

    &.is-highlighted {
        background-color: var(--hover-color);
    }
}

.header {
    display: grid;
    grid-template-columns: 370px 100px;
    gap: 0 12px;
    height: 26px;
    line-height: 26px;

    .control {
        text-align: right;
    }
}
</style>