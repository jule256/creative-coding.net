import { isElementInViewport } from '../helpers/helpers.js'
import { ENTRY_CONFIG } from '../config/config.js'
import { navigationState } from '@/helpers/navigation'

export const useEntryList = (list, type) => {
    const enableHighlight = id => {
        list.value[list.value.findIndex(entry => entry.id === id)].isHighlighted = true
    }

    const disableHighlight = id => {
        list.value[list.value.findIndex(entry => entry.id === id)].isHighlighted = false
    }

    const handleStatusChange = data => {
        updateIdInPath(data.id, data.type)
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
            updateIdInPath(id)
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
                        updateIdInPath(id)
                    }, 100)
                }
                addEventListener('scroll', scrollHandler)
                target.scrollIntoView(scrollOptions)
            }
        }
    }

    const expandDefaults = type => {
        const entryIndices = [...Array(ENTRY_CONFIG[`OPEN_${type.toUpperCase()}_ENTRIES_BY_DEFAULT`]).keys()]
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

    const updateIdInPath = (id, status = ENTRY_CONFIG.STATUS_TYPE_EXPAND) => {
        let activeIds = window.location.pathname
            .split('/')
            .filter(value => !Number.isNaN(parseInt(value)))
        console.log('updateIdInPath() activeIds', activeIds)
        if (status === ENTRY_CONFIG.STATUS_TYPE_EXPAND) {
            activeIds = activeIds
                .concat([id.toString()])
                .sort((a, b) => a - b)
                .filter((value, index, array) => array.indexOf(value) == index)
        } else { // STATUS_TYPE_COLLAPSE
            activeIds = activeIds
                .filter(value => Number(value) !== id)
        }
        navigationState.update(type, activeIds)
        history.pushState(
            {},
            null,
            `/${type}/${activeIds.join('/')}`
        )
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