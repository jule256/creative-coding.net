<template>
    <div class="wrapper">
        <!--                                                    -->
        <!--          __    __    __    __    __    __          -->
        <!--       __/a0\__/a1\__/a2\__/a3\__/a4\__/a5\__       -->
        <!--      /b0\__/b1\__/b2\__/b3\__/b4\__/b5\__/b6\      -->
        <!--      \__/c0\__/c1\__/c2\__/c3\__/c4\__/c5\__/      -->
        <!--      /d0\__/d1\__/d2\__/d3\__/d4\__/d5\__/d6\      -->
        <!--      \__/e0\__/e1\__/e2\__/e3\__/e4\__/e5\__/      -->
        <!--      /f0\__/f1\__/f2\__/f3\__/f4\__/f5\__/f6\      -->
        <!--      \__/g0\__/g1\__/g2\__/g3\__/g4\__/g6\__/      -->
        <!--      /h0\__/h1\__/h2\__/h3\__/h4\__/h5\__/h6\      -->
        <!--      \__/i0\__/i1\__/i2\__/i3\__/i4\__/i5\__/      -->
        <!--         \__/  \__/  \__/  \__/  \__/  \__/         -->
        <!--                                                    -->
        <div v-for="(row, letter) in isActive">
            <template v-for="(column, index) in isActive[letter]">
                <LoadingHexagon v-if="!column.hidden" :class="`${letter}${index}`" :is-active="getStatus(letter, index)"
                    :is-text="loadingHexagons.includes(`${letter}${index}`)" />
                <div v-if="`${LOADING_ROW}0` == `${letter}${index}`" class="loading" :class="`${letter}${index}`">
                    <div v-for="letter in loadingTextArray">{{ letter }}</div>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
const LOADING_ROW = 'd' // the row where the "loadingText" will appear
const UPDATE_FREQUENCY = 500 // frequency between hexagon updates
const UPDATES_PER_INTERVAL = 4 // number of hexagon updates per UPDATE_FREQUENCY milliseconds

const props = defineProps({
    loadingText: {
        type: String,
        default: 'loading',
    },
    config: {
        type: Object,
        default: () => ({
            a: [
                { hidden: true },
                { hidden: false },
                { hidden: false },
                { hidden: false },
                { hidden: true },
                { hidden: false },
            ],
            b: [
                { hidden: true },
                { hidden: false },
                { hidden: false },
                { hidden: false },
                { hidden: false },
                { hidden: false },
                { hidden: true },
            ],
            c: [
                { hidden: false },
                { hidden: false },
                { hidden: false },
                { hidden: false },
                { hidden: false },
                { hidden: false },
            ],
            d: [
                { hidden: false },
                { hidden: false },
                { hidden: false },
                { hidden: false },
                { hidden: false },
                { hidden: false },
                { hidden: false },
            ],
            e: [
                { hidden: false },
                { hidden: false },
                { hidden: false },
                { hidden: false },
                { hidden: false },
                { hidden: false },
            ],
            f: [
                { hidden: false },
                { hidden: false },
                { hidden: false },
                { hidden: false },
                { hidden: false },
                { hidden: false },
                { hidden: false },
            ],
            g: [
                { hidden: false },
                { hidden: false },
                { hidden: false },
                { hidden: false },
                { hidden: false },
                { hidden: false },
            ],
            h: [
                { hidden: false },
                { hidden: false },
                { hidden: false },
                { hidden: false },
                { hidden: false },
                { hidden: false },
                { hidden: false },
            ],
            i: [
                { hidden: true },
                { hidden: false },
                { hidden: true },
                { hidden: false },
                { hidden: true },
                { hidden: true },
            ],
        }),
    },
})

const sanitizeLoadingText = (loadingText, isActive) => {
    const loadingTextWithBlanks = loadingText
        .split('')
        .map((letter, index) => index < isActive[LOADING_ROW].length && isActive[LOADING_ROW][index].hidden ? ' ' : letter)
        .join('')

    if (loadingText !== loadingTextWithBlanks) {
        console.warn(`Loading.vue disabled one or more characters due to hidden hexagons from '${loadingText}' to '${loadingTextWithBlanks}'`)
    }

    if (loadingTextWithBlanks.length > isActive[LOADING_ROW].length) {
        const truncatedLoadingText = loadingTextWithBlanks.substr(0, isActive[LOADING_ROW].length)
        console.warn(`Loading.vue truncated loadingText from '${loadingTextWithBlanks}' to '${truncatedLoadingText}'`)
        return truncatedLoadingText
    }
    return loadingTextWithBlanks
}

