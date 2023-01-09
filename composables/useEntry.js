import { ENTRY_CONFIG } from '../config/config.js'
import { isTouchDevice } from '../helpers/helpers'

export const useEntry = (data, emit) => {

    const isHover = ref(false)

    const maxHeight = ref(`${data.height ? data.height + 'px' : 'none'}`)

    const handleToggle = () => {
        isTouchDevice() ? isHover.value = false : null
        emit(
            'status-change',
            { id: data.id, type: data.isExpanded ? ENTRY_CONFIG.STATUS_TYPE_COLLAPSE : ENTRY_CONFIG.STATUS_TYPE_EXPAND }
        )
    }

    const handleUpdateHeight = el => {
        const height = getComputedStyle(el).height
        maxHeight.value = height
        if (height !== `${data.height}px`) {
            // only emit update if the height has actually changed
            emit('update-height', { id: data.id, height })
        }
    }

    const isHighlighted = computed(() => {
        return isHover.value || data.isHighlighted
    })

    const toggleTitle = computed(() => {
        return data.isExpanded ? 'hide this entry' : 'show this entry'
    })

    return {
        maxHeight,
        handleToggle,
        handleUpdateHeight,
        isHover,
        isHighlighted,
        toggleTitle,
    }
}