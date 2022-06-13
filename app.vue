<template>
  <div class="container" id="top">
    <Header :title="title" />
    <Navigation />
    <NuxtPage @updateTitle="setTitle" />
    <Footer />
  </div>
</template>
<script setup>
const title = ref('...')
const setTitle = newTitle => title.value = newTitle;
</script>