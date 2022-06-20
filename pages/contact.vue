<template>
    <div class="content">
        <main class="main">
            <div class="contact">
                <h1>Julian Mollik</h1>
                <p>
                    <NuxtLink class="multiline"
                        to="https://www.google.ch/maps/search/saumackerstrasse+52+8048+Z%C3%BCrich+Switzerland/"
                        title="external link: Julian Mollik's address on Google Maps">
                        Saumackerstrasse 52<br>
                        8048 Zürich<br>
                        Switzerland
                    </NuxtLink>
                </p>
                <dl>
                    <dt>mobile phone (🇦🇹)</dt>
                    <dd>
                        <NuxtLink class="link2" to="tel:+43 650 5225202" title="call Julian Mollik">+43 650 5225202
                        </NuxtLink>
                    </dd>
                    <dt>mobile phone (🇨🇭)</dt>
                    <dd>
                        <NuxtLink class="link2" to="tel:+41 76 3888556" title="call Julian Mollik">+41 76
                            3888556</NuxtLink>
                    </dd>
                    <dt>email</dt>
                    <dd>
                        <NuxtLink class="link2" to="mailto:jule@creative-coding.net"
                            title="send email to Julian Mollik">jule@creative-coding.net</NuxtLink>
                    </dd>
                    <dt>Twitter</dt>
                    <dd>
                        <NuxtLink class="link2" to="https://twitter.com/jule2048"
                            title="external link: Twitter account of Julian Mollik">@jule2048</NuxtLink>
                    </dd>
                </dl>
            </div>
        </main>
    </div>
</template>

<script setup>
// @todo ➔ add badges (Nuxt, CSS, Javascript, HTML, ...)
const emit = defineEmits(['updateTitle']);
onMounted(() => {
    emit('updateTitle', 'contact')
})
</script>
<style lang="postcss" scoped>
.contact {
    width: 240px;
    margin: 100px auto 0px auto;

    h1 {
        margin-bottom: 10px;
    }

    dl {
        display: flex;
        flex-flow: row wrap;

        dt {
            width: 110px;
        }

        dd {
            text-align: right;
            flex-grow: 1;
            margin: 0;
        }
    }
}
</style>