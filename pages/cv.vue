<template>
    <div class="content">
        <main class="main">
            this is pages/cv.vue
        </main>
        <Sidebar class="sidebar" name="cv"></Sidebar>
    </div>
</template>

<script setup>
const emit = defineEmits(['updateTitle']);
onMounted(() => {
    emit('updateTitle', 'curriculum vitae')
})
</script>
<style lang="postcss" scoped>
</style>