const loadingTextArray = computed(() => {
    const maxLength = isActive.value[LOADING_ROW].length
    const loadingText = sanitizeLoadingText(props.loadingText, isActive.value)
    const prefix = Math.floor((maxLength - loadingText.length) / 2)
    const suffix = Math.ceil((maxLength - loadingText.length) / 2)
    return [...`${' '.repeat(prefix)}${loadingText}${' '.repeat(suffix)}`]
})

const loadingHexagons = computed(() => {
    const loadingTextLength = sanitizeLoadingText(props.loadingText, isActive.value).length
    const prefix = Math.floor((isActive.value[LOADING_ROW].length - loadingTextLength) / 2)
    const suffix = Math.ceil((isActive.value[LOADING_ROW].length - loadingTextLength) / 2)
    return Array.from({ length: isActive.value[LOADING_ROW].length }, (_, index) => `${LOADING_ROW}${index}`)
        .filter((_, index, array) => index >= prefix && index < array.length - suffix)
})

const getStatus = (row, col) => isActive.value[row][col].hidden ? false : isActive.value[row][col].active

const toggleStatus = (row, col) => {
    isActive.value[row][col].active = isActive.value[row][col].hidden ? false : !isActive.value[row][col].active
}

const isActive = ref({
    a: [
        { active: false, hidden: props.config.a[0].hidden },
        { active: false, hidden: props.config.a[1].hidden },
        { active: false, hidden: props.config.a[2].hidden },
        { active: false, hidden: props.config.a[3].hidden },
        { active: false, hidden: props.config.a[4].hidden },
        { active: false, hidden: props.config.a[5].hidden },
    ],
    b: [
        { active: false, hidden: props.config.b[0].hidden },
        { active: false, hidden: props.config.b[1].hidden },
        { active: false, hidden: props.config.b[2].hidden },
        { active: false, hidden: props.config.b[3].hidden },
        { active: false, hidden: props.config.b[4].hidden },
        { active: false, hidden: props.config.b[5].hidden },
        { active: false, hidden: props.config.b[6].hidden },
    ],
    c: [
        { active: false, hidden: props.config.c[0].hidden },
        { active: false, hidden: props.config.c[1].hidden },
        { active: false, hidden: props.config.c[2].hidden },
        { active: false, hidden: props.config.c[3].hidden },
        { active: false, hidden: props.config.c[4].hidden },
        { active: false, hidden: props.config.c[5].hidden },
    ],
    d: [
        { active: false, hidden: props.config.d[0].hidden },
        { active: false, hidden: props.config.d[1].hidden },
        { active: false, hidden: props.config.d[2].hidden },
        { active: false, hidden: props.config.d[3].hidden },
        { active: false, hidden: props.config.d[4].hidden },
        { active: false, hidden: props.config.d[5].hidden },
        { active: false, hidden: props.config.d[6].hidden },
    ],
    e: [
        { active: false, hidden: props.config.e[0].hidden },
        { active: false, hidden: props.config.e[1].hidden },
        { active: false, hidden: props.config.e[2].hidden },
        { active: false, hidden: props.config.e[3].hidden },
        { active: false, hidden: props.config.e[4].hidden },
        { active: false, hidden: props.config.e[5].hidden },
    ],
    f: [
        { active: false, hidden: props.config.f[0].hidden },
        { active: false, hidden: props.config.f[1].hidden },
        { active: false, hidden: props.config.f[2].hidden },
        { active: false, hidden: props.config.f[3].hidden },
        { active: false, hidden: props.config.f[4].hidden },
        { active: false, hidden: props.config.f[5].hidden },
        { active: false, hidden: props.config.f[6].hidden },
    ],
    g: [
        { active: false, hidden: props.config.g[0].hidden },
        { active: false, hidden: props.config.g[1].hidden },
        { active: false, hidden: props.config.g[2].hidden },
        { active: false, hidden: props.config.g[3].hidden },
        { active: false, hidden: props.config.g[4].hidden },
        { active: false, hidden: props.config.g[5].hidden },
    ],
    h: [
        { active: false, hidden: props.config.h[0].hidden },
        { active: false, hidden: props.config.h[1].hidden },
        { active: false, hidden: props.config.h[2].hidden },
        { active: false, hidden: props.config.h[3].hidden },
        { active: false, hidden: props.config.h[4].hidden },
        { active: false, hidden: props.config.h[5].hidden },
        { active: false, hidden: props.config.h[6].hidden },
    ],
    i: [
        { active: false, hidden: props.config.i[0].hidden },
        { active: false, hidden: props.config.i[1].hidden },
        { active: false, hidden: props.config.i[2].hidden },
        { active: false, hidden: props.config.i[3].hidden },
        { active: false, hidden: props.config.i[4].hidden },
        { active: false, hidden: props.config.i[5].hidden },
    ],
})

