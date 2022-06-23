export const useEntry = (data, emit) => {

    const isHover = ref(false);

    // estimate a max-height for the first toggle (should be higher, but now lower, than the measured height)
    const contentMaxHeight = ref(`${data.height}px`)

    const handleToggle = () => {
        emit(
            'status-change',
            { id: data.id, type: data.isExpanded ? 'collapse' : 'expand' }
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

    const toggleTitle = computed(() => {
        return data.isExpanded ? 'hide this entry' : 'show this entry'
    })

    return {
        contentMaxHeight,
        handleToggle,
        handleUpdateHeight,
        isHover,
        isHighlighted,
        toggleTitle,
    }
}