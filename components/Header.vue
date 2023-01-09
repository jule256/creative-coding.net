<template>
    <header class="header">
        <transition name="loading">
            <h1 v-if="title !== ''" class="title">{{ title }}</h1>
        </transition>
    </header>
</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
        default: 'title of the page'
    }
})
</script>

<style lang="postcss" scoped>
.header {
    position: relative;
    width: 100%;
    height: 52px;
    background-color: var(--background-color);
    border: solid var(--border-color);
    border-width: 3px 3px 0 3px;
    padding: 3px;

    background: linear-gradient(13deg,
            var(--transparent-color) 40%,
            var(--gradient-color-light) 83%,
            var(--gradient-color-dark) 100%);

    @media only screen and (min-width: 700px) {
        width: 514px;
    }
}

.header::before,
.header::after {
    display: block;
    width: 100%;
    height: 58px;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    background-color: var(--background-color-content);
    z-index: -1;

    @media only screen and (min-width: 700px) {
        width: 520px;
    }
}

.header::after {
    z-index: 0;
    background: repeating-linear-gradient(0deg,
            var(--background-color-content),
            var(--background-color-content) 2px,
            var(--transparent-color) 2px,
            var(--transparent-color) 4px);
}

.title {
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    z-index: 1;
    position: absolute;
}
</style>