<template>
    <div class="wrapper">
        <!--                                              -->
        <!--          __    __    __    __    __          -->
        <!--       __/a0\__/a1\__/a2\__/a3\__/a4\__       -->
        <!--      /b0\__/b1\__/b2\__/b3\__/b4\__/b5\      -->
        <!--      \__/c0\__/c1\__/c2\__/c3\__/c4\__/      -->
        <!--      /d0\__/d1\__/d2\__/d3\__/d4\__/d5\      -->
        <!--      \__/e0\__/e1\__/e2\__/e3\__/e4\__/      -->
        <!--      /f0\__/f1\__/f2\__/f3\__/f4\__/f5\      -->
        <!--      \__/g0\__/g1\__/g2\__/g3\__/g4\__/      -->
        <!--      /h0\__/h1\__/h2\__/h3\__/h4\__/h5\      -->
        <!--      \__/i0\__/i1\__/i2\__/i3\__/i4\__/      -->
        <!--         \__/  \__/  \__/  \__/  \__/         -->
        <!--                                              -->
        <div v-for="(row, letter) in isActive">
            <template v-for="(column, index) in isActive[letter]">
                <LoadingHexagon v-if="!column.hidden" :class="`${letter}${index}`"
                    :is-active="getStatus(`${letter}${index}`)" />
            </template>
        </div>
    </div>
</template>

<script setup>
const getStatus = position => {
    const row = position[0]
    const col = position[1]
    if (!isActive.value[row][col].hidden) {
        return isActive.value[row][col].active
    }
}

const toggleStatus = (row, col) => {
    if (!isActive.value[row][col].hidden) {
        isActive.value[row][col].active = !isActive.value[row][col].active
    }
}

const isActive = ref({
    a: [
        { active: false, hidden: true },
        { active: false, hidden: false },
        { active: false, hidden: false },
        { active: false, hidden: true },
        { active: false, hidden: false },
    ],
    b: [
        { active: false, hidden: true },
        { active: false, hidden: false },
        { active: false, hidden: false },
        { active: false, hidden: false },
        { active: false, hidden: false },
        { active: false, hidden: true },
    ],
    c: [
        { active: false, hidden: false },
        { active: false, hidden: false },
        { active: false, hidden: false },
        { active: false, hidden: false },
        { active: false, hidden: false },
    ],
    d: [
        { active: false, hidden: false },
        { active: false, hidden: false },
        { active: false, hidden: false },
        { active: false, hidden: false },
        { active: false, hidden: false },
        { active: false, hidden: true },
    ],
    e: [
        { active: false, hidden: false },
        { active: false, hidden: false },
        { active: false, hidden: false },
        { active: false, hidden: false },
        { active: false, hidden: false },
    ],
    f: [
        { active: false, hidden: false },
        { active: false, hidden: false },
        { active: false, hidden: false },
        { active: false, hidden: false },
        { active: false, hidden: false },
        { active: false, hidden: false },
    ],
    g: [
        { active: false, hidden: false },
        { active: false, hidden: false },
        { active: false, hidden: false },
        { active: false, hidden: false },
        { active: false, hidden: false },
    ],
    h: [
        { active: false, hidden: false },
        { active: false, hidden: false },
        { active: false, hidden: false },
        { active: false, hidden: false },
        { active: false, hidden: false },
        { active: false, hidden: false },
    ],
    i: [
        { active: false, hidden: true },
        { active: false, hidden: false },
        { active: false, hidden: true },
        { active: false, hidden: true },
        { active: false, hidden: false },
    ],
})

const rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
const colsOdd = ['0', '1', '2', '3', '4']
const colsEven = ['0', '1', '2', '3', '4', '5']
let rowIndex
let row
let col
const changesPerInterval = 4
let i
const interval = setInterval(() => {
    [...Array(changesPerInterval)].map(() => {
        rowIndex = Math.floor(Math.random() * rows.length)
        row = rows[rowIndex]
        col = rowIndex % 2 === 0 ? colsOdd[Math.floor(Math.random() * colsOdd.length)] : colsEven[Math.floor(Math.random() * colsEven.length)]
        toggleStatus(row, col)
    })
}, 500)

onUnmounted(() => {
    clearInterval(interval)
})

</script>

<style lang="postcss" scoped>
.wrapper {
    position: relative;
    height: 61px;
    width: 125px;
    margin: 50px auto 0;

    * {
        position: absolute;
    }

    .a0 {
        left: 11px;
    }

    .a1 {
        left: 33px;
    }

    .a2 {
        left: 55px;
    }

    .a3 {
        left: 77px;
    }

    .a4 {
        left: 99px;
    }

    .b0 {
        top: 6px;
        left: 0px;
    }

    .b1 {
        top: 6px;
        left: 22px;
    }

    .b2 {
        top: 6px;
        left: 44px;
    }

    .b3 {
        top: 6px;
        left: 66px;
    }

    .b4 {
        top: 6px;
        left: 88px;
    }

    .b5 {
        top: 6px;
        left: 110px;
    }

    .c0 {
        top: 12px;
        left: 11px;
    }

    .c1 {
        top: 12px;
        left: 33px;
    }

    .c2 {
        top: 12px;
        left: 55px;
    }

    .c3 {
        top: 12px;
        left: 77px;
    }

    .c4 {
        top: 12px;
        left: 99px;
    }

    .d0 {
        top: 18px;
        left: 0px;
    }

    .d1 {
        top: 18px;
        left: 22px;
    }

    .d2 {
        top: 18px;
        left: 44px;
    }

    .d3 {
        top: 18px;
        left: 66px;
    }

    .d4 {
        top: 18px;
        left: 88px;
    }

    .d5 {
        top: 18px;
        left: 110px;
    }

    .e0 {
        top: 24px;
        left: 11px;
    }

    .e1 {
        top: 24px;
        left: 33px;
    }

    .e2 {
        top: 24px;
        left: 55px;
    }

    .e3 {
        top: 24px;
        left: 77px;
    }

    .e4 {
        top: 24px;
        left: 99px;
    }

    .f0 {
        top: 30px;
        left: 0px;
    }

    .f1 {
        top: 30px;
        left: 22px;
    }

    .f2 {
        top: 30px;
        left: 44px;
    }

    .f3 {
        top: 30px;
        left: 66px;
    }

    .f4 {
        top: 30px;
        left: 88px;
    }

    .f5 {
        top: 30px;
        left: 110px;
    }

    .g0 {
        top: 36px;
        left: 11px;
    }

    .g1 {
        top: 36px;
        left: 33px;
    }

    .g2 {
        top: 36px;
        left: 55px;
    }

    .g3 {
        top: 36px;
        left: 77px;
    }

    .g4 {
        top: 36px;
        left: 99px;
    }

    .h0 {
        top: 42px;
        left: 0px;
    }

    .h1 {
        top: 42px;
        left: 22px;
    }

    .h2 {
        top: 42px;
        left: 44px;
    }

    .h3 {
        top: 42px;
        left: 66px;
    }

    .h4 {
        top: 42px;
        left: 88px;
    }

    .h5 {
        top: 42px;
        left: 110px;
    }

    .i0,
    .i1,
    .i2,
    .i3,
    .i4 {
        top: 48px;
    }

    .i0 {
        left: 11px;
    }

    .i1 {
        left: 33px;
    }

    .i2 {
        left: 55px;
    }

    .i3 {
        left: 77px;
    }

    .i4 {
        left: 99px;
    }
}

.row2 {
    margin-top: -2px;
}
</style>