<template>
    <aside class="sidebar">
        <div v-if="isLoading" style="text-align: center; padding: 30px;">
            ... is loading ... @todo
        </div>
        <template v-else>
            <slot></slot>
        </template>
    </aside>
</template>
<script setup>
const props = defineProps({
    isLoading: {
        type: Boolean,
        default: false
    },
})
</script>