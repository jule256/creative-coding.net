<template>
    <nav class="navigation">
        <ul>
            <li v-for="entry in entries">
                <NuxtLink :to="entry.to" class="entry">{{ entry.title['en'] }}</NuxtLink>
            </li>
        </ul>
    </nav>
</template>
<script setup>
const entries = ref([
    {
        title: {
            en: 'home'
        },
        to: '/'
    },
    {
        title: {
            en: 'work'
        },
        to: 'work'
    },
    {
        title: {
            en: 'cv'
        },
        to: 'cv'
    },
    {
        title: {
            en: 'contact'
        },
        to: 'contact'
    },
])

</script>

<style>
.navigation {
    width: 520px;
    height: 30px;

    background-color: #FFFFFF;
    border: solid #336600;
    border-width: 3px 3px 0 3px;
}

.navigation ul {
    display: flex;
    list-style-type: none;
    /* @todo ➔ reset */
    padding: 0;
    margin: 0;
}

.navigation ul li {
    width: 25%;
    height: 30px;
    border-right: 3px solid #336600;
}

.navigation ul li:last-of-type {
    border-right: 0;
}

.entry {
    display: block;
    height: 30px;
    text-align: center;
    line-height: 30px;
    text-decoration: none;
    color: #000000;
    font-weight: bold;
    font-size: 13px;
}

.entry:hover {
    background-color: #EEEEEE;
}
</style>