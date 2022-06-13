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
