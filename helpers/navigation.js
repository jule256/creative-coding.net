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
})