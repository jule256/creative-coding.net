import { ENTRY_CONFIG } from '@/config/config.js'

export const isElementInViewport = (el, expandedHeight) => {
    const lowerEnd = el.offsetTop + el.offsetHeight + expandedHeight
    return lowerEnd < window.scrollY + window.innerHeight && lowerEnd > window.scrollY
}

export const formatDate = isoDate => {
    const d = new Date(isoDate)
    return d.toLocaleDateString('en-GB')
}

export const enrichEntryList = (queryStatus, type) => {
    if (queryStatus.entryList?.data) {
        return toRaw(queryStatus.entryList.data)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((entry, index) => {
                entry.isHighlighted = false
                entry.isExpanded = false
                entry.height = ENTRY_CONFIG[`DEFAULT_${type.toUpperCase()}_ENTRY_HEIGHT`]
                entry.index = index
                return entry
            })
    } else {
        return []
    }
}

export const setExpandState = (type, slugs = [], expandById, expandDefaults) => {
    if (slugs.length > 0) {
        expandById(slugs)
    } else {
        expandDefaults(type)
    }
}

export const getSitemapLinkParameter = (id, type, list, ignoreOpenDefaultEntries = false) => {
    let alwaysOpenEntries = []
    if (!ignoreOpenDefaultEntries) {
        alwaysOpenEntries = list.slice(0, ENTRY_CONFIG[`OPEN_${type.toUpperCase()}_ENTRIES_BY_DEFAULT`])
    }
    return alwaysOpenEntries.find(entry => entry.id === id) ? '' : `/${id}`
}