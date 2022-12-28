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
import { getSvg } from '@/helpers/helpers'

const props = defineProps({
    currentTheme: {
        type: String,
        default: 'default'
    }
})

const emit = defineEmits(['changeTheme'])

const containerWidth = ref(`${(Object.keys(themeLibrary).length * 40) + 20}px`)

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