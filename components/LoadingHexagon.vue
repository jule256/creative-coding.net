<template>
    <svg viewBox="452.152 243.375 15.746 13.234" width="15.746" height="13.234" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M 389.215 203.482 L 395.329 207.117 L 395.329 214.386 L 389.215 218.02 L 383.101 214.386 L 383.101 207.117 Z"
            class="hexagon" :class="activeClass" transform="matrix(0, 1, -1, 0, 670.783264, -139.215012)" />
    </svg>
</template>

<script setup>
const props = defineProps({
    isActive: {
        type: Boolean,
        default: false,
    },
    isText: {
        type: Boolean,
        default: false,
    }
})

const activeClass = computed(() => {
    return props.isActive ? `is-active-${activeClassIndex.value}` : ''
})

let activeClassIndex = ref(1)

watch(() => props.isActive, newValue => {
    if (newValue) {
        activeClassIndex.value = props.isText ? 'text' : Math.floor(Math.random() * 4)
    }
})

</script>


<style lang="postcss" scoped>
.hexagon {
    transition: fill 1500ms ease;

    stroke: var(--loading-color-line);
    fill: var(--loading-color-base);

    &.is-active-1 {
        fill: var(--loading-color-active-1);
    }

    &.is-active-2 {
        fill: var(--loading-color-active-2);
    }

    &.is-active-3 {
        fill: var(--loading-color-active-3);
    }

    &.is-active-4 {
        fill: var(--loading-color-active-4);
    }

    &.is-active-text {
        fill: var(--loading-color-active-text);
    }
}
</style>