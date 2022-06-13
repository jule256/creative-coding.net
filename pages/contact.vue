<template>
    <div class="content">
        <main class="main">
            <div class="contact">
                <h1>Julian Mollik</h1>
                <p>
                    <NuxtLink class="link3"
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
<style>
.content {
    display: flex;
    justify-content: space-between;
}

.main {
    width: 480px;
    min-height: 600px;
    background-color: #FFFFFF;
    border: solid #336600;
    border-width: 3px 3px 0 3px;
    padding: 25px 20px 20px 20px;

    position: relative;
}

.main::before,
.main::after {
    display: block;
    width: 130px;
    height: 18px;
    position: absolute;
    top: 0;
    right: 0;
    content: '';
    z-index: 1;
    background: linear-gradient(13deg, rgba(67, 114, 67, 0) 46%, rgba(67, 114, 67, 0.8477591720281863) 83%, rgba(67, 114, 67, 1) 100%);
    background-repeat: no-repeat;
    background-position: 30px;
}

.main::after {
    z-index: 2;
    background: repeating-linear-gradient(0deg,
            #FFFFFF,
            #FFFFFF 2px,
            rgba(0, 0, 0, 0) 2px,
            rgba(0, 0, 0, 0) 4px);
}

.contact {
    width: 240px;
    margin: 100px auto 0px auto;
    line-height: 13px;
}


.contact h1 {
    font-family: Verdana, Arial, SunSans-Regular, sans-serif;
    font-size: 10px;
    font-weight: bold;
}

.contact dl {
    display: flex;
    flex-flow: row wrap;
}

.contact dt {
    width: 110px;
}

.contact dd {
    text-align: right;
    flex-grow: 1;
    margin: 0;
}

.contact .link2 {
    color: #000000;
    text-decoration: underline;
}

.contact .link2:hover {
    text-decoration: none;
}

.contact .link3 {
    color: #000000;
    text-decoration: none;
}
</style>