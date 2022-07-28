<template>
  <div class="container" id="top" :style="appVariables">
    <component :is="'style'">
      :root {
      --background-color-body: {{ rootVariables.backgroundColorBody }};
      --background-image-body: url({{ rootVariables.backgroundImageBody }});
      }
    </component>
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

const title = ref('')
const setTitle = newTitle => title.value = newTitle;

const themeKey = ref('default')
const appVariables = computed(() => ({
  '--font-color': themeLibrary[themeKey.value].fontColor,
  '--border-color': themeLibrary[themeKey.value].borderColor,
  '--background-color-content': themeLibrary[themeKey.value].backgroundColorContent,
  '--background-color-body': themeLibrary[themeKey.value].backgroundColorBody,
  '--transparent-color': themeLibrary[themeKey.value].transparentColor,
  '--gradient-color-light': themeLibrary[themeKey.value].gradientColorLight,
  '--gradient-color-dark': themeLibrary[themeKey.value].gradientColorDark,
  '--hover-color': themeLibrary[themeKey.value].hoverColor,
  '--loading-color-line': themeLibrary[themeKey.value].loadingColorLine,
  '--loading-color-base': themeLibrary[themeKey.value].loadingColorBase,
  '--loading-color-active-1': themeLibrary[themeKey.value].loadingColorActive1,
  '--loading-color-active-2': themeLibrary[themeKey.value].loadingColorActive2,
  '--loading-color-active-3': themeLibrary[themeKey.value].loadingColorActive3,
  '--loading-color-active-4': themeLibrary[themeKey.value].loadingColorActive4,
  '--loading-color-active-text': themeLibrary[themeKey.value].loadingColorActiveText,
  '--extra-accent-color': themeLibrary[themeKey.value].extraAccentColor,
}))

const rootVariables = computed(() => ({
  backgroundColorBody: themeLibrary[themeKey.value].backgroundColorBody,
  backgroundImageBody: themeLibrary[themeKey.value].backgroundImageBody
}))

</script>
<style lang="postcss" scoped>
.temp {
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>