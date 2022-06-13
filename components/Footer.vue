<template>
    <footer class="footer">
        <div class="content">
            <div class="copyright">
                &copy; Julian Mollik {{ new Date().getFullYear() }}
            </div>
            <div>
                <NuxtLink class="emphasized" @click="scrollToTop">top</NuxtLink>
            </div>
            <div>
                <NuxtLink to="sitemap" class="emphasized">sitemap</NuxtLink>
            </div>
        </div>
    </footer>
</template>

<script setup>
const scrollToTop = () => {
    // @todo ➔ only show "top" if top-of-page is not visible
    window.scrollTo(0, 0);
}
</script>


<style lang="postcss" scoped>
.footer {
    position: relative;
    width: 480px;
    height: 28px;
    border: 3px solid #336600;
    border-width: 0 3px 3px 3px;
    background-color: #FFFFFF;
    padding: 0px 20px 0px 20px;

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
        background: linear-gradient(193deg, rgba(67, 114, 67, 0) 46%, rgba(67, 114, 67, 0.8477591720281863) 83%, rgba(67, 114, 67, 1) 100%);
        background-repeat: no-repeat;
    }

    &::after {
        z-index: 2;
        background: repeating-linear-gradient(0deg,
                #FFFFFF,
                #FFFFFF 2px,
                rgba(0, 0, 0, 0) 2px,
                rgba(0, 0, 0, 0) 4px);
    }

    .content {
        position: absolute;
        width: 440px;
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