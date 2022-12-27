<template>
    <nav class="navigation">
        <ul>
            <li v-for="page in mainNavigationPages">
                <!-- @todo ➔ check if class .entry exists and if it needs to be refactored to .page -->
                <NuxtLink :to="page.to" class="entry">{{ page.title.navigation['en'] }}
                </NuxtLink>
            </li>
        </ul>
    </nav>
</template>
<script setup>
import { PAGES } from '../config/pages'

const mainNavigationPages = computed(() => {
    return PAGES.filter(page => page.mainNavigation === true)
})

</script>

<style lang="postcss" scoped>
.navigation {
    width: 520px;
    height: 30px;

    background-color: var(--background-color-content);
    border: solid var(--border-color);
    border-width: 3px 3px 0 3px;

    ul {
        display: flex;

        li {
            width: 25%;
            height: 30px;
            border-right: 3px solid var(--border-color);

            &:last-of-type {
                border-right: 0;
            }
        }
    }
}

.entry {
    display: block;
    height: 30px;
    text-align: center;
    line-height: 30px;
    text-decoration: none;
    color: var(--font-color);
    font-weight: bold;
    font-size: 13px;

    transition: background-color var(--mouseover-transition-duration) ease-in;

    &:hover {
        background-color: var(--hover-color);
    }
}
</style>