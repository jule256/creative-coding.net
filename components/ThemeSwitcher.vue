<template>
    <div class="themes">
        <ul>
            <li v-for="(theme, name) in themeLibrary" @click="handleThemeChange(name)"
                :class="{ 'is-active': currentTheme === name }"
                v-html="getSvg(theme.chooser.fill1, theme.chooser.fill2, theme.chooser.stroke2)"
                :title="getTitle(name)">
            </li>
            <li class="auto" @click="handleThemeChange('auto')" :title="getTitle('auto')">
                <svg viewBox="-0.581 -0.5 101.183 85.436" width="101.183" height="85.436"
                    xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path
                            d="M -16.918 16.916 L 67.518 16.916 L 67.518 42.525 L 25.3 67.518 L -16.918 42.525 L -16.918 16.916 Z"
                            :style="`fill: #${themeLibrary.default.chooser.fill1};`"
                            transform="matrix(0, 1, -1, 0, 67.516998, 16.917)" />
                        <path
                            d="M 92.718 16.938 L 92.718 67.51 L 50 92.799 L 7.282 67.51 L 7.282 16.938 L 50 -8.363 L 92.718 16.938 Z M 8.282 17.508 L 8.282 66.94 L 50 91.637 L 91.718 66.94 L 91.718 17.508 L 50 -7.201 L 8.282 17.508 Z"
                            style="fill: none;" transform="matrix(0, 1, -1, 0, 92.218004, -7.782001)" />
                        <path
                            d="M 92.718 16.938 L 92.718 67.51 L 50 92.799 L 7.282 67.51 L 7.282 16.938 L 50 -8.363 L 92.718 16.938 Z M 8.282 17.508 L 8.282 66.94 L 50 91.637 L 91.718 66.94 L 91.718 17.508 L 50 -7.201 L 8.282 17.508 Z"
                            style="fill: none;" transform="matrix(0, 1, -1, 0, 92.218004, -7.782001)" />
                        <path
                            d="M 92.718 16.938 L 92.718 67.51 L 50 92.799 L 7.282 67.51 L 7.282 16.938 L 50 -8.363 L 92.718 16.938 Z M 8.282 17.508 L 8.282 66.94 L 50 91.637 L 91.718 66.94 L 91.718 17.508 L 50 -7.201 L 8.282 17.508 Z"
                            style="fill: none;" transform="matrix(0, 1, -1, 0, 92.218004, -7.782001)" />
                        <path
                            d="M 92.718 16.938 L 92.718 67.51 L 50 92.799 L 7.282 67.51 L 7.282 16.938 L 50 -8.363 L 92.718 16.938 Z M 8.282 17.508 L 8.282 66.94 L 50 91.637 L 91.718 66.94 L 91.718 17.508 L 50 -7.201 L 8.282 17.508 Z"
                            style="fill: none;" transform="matrix(0, 1, -1, 0, 92.218004, -7.782001)" />
                        <path
                            d="M 33.082 16.917 L 117.519 16.917 L 117.519 42.526 L 75.3 67.519 L 33.082 42.526 L 33.082 16.917 Z"
                            :style="`fill: #${themeLibrary.dark.chooser.fill1};`"
                            transform="matrix(0, -1, 1, 0, 33.0825, 117.518497)" />
                        <path
                            d="M -1.418 23.142 L 63.269 22.995 L 63.303 42.287 L 30.925 61.476 L -1.418 42.269 L -1.418 23.142 Z"
                            :style="`fill: #${themeLibrary.default.chooser.fill2}; stroke-width: 2px;`"
                            transform="matrix(0, 1, -1, 0, 73.178003, 11.293002)" />
                        <path
                            d="M 37.249 22.785 L 101.936 22.662 L 101.97 42.62 L 69.592 61.809 L 37.249 42.602 L 37.249 22.785 Z"
                            :style="`fill: #${themeLibrary.dark.chooser.fill2}; stroke-width: 2px;`"
                            transform="matrix(0, -1, 1, 0, 27.374002, 111.844999)" />
                    </g>
                </svg>
            </li>
        </ul>
    </div>
</template>
<script setup>
import { themes as themeLibrary } from '@/config/themes'
import { getSvg } from '@/helpers/helpers'

const props = defineProps({
    currentTheme: {
        type: String,
        default: 'default'
    }
})

const emit = defineEmits(['changeTheme'])

const containerWidth = ref(`${(Object.keys(themeLibrary).length * 40) + 60}px`)

const handleThemeChange = name => {
    name !== props.currentTheme ? emit('changeTheme', name) : null
}

const getTitle = name => {
    if (name === 'auto') {
        return `auto-detect theme by operating system`
    }
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
    border-radius: 13px 0 0 95px / 42px 0 0 100px;
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

        &.auto {
            transform-origin: center center;
            transform: scale(0.3) rotate(60deg) translate(16px, -43px);
        }
    }
}
</style>