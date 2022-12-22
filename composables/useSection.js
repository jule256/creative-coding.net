import { ENTRY_CONFIG } from '../config/config.js'

export const useSection = (content, emit) => {

    const isSectionHover = ref(false)

    const contentMaxHeight = ref(`${content.height ? content.height + 'px' : 'none'}`)

    const handleSectionToggle = () => {
        emit(
            'content-status-change',
            { id: content.id, type: content.isExpanded ? ENTRY_CONFIG.STATUS_TYPE_COLLAPSE : ENTRY_CONFIG.STATUS_TYPE_EXPAND }
        )
    }

    const handleUpdateHeight = el => {
        const height = getComputedStyle(el).height
        contentMaxHeight.value = height
        if (height !== `${content.height}px`) {
            // only emit update if the height has actually changed
            emit('update-content-height', { id: content.id, height })
        }
    }

    const isSectionHighlighted = computed(() => {
        return isSectionHover.value || content.isHighlighted // @todo → check if this breaks something
    })

    // @todo → identical in useEntry and useSection
    const toggleTitle = computed(() => {
        return content.isExpanded ? 'hide this entry' : 'show this entry'
    })

    return {
        contentMaxHeight,
        handleSectionToggle,
        handleUpdateHeight,
        isSectionHover,
        isSectionHighlighted,
        toggleTitle
    }
}