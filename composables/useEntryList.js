import { isElementInViewport } from '../helpers/helpers.js'
import { ENTRY_CONFIG } from '../config/config.js'

export const useEntryList = (list, type) => {
    const enableHighlight = id => {
        list.value[list.value.findIndex(entry => entry.id === id)].isHighlighted = true
    }

    const disableHighlight = id => {
        list.value[list.value.findIndex(entry => entry.id === id)].isHighlighted = false
    }

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
            expandByIndex(index)
        } else {
            if (list.value[index].isExpanded) {
                target.scrollIntoView(scrollOptions)
            } else {
                let scrollTimeout;
                const scrollHandler = () => {
                    clearTimeout(scrollTimeout)
                    scrollTimeout = setTimeout(() => {
                        removeEventListener('scroll', scrollHandler)
                        expandByIndex(index)
                    }, 100)
                }
                addEventListener('scroll', scrollHandler)
                target.scrollIntoView(scrollOptions)
            }
        }
    }

    const expandDefaults = type => {
        const closedByDefaultIndices = list.value.reduce((result, entry, index) => {
            entry.isClosedByDefault ? result.push(index) : null
            return result
        }, [])
        const entryIndices =
            [...Array(ENTRY_CONFIG[`OPEN_${type.toUpperCase()}_ENTRIES_BY_DEFAULT`]).keys()]
                .slice(0, list.value.length)
                .reduce((result, entry) => {
                    closedByDefaultIndices.includes(entry) ? null : result.push(entry)
                    return result
                }, [])
        expandByIndex(entryIndices)
    }

    const expandByIndex = entryIndices => {
        if (list.value.length === 0) {
            return
        }
        if (!Array.isArray(entryIndices)) {
            entryIndices = [entryIndices]
        }
        entryIndices.map(index => {
            list.value[index].isExpanded = true
        })
    }

    const expandById = entryIds => {
        const entryIndices = list.value
            .filter(entry => entryIds.includes(entry.id.toString()))
            .map(entry => entry.index)
        expandByIndex(entryIndices)
    }

    return {
        enableHighlight,
        expandByIndex,
        expandById,
        expandDefaults,
        disableHighlight,
        handleStatusChange,
        handleHeightUpdate,
        handleGoTo,
    }
}