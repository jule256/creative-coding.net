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

    background-color: #FFFFFF;
    border: solid #336600;
    border-width: 3px 3px 0 3px;
    padding: 3px;

    background: linear-gradient(13deg, rgba(67, 114, 67, 0) 40%, rgba(67, 114, 67, 0.8477591720281863) 83%, rgba(67, 114, 67, 1) 100%);
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
    background-color: #FFFFFF;
    z-index: -1;
}

.header::after {
    z-index: 0;
    background: repeating-linear-gradient(0deg,
            #FFFFFF,
            #FFFFFF 2px,
            rgba(0, 0, 0, 0) 2px,
            rgba(0, 0, 0, 0) 4px);
}

.title {
    margin: 0;
    font-family: Verdana, Arial, SunSans-Regular, sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    z-index: 1;
    position: absolute;
}
</style>