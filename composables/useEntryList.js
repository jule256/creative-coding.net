import { isElementInViewport } from '../helpers/helpers.js'
import { ENTRY_CONFIG } from '../config/config.js'

export const useEntryList = (list, type) => {
    const enableHighlight = id => {
        list.value[list.value.findIndex(entry => entry.id === id)].isHighlighted = true
    }

    const disableHighlight = id => {
        list.value[list.value.findIndex(entry => entry.id === id)].isHighlighted = false
    }

    // @todo ➔ make "expand" & "collaps" re-usable constants
    const handleStatusChange = data => {
        list.value[list.value.findIndex(entry => entry.id === data.id)].isExpanded = data.type === ENTRY_CONFIG.STATUS_TYPE_EXPAND
    }

    const handleHeightUpdate = data => {
        list.value[list.value.findIndex(entry => entry.id === data.id)].height = parseInt(data.height, 10)
    }

    const handleGoTo = id => {
        const target = document.querySelector(`#${type}-entry-${id}`);
        const index = list.value.findIndex(entry => entry.id === id)
        const scrollOptions = { behavior: 'smooth' }

        if (isElementInViewport(target, list.value[index].height)) {
            target.scrollIntoView(scrollOptions)
            list.value[index].isExpanded = true
        } else {
            if (list.value[index].isExpanded) {
                target.scrollIntoView(scrollOptions)
            } else {
                let scrollTimeout;
                const scrollHandler = () => {
                    clearTimeout(scrollTimeout)
                    scrollTimeout = setTimeout(() => {
                        removeEventListener('scroll', scrollHandler)
                        list.value[index].isExpanded = true
                    }, 100)
                }
                addEventListener('scroll', scrollHandler)
                target.scrollIntoView(scrollOptions)
            }
        }
    }

    return {
        enableHighlight,
        disableHighlight,
        handleStatusChange,
        handleHeightUpdate,
        handleGoTo
    }
}