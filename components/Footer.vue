<template>
    <footer class="footer">
        <div class="content">
            <div class="copyright">
                &copy; Julian Mollik {{ new Date().getFullYear() }}, <NuxtLink
                    title="external link: view this website's project on GitHub" to="/version-history">v{{ version }}
                </NuxtLink>
            </div>
            <transition name="loading">
                <div v-if="scrollY > 0">
                    <NuxtLink class="emphasized" @click="scrollToTop">top</NuxtLink>
                </div>
            </transition>
            <div>
                <NuxtLink to="/sitemap" class="emphasized">sitemap</NuxtLink>
            </div>
        </div>
    </footer>
</template>

<script setup>
import useDebouncedRef from '../composables/useDebouncedRef'
const config = useRuntimeConfig()

const HEADER_OFFSET_TOP = 40

const scrollY = useDebouncedRef(0, 1000)

const scrollHandler = () => {
    scrollY.value = window.scrollY - HEADER_OFFSET_TOP
}

const version = computed(() => {
    return config.public.VERSION
})

onMounted(() => {
    addEventListener('scroll', scrollHandler)
})

onUnmounted(() => {
    removeEventListener('scroll', scrollHandler)
})

const scrollToTop = () => {
    window.scrollTo(0, 0);
}
</script>


<style lang="postcss" scoped>
.footer {
    position: relative;
    width: calc(100% - 34px);
    height: 28px;
    border: 3px solid var(--border-color);
    border-width: 0 3px 3px 3px;
    background-color: var(--background-color-content);
    padding: 0 20px 0 20px;

    @media only screen and (min-width: 700px) {
        width: 480px;
    }

    &::before,
    &::after {
        display: block;
        width: 90px;
        height: 28px;
        position: absolute;
        top: 0;
        left: 0;
        content: '';
        z-index: 1;
        background: linear-gradient(193deg,
                var(--transparent-color) 46%,
                var(--gradient-color-light) 83%,
                var(--gradient-color-dark) 100%);
        background-repeat: no-repeat;
    }

    &::after {
        z-index: 2;
        background: repeating-linear-gradient(0deg,
                var(--background-color-content),
                var(--background-color-content) 2px,
                var(--transparent-color) 2px,
                var(--transparent-color) 4px);
    }

    .content {
        position: absolute;
        width: calc(100% - 80px);
        left: 80px;
        top: 3px;
        z-index: 3;
        display: flex;
        justify-content: space-between;

        .copyright,
        .emphasized {
            height: 25px;
            line-height: 28px;
        }

        .emphasized {
            display: block;
            padding: 0 20px 0 20px;
        }
    }
}
</style>