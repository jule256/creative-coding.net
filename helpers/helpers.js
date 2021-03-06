import { ENTRY_CONFIG } from '../config/config.js'

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
                entry.isExpanded = index < ENTRY_CONFIG[`OPEN_${type.toUpperCase()}_ENTRIES_BY_DEFAULT`]
                entry.height = ENTRY_CONFIG[`DEFAULT_${type.toUpperCase()}_ENTRY_HEIGHT`]
                return entry
            })
    } else {
        return []
    }
}