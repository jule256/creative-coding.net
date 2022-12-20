<template>
    <article class="entry" :class="{ 'is-highlighted': isHighlighted }" :id="`cv-entry-${data.id}`">
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
                    <li v-for="(content, index) in data.content" class="section-entry">
                        <span class="key">
                            {{ content.key['en'] }}<br />
                            [ hide ]
                        </span>
                        <span class="value">
                            <template v-if="Array.isArray(content.value['en'])">
                                <ul>
                                    <li v-for="(entry) in content.value['en']">
                                        <template v-if="Array.isArray(entry)">
                                            <template v-for="line in entry">
                                                {{ line }}<br />
                                            </template>
                                        </template>
                                        <template v-else>
                                            {{ entry }}
                                        </template>
                                    </li>
                                </ul>
                            </template>
                            <template v-else>
                                {{ content.value['en'] }}
                            </template>
                        </span>
                    </li>
                </ul>
            </div>
        </transition>
    </article>
</template>
<script setup>
import { parseInline } from 'marked'
import { formatDate } from '../helpers/helpers.js'

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
    contentMaxHeight,
    handleToggle,
    handleUpdateHeight,
    isHover,
    isHighlighted,
    toggleTitle,
} = useEntry(props.data, emit)
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

.story {
    margin-bottom: 10px;

    h2 {
        display: inline;
    }
}

.section-entry {
    display: grid;
    grid-template-columns: 150px fit-content(320px);
    gap: 0 12px;
    margin-bottom: 10px;

    &:first-of-type {
        margin-top: 5px;
    }

    li {
        position: relative;
        padding-left: 12px;
        margin-bottom: 3px;

        &::before {
            content: '» ';
            position: absolute;
            left: 0;
        }
    }
}
</style>