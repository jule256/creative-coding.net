<template>
    <header class="header">
        <h1 class="title">{{ title }}</h1>
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

<style>
.header {
    position: relative;
    width: 514px;
    height: 52px;
    background-color: var(--background-color);
    border: solid var(--border-color);
    border-width: 3px 3px 0 3px;
    padding: 3px;

    background: linear-gradient(13deg,
            var(--transparent-color) 40%,
            var(--gradient-color-light) 83%,
            var(--gradient-color-dark) 100%);
}

.header::before,
.header::after {
    display: block;
    width: 520px;
    height: 58px;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    background-color: var(--background-color);
    z-index: -1;
}

.header::after {
    z-index: 0;
    background: repeating-linear-gradient(0deg,
            var(--background-color),
            var(--background-color) 2px,
            var(--transparent-color) 2px,
            var(--transparent-color) 4px);
}

.title {
    margin: 0;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    z-index: 1;
    position: absolute;
}
</style>