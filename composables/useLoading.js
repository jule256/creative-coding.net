export const useLoading = () => {

    const showLoadedContent = ref(false)

    const onLoadingComplete = () => {
        showLoadedContent.value = true
    }

    const compactLoadingConfig = {
        a: [
            { hidden: true },
            { hidden: true },
            { hidden: false },
            { hidden: false },
            { hidden: true },
            { hidden: true },
        ],
        b: [
            { hidden: true },
            { hidden: true },
            { hidden: false },
            { hidden: false },
            { hidden: false },
            { hidden: false },
            { hidden: true },
        ],
        c: [
            { hidden: true },
            { hidden: false },
            { hidden: false },
            { hidden: false },
            { hidden: false },
            { hidden: true },
        ],
        d: [
            { hidden: true },
            { hidden: false },
            { hidden: false },
            { hidden: false },
            { hidden: false },
            { hidden: false },
            { hidden: true },
        ],
        e: [
            { hidden: true },
            { hidden: false },
            { hidden: false },
            { hidden: false },
            { hidden: false },
            { hidden: true },
        ],
        f: [
            { hidden: true },
            { hidden: false },
            { hidden: false },
            { hidden: false },
            { hidden: false },
            { hidden: false },
            { hidden: true },
        ],
        g: [
            { hidden: true },
            { hidden: false },
            { hidden: false },
            { hidden: false },
            { hidden: false },
            { hidden: true },
        ],
        h: [
            { hidden: true },
            { hidden: true },
            { hidden: true },
            { hidden: false },
            { hidden: false },
            { hidden: true },
            { hidden: true },
        ],
        i: [
            { hidden: true },
            { hidden: true },
            { hidden: false },
            { hidden: false },
            { hidden: true },
            { hidden: true },
        ],
    }

    return {
        compactLoadingConfig,
        onLoadingComplete,
        showLoadedContent,
    }
}