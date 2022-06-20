<template>
    <article class="entry" :class="{ 'is-highlighted': isHighlighted }" :id="`news-entry-${data.id}`">
        <div class="header">
            <h2>{{ data.headline }}</h2>
            <div class="control">
                [ <NuxtLink @mouseover="isHover = true" @mouseleave="isHover = false" @click="handleToggle"
                    :title="toggleTitle">{{ data.isExpanded ?
                            'hide' : 'show'
                    }}</NuxtLink> ]
            </div>
        </div>
        <transition name="toggle" @after-enter="handleUpdateHeight" @before-leave="handleUpdateHeight">
            <div v-if="data.isExpanded" class="story">
                <p v-for="paragraph in data.content" v-html="parseInline(paragraph)" />
                <p class="footer">
                    {{ data.date }}
                </p>
                <h5>test</h5>
            </div>
        </transition>
    </article>
</template>
<script setup>
import { parseInline } from 'marked'

const emit = defineEmits(['status-change', 'update-height'])

const props = defineProps({
    data: {
        type: Object,
        default: () => { }
    }
})

const isHover = ref(false);
// estimate a max-height for the first toggle (should be higher, but now lower, than the measured height)
const contentMaxHeight = ref(`${props.data.height} px`)

const toggleTitle = computed(() => {
    return props.data.isExpanded ? 'hide this entry' : 'show this entry'
})

const isHighlighted = computed(() => {
    return isHover.value || props.data.isHighlighted
})

const handleUpdateHeight = el => {
    const height = getComputedStyle(el).height
    contentMaxHeight.value = height
    if (height !== `${props.data.height} px`) {
        // only emit update if the height has actually changed
        emit('update-height', { id: props.data.id, height })
    }
}

const handleToggle = () => {
    emit(
        'status-change',
        { id: props.data.id, type: props.data.isExpanded ? 'collapse' : 'expand' }
    )
}
</script>

<style lang="postcss" scoped>
.story {
    overflow: hidden;
    max-height: v-bind(contentMaxHeight);
}

.toggle-enter-active {
    transition: max-height 1s ease-out;
}

.toggle-leave-active {
    transition: max-height 1s cubic-bezier(1, 0.5, 0.8, 1);
}

.toggle-enter-from,
.toggle-leave-to {
    max-height: 0px;
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

.story {
    margin-bottom: 10px;

    p {
        text-indent: 12px;
        text-align: justify;
        margin-bottom: 6px;

        &.footer {
            text-align: right;
        }
    }
}
</style>