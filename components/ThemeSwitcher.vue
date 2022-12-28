<template>
    <div class="themes">
        <ul>
            <li v-for="(theme, name) in themeLibrary" @click="handleThemeChange(name)"
                :class="{ 'is-active': currentTheme === name }"
                v-html="getSvg(theme.chooser.fill1, theme.chooser.fill2, theme.chooser.stroke2)"
                :title="getTitle(name)">
            </li>
        </ul>
    </div>
</template>
<script setup>
import { themes as themeLibrary } from '@/config/themes'

const props = defineProps({
    currentTheme: {
        type: String,
        default: 'default'
    }
})

const emit = defineEmits(['changeTheme'])

const containerWidth = ref(`${(Object.keys(themeLibrary).length * 40) + 20}px`)

const getSvg = (fill1, fill2, stroke2) => {
    return `
        <svg viewBox="-0.001 0 100 84.436" width="100" height="84.436" xmlns="http://www.w3.org/2000/svg">
            <g transform="matrix(3.13, 0, 0, 3.13, 0.001067, 0)">
                <path
                    d="M 15.988 -2.489 L 29.488 5.507 L 29.488 21.496 L 15.988 29.488 L 2.488 21.496 L 2.488 5.507 L 15.988 -2.489 Z"
                    style="fill: #__FILL_1__" transform="matrix(0, 1, -1, 0, 30, -2.5)" />
                <path
                    d="M 15.988 0.867 L 26.655 7.185 L 26.655 19.817 L 15.988 26.132 L 5.321 19.817 L 5.321 7.185 L 15.988 0.867 Z"
                    style="fill: #__FILL_2__; stroke: #__STROKE_2__; stroke-width: 2px;"
                    transform="matrix(0, 1, -1, 0, 30, -2.5)" />
            </g>
        </svg>`
        .replace('__FILL_1__', fill1).replace('__FILL_2__', fill2).replace('__STROKE_2__', stroke2)
}

const handleThemeChange = name => {
    emit('changeTheme', name)
}

const getTitle = name => {
    return name === props.currentTheme ? `active theme "${props.currentTheme}"` : `switch to theme "${name}"`
}
</script>

<style lang="postcss" scoped>
.themes {
    position: absolute;
    top: -2px;
    right: 0;
    width: v-bind(containerWidth);
    height: 35px;
    background-color: var(--background-color-content);
    border: 2px solid var(--border-color);
    border-right: none;
    border-radius: 13px 0px 0px 95px / 42px 0px 0px 100px;
    padding-left: 7px;

    ul {
        display: flex;
    }

    li {
        transform: scale(0.3);
        height: 13px;
        width: 40px;

        &:not(.is-active) {
            cursor: pointer;
        }
    }
}
</style>