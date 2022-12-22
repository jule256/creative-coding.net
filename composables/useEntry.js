import { ENTRY_CONFIG } from '../config/config.js'

export const useEntry = (data, emit) => {

    const isHover = ref(false)

    const contentMaxHeight = ref(`${data.height ? data.height + 'px' : 'none'}`)

    const handleToggle = () => {
        emit(
            'status-change',
            { id: data.id, type: data.isExpanded ? ENTRY_CONFIG.STATUS_TYPE_COLLAPSE : ENTRY_CONFIG.STATUS_TYPE_EXPAND }
        )
    }

    const handleUpdateHeight = el => {
        const height = getComputedStyle(el).height
        contentMaxHeight.value = height
        if (height !== `${data.height}px`) {
            // only emit update if the height has actually changed
            emit('update-height', { id: data.id, height })
        }
    }

    const isHighlighted = computed(() => {
        return isHover.value || data.isHighlighted
    })

    // @todo → identical in useEntry and useSection
    const toggleTitle = computed(() => {
        return data.isExpanded ? 'hide this entry' : 'show this entry'
    })

    return {
        contentMaxHeight,
        handleToggle, // @todo → refactor to "isEntryHover"
        handleUpdateHeight,
        isHover, // @todo → refactor to "isEntryHover"
        isHighlighted, // @todo → refactor to "isEntryHighlighted"
        toggleTitle,
    }
}