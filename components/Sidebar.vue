<template>
    <aside class="sidebar">
        this is the sidebar "{{ name }}"
    </aside>
</template>
<script setup>
const props = defineProps({
    name: {
        type: String,
        default: 'none'
    }
})
</script>
<style>
.sidebar {
    width: 180px;

    background-color: lightseagreen
}
</style>
