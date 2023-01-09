<template>
    <li class="section-entry" :class="{ 'is-section-highlighted': isHighlighted, 'is-compact': isCompact }">
        <div class="key">
            {{ content.key['en'] }}
            <div v-if="content.isExpandable" class="control">
                [ <NuxtLink @mouseover="isHover = true" @mouseleave="isHover = false" @click="handleToggle"
                    :title="toggleTitle">
                    {{ content.isExpanded ? 'hide' : 'show' }}
                </NuxtLink> ]
            </div>
        </div>
        <transition name="toggle" @after-enter="handleUpdateHeight" @before-leave="handleUpdateHeight">
            <div v-if="content.isExpanded" class="value">
                <template v-if="!isCompact">
                    <ul>
                        <li v-for="(entry) in content.value['en']">
                            <template v-if="Array.isArray(entry)">
                                <template v-for="line in entry">
                                    {{ line }}<br />
                                </template>
                            </template>
                            <div v-html="`${parseInline(entry)}`" v-else>
                            </div>
                        </li>
                    </ul>
                </template>
                <template v-else>
                    {{ content.value['en'] }}
                </template>
            </div>
        </transition>
    </li>
</template>
<script setup>
import { parseInline } from 'marked'

const emit = defineEmits(['status-change', 'update-height'])

const props = defineProps({
    content: {
        type: Object,
        default: () => { }
    },
    index: {
        type: Number,
        default: 0
    }
})

const isCompact = computed(() => {
    return !Array.isArray(props.content.value['en'])
})

const {
    maxHeight,
    handleToggle,
    handleUpdateHeight,
    isHover,
    isHighlighted,
    toggleTitle,
} = useEntry(props.content, emit)
</script>

<style lang="postcss" scoped>
.section-entry {
    display: grid;
    grid-template-columns: 150px fit-content(490px);
    gap: 0 12px;

    margin: 0 -6px 4px -6px;
    padding: 6px;

    transition: background-color var(--mouseover-transition-duration) ease-in;
    border-radius: 4px;

    &.is-section-highlighted {
        background-color: var(--hover-background-color);
        color: var(--hover-color);

        a {
            color: var(--hover-color);
        }
    }

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

    .control {
        margin-top: 10px;
    }

    &.is-compact {
        margin-top: 0;
        margin-bottom: 6px;
        padding-top: 0;
        padding-bottom: 3px;
    }
}

/* note that the max-height animation does NOT work if the .value {} is defined nested within .section-entry 🤦🏻‍♂️ */
.value {
    overflow: hidden;
    max-height: v-bind(maxHeight);
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
</style>
<style lang="postcss">
/* the <a> tags are created during runtime and therefore are not scoped */
.is-section-highlighted {
    a {
        color: var(--hover-color);
    }
}
</style>