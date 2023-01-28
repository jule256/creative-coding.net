<template>
    <div class="entry">
        <h1>{{ headline }}</h1>
        <div>
            [
            <NuxtLink @mouseover="handleMouseEnter" @mouseleave="handleMouseLeave" @click="handleGoTo">go to</NuxtLink>
            ]
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    headline: {
        type: String,
        default: '...'
    },
    id: {
        type: Number,
        default: 0
    }
})

const emit = defineEmits(['goTo', 'mouseEnter', 'mouseLeave']);

const handleGoTo = () => {
    emit('goTo', props.id)
}

const handleMouseEnter = () => {
    emit('mouseEnter', props.id)
}

const handleMouseLeave = () => {
    emit('mouseLeave', props.id)
}
</script>

<style lang="postcss" scoped>
.entry {
    display: grid;
    grid-template-columns: 130px 42px;
    gap: 0 10px;
    padding: 0;
    margin: 0 0 10px 0;
}
</style>