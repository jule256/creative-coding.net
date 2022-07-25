<template>
    <aside class="sidebar">
        <transition name="loading" @after-leave="onLoadingComplete">
            <Loading class="loading" v-if="isLoading" loading-text="" :config="compactLoadingConfig" />
        </transition>
        <transition name="loading">
            <div v-if="showLoadedContent">
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
})

const {
    compactLoadingConfig,
    onLoadingComplete,
    showLoadedContent,
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