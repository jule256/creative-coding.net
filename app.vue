<template>
  <!-- @todo ➔ implement light/dark/auto theme functionality -->
  <div class="container" id="top" :style="appVariables">

    <Head>
      <Title>{{ titleHead }}</Title>
      <Link rel="icon" :href="`data:image/svg+xml,${faviconData}`" type="image/svg+xml" />
    </Head>
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
    <NuxtPage @updateTitle="setTitles" />
    <Footer />
  </div>
</template>
<script setup>
import { PAGES } from '@/config/pages'
import { setHeadTitle } from '@/helpers/helpers'
import { themes as themeLibrary } from './config/themes'

const route = useRoute()

const themeKey = ref('default')
const isFocused = ref(true)
const title = ref('')
const titleHead = ref('')

const setTitles = id => {
  title.value = PAGES.find(page => page.id === id).title.header['en']
  titleHead.value = setHeadTitle(id)
}

// created with https://yoksel.github.io/url-encoder/
const faviconData = computed(() => {
  return [
    `%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E`,
    `%3Csvg viewBox='-0.001 0 100 85' width='100' height='85' xmlns='http://www.w3.org/2000/svg'%3E`,
    `  %3Cg transform='matrix(3.13, 0, 0, 3.13, 0, 0)'%3E`,
    `    %3Cpath d='M 15.988 -2.489 L 29.488 5.507 L 29.488 21.496 L 15.988 29.488 L 2.488 21.496 L 2.488 5.507 L 15.988 -2.489 Z' style='fill: %23${themeLibrary[themeKey.value].favicon[isFocused.value ? 'focus' : 'blur'].faviconColorFill1};' transform='matrix(0, 1, -1, 0, 30, -2.5)'/%3E`,
    `    %3Cpath d='M 15.988 0.867 L 26.655 7.185 L 26.655 19.817 L 15.988 26.132 L 5.321 19.817 L 5.321 7.185 L 15.988 0.867 Z' style='fill: %23${themeLibrary[themeKey.value].favicon[isFocused.value ? 'focus' : 'blur'].faviconColorFill2}; stroke: %23${themeLibrary[themeKey.value].favicon[isFocused.value ? 'focus' : 'blur'].faviconColorStroke2}; stroke-width: 2px;' transform='matrix(0, 1, -1, 0, 30, -2.5)'/%3E`,
    `  %3C/g%3E`,
    `%3C/svg%3E`,
  ].join('')
})

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

if (route.fullPath === '/') {
  await navigateTo('/home', { redirectCode: 301 })
}

onMounted(() => {
  window.onfocus = () => {
    isFocused.value = true
  }
  window.onblur = () => {
    isFocused.value = false
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