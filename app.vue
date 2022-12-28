<template>
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
    <ThemeSwitcher :currentTheme="themeKey" @changeTheme="changeTheme" />
    <Header :title="title" />
    <Navigation />
    <NuxtPage @updatePageId="setPageId" />
    <Footer />
  </div>
</template>
<script setup>
import { PAGES } from '@/config/pages'
import { setHeadTitle, getPageTitle, getSvg } from '@/helpers/helpers'
import { themes as themeLibrary } from '@/config/themes'

const BLURRED_TITLES = [
  `Julian Mollik » __PAGE_TITLE__`,
  `Julian Mollik  »__PAGE_TITLE__`,
  `Julian Mollik  «__PAGE_TITLE__`,
  `Julian Mollik « __PAGE_TITLE__`,
  `Julian Mollik«  __PAGE_TITLE__`,
  `Julian Mollik»  __PAGE_TITLE__`,
]

const route = useRoute()

const {
  changeTheme,
  themeKey,
} = useTheme()

const isFocused = ref(true)
const title = ref('')
const titleHead = ref('')
const pageId = ref('')

let intervalId
let intervalCount = 0

const setPageId = id => pageId.value = id

const setTitles = id => {
  title.value = PAGES.find(page => page.id === id).title.header['en']
  titleHead.value = setHeadTitle(id)
}

const faviconData = computed(() => {
  const statusKey = isFocused.value ? 'focus' : 'blur'
  return getSvg(
    themeLibrary[themeKey.value].favicon[statusKey].fill1,
    themeLibrary[themeKey.value].favicon[statusKey].fill2,
    themeLibrary[themeKey.value].favicon[statusKey].stroke2,
    true,
    true
  )
})

const appVariables = computed(() => ({
  '--font-color': themeLibrary[themeKey.value].fontColor,
  '--border-color': themeLibrary[themeKey.value].borderColor,
  '--background-color-content': themeLibrary[themeKey.value].backgroundColorContent,
  '--background-color-body': themeLibrary[themeKey.value].backgroundColorBody,
  '--transparent-color': themeLibrary[themeKey.value].transparentColor,
  '--gradient-color-light': themeLibrary[themeKey.value].gradientColorLight,
  '--gradient-color-dark': themeLibrary[themeKey.value].gradientColorDark,
  '--hover-background-color': themeLibrary[themeKey.value].hoverBackgroundColor,
  '--hover-color': themeLibrary[themeKey.value].hoverColor,
  '--link-hover-color': themeLibrary[themeKey.value].linkHoverColor,
  '--loading-color-line': themeLibrary[themeKey.value].loadingColorLine,
  '--loading-color-base': themeLibrary[themeKey.value].loadingColorBase,
  '--loading-color-active-1': themeLibrary[themeKey.value].loadingColorActive1,
  '--loading-color-active-2': themeLibrary[themeKey.value].loadingColorActive2,
  '--loading-color-active-3': themeLibrary[themeKey.value].loadingColorActive3,
  '--loading-color-active-4': themeLibrary[themeKey.value].loadingColorActive4,
  '--loading-color-active-text': themeLibrary[themeKey.value].loadingColorActiveText,
  '--extra-accent-color': themeLibrary[themeKey.value].extraAccentColor,
  '--saturate-value': themeLibrary[themeKey.value].saturateValue,
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

const updateBlurredTitle = () => {
  const titleIndex = intervalCount % BLURRED_TITLES.length
  titleHead.value = BLURRED_TITLES[titleIndex].replace('__PAGE_TITLE__', getPageTitle(pageId.value))
  intervalCount++
}

watch(isFocused, (isFocused) => {
  if (isFocused) {
    clearInterval(intervalId)
    setTitles(pageId.value)
  } else {
    intervalCount = 0
    intervalId = setInterval(updateBlurredTitle, 1000)
  }
})

watch(pageId, (pageId) => {
  setTitles(pageId)
})
</script>