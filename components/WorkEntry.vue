<template>
    <article class="entry" :class="{ 'is-highlighted': isHighlighted }" :id="`work-entry-${data.id}`">
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
                <div class="wrapper" :class="{ 'reverse': (index % 2 !== 0) }">
                    <div class="picture">
                        <img class="framed" :src="data.image[0].src" :title="data.image[0].title.de"
                            :alt="data.image[0].alt.de" />
                    </div>
                    <div class="text">
                        <p v-for="paragraph in data.content" v-html="parseInline(paragraph)" />
                    </div>
                </div>
                <ul>
                    <li v-if="data.keywords">
                        <h2>Keywords: </h2>
                        <template v-for="(keyword, index) in data.keywords">
                            <NuxtLink v-if="keyword.url" :href="keyword.url" :title="keyword.title">
                                {{ keyword.text }}</NuxtLink>
                            <span v-else>{{ keyword.text }}</span>
                            <span v-if="(index < data.keywords.length - 1)">, </span>
                        </template>
                    </li>
                    <li v-for="link in data.links">
                        <h2>Link: </h2>
                        <NuxtLink :href="link.url" :title="link.title">{{ link.text }}</NuxtLink>
                        <span v-if="link.extra" v-html="`&nbsp;${parseInline(link.extra)}`" />
                    </li>
                </ul>
                <p class="footer">
                    updated {{ formatDate(data.date) }}
                </p>
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
    maxHeight,
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
    max-height: v-bind(maxHeight);
    margin-bottom: 10px;

    h2 {
        display: inline;
    }

    ul {
        li {
            position: relative;
            padding-left: 12px;
            margin-top: 5px;

            &::before {
                content: '» ';
                position: absolute;
                left: 0;
            }
        }
    }

    p {
        text-indent: 12px;
        text-align: justify;
        margin-bottom: 6px;

        &.footer {
            text-align: right;
            margin-top: 10px;
        }
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

.wrapper {
    display: grid;
    gap: 0 8px;
    grid-template-columns: 210px 260px;

    &.reverse {
        gap: 0 14px;
        grid-template-columns: 260px 210px;

        .picture {
            order: 1;
        }
    }

    margin-bottom: 10px;

    .picture {
        width: 200px;
    }
}
</style>