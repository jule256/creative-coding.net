import { isElementInViewport } from '../helpers/helpers.js'

export const useEntryList = (list, type) => {
    const enableHighlight = id => {
        list.value[list.value.findIndex(entry => entry.id === id)].isHighlighted = true
    }

    const disableHighlight = id => {
        list.value[list.value.findIndex(entry => entry.id === id)].isHighlighted = false
    }

    // @todo ➔ make "expand" & "collaps" re-usable constants
    const handleStatusChange = data => {
        list.value[list.value.findIndex(entry => entry.id === data.id)].isExpanded = data.type === 'expand'
    }

    const handleHeightUpdate = data => {
        list.value[list.value.findIndex(entry => entry.id === data.id)].height = parseInt(data.height, 10)
    }

    const handleGoTo = id => {
        const target = document.querySelector(`#${type}-entry-${id}`);
        const index = list.value.findIndex(entry => entry.id === id)

        if (isElementInViewport(target, list.value[index].height)) {
            target.scrollIntoView({ behavior: "smooth" })
            list.value[index].isExpanded = true
        } else {
            if (list.value[index].isExpanded) {
                target.scrollIntoView({ behavior: "smooth" })
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
                target.scrollIntoView({ behavior: "smooth" })
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