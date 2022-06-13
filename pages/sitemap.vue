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
</style>