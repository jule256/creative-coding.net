import { ENTRY_CONFIG } from '../config/config'
import { PAGES } from '../config/pages'

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

export const setHeadTitle = id => {
    return `Julian Mollik » ${getPageTitle(id)}`
}

export const getPageTitle = id => {
    return PAGES.find(page => page.id === id).title.head['en']
}

export const getSvg = (fill1, fill2, stroke2, withXMLTag = false, sanitized = false) => {
    let svg = `
        <svg viewBox='0 0 100 85' width='100' height='85' xmlns='http://www.w3.org/2000/svg'>
            <g transform='matrix(3.13, 0, 0, 3.13, 0, 0)'>
                <path
                    d='M 15.988 -2.489 L 29.488 5.507 L 29.488 21.496 L 15.988 29.488 L 2.488 21.496 L 2.488 5.507 L 15.988 -2.489 Z'
                    style='fill: #__FILL_1__;' transform='matrix(0, 1, -1, 0, 30, -2.5)' />
                <path
                    d='M 15.988 0.867 L 26.655 7.185 L 26.655 19.817 L 15.988 26.132 L 5.321 19.817 L 5.321 7.185 L 15.988 0.867 Z'
                    style='fill: #__FILL_2__; stroke: #__STROKE_2__; stroke-width: 2px;'
                    transform='matrix(0, 1, -1, 0, 30, -2.5)' />
            </g>
        </svg>`
        .replace('__FILL_1__', fill1).replace('__FILL_2__', fill2).replace('__STROKE_2__', stroke2)
    if (withXMLTag) {
        svg = `<?xml version='1.0' encoding='utf-8'?>${svg}`
    }
    if (sanitized) {
        svg = svg
            .split(/\r?\n/)
            .map(line => line.trim())
            .join(' ')
            .replace(/</gm, '%3C')
            .replace(/>/gm, '%3E')
            .replace(/\?/gm, '%3F')
            .replace(/#/gm, '%23')
    }
    return svg
}

// taken from https://stackoverflow.com/a/4819886
export const isTouchDevice = () => {
    console.log(`the READ isTouchDevice`)
    return 'TRUE!!!'

    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0))
}