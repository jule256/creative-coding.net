<template>
  <div class="container" id="top" :style="themeVariables">
    <button class="temp" @click="themeKey = themeKey === 'default' ? 'crazy' : 'default'">changeTheme ({{ themeKey
    }})</button>
    <Header :title="title" />
    <Navigation />
    <NuxtPage @updateTitle="setTitle" />
    <Footer />
  </div>
</template>
<script setup>
import { themes as themeLibrary } from './config/themes.js'

const title = ref('...')
const setTitle = newTitle => title.value = newTitle;

const themeKey = ref('default')
const themeVariables = computed(() => {
  return {
    '--font-color': themeLibrary[themeKey.value].fontColor,
    '--border-color': themeLibrary[themeKey.value].borderColor,
    '--background-color-content': themeLibrary[themeKey.value].backgroundColorContent,
    '--transparent-color': themeLibrary[themeKey.value].transparentColor,
    '--gradient-color-light': themeLibrary[themeKey.value].gradientColorLight,
    '--gradient-color-dark': themeLibrary[themeKey.value].gradientColorDark,
    '--hover-color': themeLibrary[themeKey.value].hoverColor,
  }
})

</script>
<style lang="postcss" scoped>
.temp {
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>