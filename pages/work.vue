<template>
    <div class="content">
        <main class="main">
            this is pages/work.vue
        </main>
        <Sidebar class="sidebar" name="work"></Sidebar>
    </div>
</template>

<script setup>
const emit = defineEmits(['updateTitle']);
onMounted(() => {
    emit('updateTitle', 'work')
})
</script>
<style lang="postcss" scoped>
</style>