const rows = computed(() => Object.keys(isActive.value))
const colsOdd = computed(() => [...Array(isActive.value[Object.keys(isActive.value)[0]].length).keys()])
const colsEven = computed(() => [...Array(isActive.value[Object.keys(isActive.value)[1]].length).keys()])
let rowIndex, row, col, hexagon
const interval = setInterval(() => {
    [...Array(UPDATES_PER_INTERVAL)].map(() => {
        // random hexagon toggling (may also unset a "loading" hexagon):
        rowIndex = Math.floor(Math.random() * rows.value.length)
        row = rows.value[rowIndex]
        col = rowIndex % 2 === 0 ?
            colsOdd.value[Math.floor(Math.random() * colsOdd.value.length)] :
            colsEven.value[Math.floor(Math.random() * colsEven.value.length)]
        toggleStatus(row, col)
        // random "loading" hexagon toggling (if loading text exists):
        if (loadingHexagons.value.length) {
            hexagon = loadingHexagons.value[Math.floor(Math.random() * loadingHexagons.value.length)]
            toggleStatus(hexagon[0], hexagon[1])
        }
    })
}, UPDATE_FREQUENCY)

onUnmounted(() => {
    clearInterval(interval)
})
</script>

<style lang="postcss" scoped>
/* @todo ➔ make position configurabe using CSS variables */
.wrapper {
    position: relative;
    height: 61px;
    width: 147px;
    margin: 50px auto 0;

    * {
        position: absolute;
    }

    .a0,
    .a1,
    .a2,
    .a3,
    .a4,
    .a5 {
        top: 0;
    }

    .a0,
    .c0,
    .e0,
    .g0,
    .i0 {
        left: 11px;
    }

    .a1,
    .c1,
    .e1,
    .g1,
    .i1 {
        left: 33px;
    }

    .a2,
    .c2,
    .e2,
    .g2,
    .i2 {
        left: 55px;
    }

    .a3,
    .c3,
    .e3,
    .g3,
    .i3 {
        left: 77px;
    }

    .a4,
    .c4,
    .e4,
    .g4,
    .i4 {
        left: 99px;
    }

    .a5,
    .c5,
    .e5,
    .g5,
    .i5 {
        left: 121px;
    }

    .b0,
    .b1,
    .b2,
    .b3,
    .b4,
    .b5,
    .b6 {
        top: 6px;
    }

    .b0,
    .d0,
    .f0,
    .h0 {
        left: 0px;
    }

    .b1,
    .d1,
    .f1,
    .h1 {
        left: 22px;
    }

    .b2,
    .d2,
    .f2,
    .h2 {
        left: 44px;
    }

    .b3,
    .d3,
    .f3,
    .h3 {
        left: 66px;
    }

    .b4,
    .d4,
    .f4,
    .h4 {
        left: 88px;
    }

    .b5,
    .d5,
    .f5,
    .h5 {
        left: 110px;
    }

    .b6,
    .d6,
    .f6,
    .h6 {
        left: 132px;
    }

    .c0,
    .c1,
    .c2,
    .c3,
    .c4,
    .c5 {
        top: 12px;
    }

    .d0,
    .d1,
    .d2,
    .d3,
    .d4,
    .d5,
    .d6 {
        top: 18px;
    }

    .e0,
    .e1,
    .e2,
    .e3,
    .e4,
    .e5 {
        top: 24px;
    }

    .f0,
    .f1,
    .f2,
    .f3,
    .f4,
    .f5,
    .f6 {
        top: 30px;
    }

    .g0,
    .g1,
    .g2,
    .g3,
    .g4,
    .g5 {
        top: 36px;
    }

    .h0,
    .h1,
    .h2,
    .h3,
    .h4,
    .h5,
    .h6 {
        top: 42px;
    }

    .i0,
    .i1,
    .i2,
    .i3,
    .i4,
    .i5 {
        top: 48px;
    }

    .loading {
        width: 147px;
        height: 13px;
        display: flex;
        justify-content: space-between;
        text-transform: uppercase;
        z-index: 1;
        left: 0;

        div {
            width: 14px;
            position: unset;
            text-align: center;
            color: var(--loading-color-base);
        }
    }
}
</style>