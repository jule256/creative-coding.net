<template>
    <aside class="sidebar">
        <transition name="loading">
            <Loading class="loading" v-if="isLoading" loading-text="" :config="compactLoadingConfig" />
        </transition>
        <transition name="loading">
            <div v-if="showContent">
                <template>
                    <slot></slot>
                </template>
            </div>
        </transition>
    </aside>
</template>
<script setup>
const props = defineProps({
    isLoading: {
        type: Boolean,
        default: false
    },
    showContent: {
        type: Boolean,
        default: false
    },
})

const {
    compactLoadingConfig,
} = useLoading()

</script>
<style lang="postcss" scoped>
template {
    display: block;
}

.loading {
    position: absolute;
    left: 25px;
}
</style>