<template>
  <!-- @todo ➔ implement light/dark/auto theme functionality -->
  <div class="container" id="top" :style="appVariables">

    <Head>
      <Title>{{ titleHead }}</Title>
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

const faviconPath = computed(() => {
  const mapping = {
    default: {
      focus: 'default_focus.svg',
      blur: 'default_blur.svg',
    },
    crazy: {
      focus: 'crazy_focus.svg',
      blur: 'crazy_blur.svg',
    }
  }
  return `favicon/${mapping[themeKey.value][isFocused.value ? 'focus' : 'blur']}`
})

useHead({
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: faviconPath
    }
  ]
})

const setTitles = id => {
  title.value = PAGES.find(page => page.id === id).title.header['en']
  titleHead.value = setHeadTitle(id)
}


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