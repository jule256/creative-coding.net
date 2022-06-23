export const isElementInViewport = (el, expandedHeight) => {
    const lowerEnd = el.offsetTop + el.offsetHeight + expandedHeight
    return lowerEnd < window.scrollY + window.innerHeight && lowerEnd > window.scrollY
}