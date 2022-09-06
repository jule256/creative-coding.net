let state = ref({
    home: [],
    work: [],
    cv: [],
    contact: [],
})

export const navigationState = reactive({
    update(type, value) {
        if (Array.isArray(value)) {
            state.value[type] = value
        }
    },
    get(type) {
        return state.value[type]
    },
    buildTo(entry) {
        const parameters = state.value[entry.id].length === 0 ? '' : `/${state.value[entry.id].join('/')}`
        return `${entry.to}${parameters}`
    }
})