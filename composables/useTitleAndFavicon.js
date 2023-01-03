import { PAGES } from '@/config/pages'
import { themes as themeLibrary } from '@/config/themes'
import { setHeadTitle, getPageTitle, getSvg } from '@/helpers/helpers'

const BLURRED_TITLES = [
    `Julian Mollik » __PAGE_TITLE__`,
    `Julian Mollik  »__PAGE_TITLE__`,
    `Julian Mollik  «__PAGE_TITLE__`,
    `Julian Mollik « __PAGE_TITLE__`,
    `Julian Mollik«  __PAGE_TITLE__`,
    `Julian Mollik»  __PAGE_TITLE__`
]

let intervalId
let intervalCount = 0

export const useTitleAndFavicon = themeKey => {
    const isFocused = ref(true)
    const title = ref('')
    const titleHead = ref('')
    const pageId = ref('')

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

    const updateBlurredTitle = () => {
        const titleIndex = intervalCount % BLURRED_TITLES.length
        titleHead.value = BLURRED_TITLES[titleIndex].replace('__PAGE_TITLE__', getPageTitle(pageId.value))
        intervalCount++
    }

    const setTitles = id => {
        title.value = PAGES.find(page => page.id === id).title.header['en']
        titleHead.value = setHeadTitle(id)
    }

    onMounted(() => {
        window.onfocus = () => {
            isFocused.value = true
        }
        window.onblur = () => {
            isFocused.value = false
        }
    })

    watch(isFocused, (isFocused) => {
        if (isFocused) {
            clearInterval(intervalId)
            setTitles(pageId.value)
        } else {
            intervalCount = 0
            intervalId = setInterval(updateBlurredTitle, 1000)
        }
    })

    return {
        faviconData,
        pageId,
        setTitles,
        title,
        titleHead
    }
}