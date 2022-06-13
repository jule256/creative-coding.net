<template>
    <div class="content">
        <main class="main">
            this is pages/sitemap.vue
        </main>
    </div>
</template>

<script setup>
const emit = defineEmits(['updateTitle']);
onMounted(() => {
    emit('updateTitle', 'sitemap')
})
</script>
<style>
.content {
    display: flex;
    justify-content: space-between;
}

.main {
    width: 480px;
    min-height: 600px;
    background-color: #FFFFFF;
    border: solid #336600;
    border-width: 3px 3px 0 3px;
    padding: 25px 20px 20px 20px;
}

.main::before,
.main::after {
    display: block;
    width: 130px;
    height: 18px;
    position: absolute;
    top: 0;
    right: 0;
    content: '';
    z-index: 1;
    background: linear-gradient(13deg, rgba(67, 114, 67, 0) 46%, rgba(67, 114, 67, 0.8477591720281863) 83%, rgba(67, 114, 67, 1) 100%);
    background-repeat: no-repeat;
    background-position: 30px;
}

.main::after {
    z-index: 2;
    background: repeating-linear-gradient(0deg,
            #FFFFFF,
            #FFFFFF 2px,
            rgba(0, 0, 0, 0) 2px,
            rgba(0, 0, 0, 0) 4px);
}
</style>