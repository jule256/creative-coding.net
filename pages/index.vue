<template>
    <div class="content">
        <main class="main">
            this is pages/index.vue
        </main>
        <Sidebar class="sidebar" name="home"></Sidebar>
    </div>
</template>

<script setup>
const emit = defineEmits(['updateTitle']);
onMounted(() => {
    emit('updateTitle', 'home')
})
</script>
<style lang="postcss" scoped>
</style>