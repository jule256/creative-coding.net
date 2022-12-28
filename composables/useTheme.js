export const useTheme = () => {

    const preferredTheme = useCookie('preferredTheme')
    const themeKey = ref('default')

    const userPrefersDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches

    const changeTheme = name => {
        if (name === 'auto') {
            preferredTheme.value = null
            themeKey.value = userPrefersDark() ? 'dark' : 'default'
        } else {
            themeKey.value = name
            preferredTheme.value = name
        }
    }

    onMounted(() => {
        if (preferredTheme.value) {
            themeKey.value = preferredTheme.value
        } else {
            themeKey.value = userPrefersDark() ? 'dark' : 'default'
        }

        window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', ({ matches }) => {
                if (!preferredTheme.value) {
                    if (matches) {
                        themeKey.value = 'dark'
                    } else {
                        themeKey.value = 'default'
                    }
                }
            })
    })

    return {
        changeTheme,
        preferredTheme,
        themeKey
    }
}