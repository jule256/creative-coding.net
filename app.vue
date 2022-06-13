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
<style>
body {
  background-image: url("~/assets/hexagon_08.svg");
  background-color: #333333
}

.container {
  margin: 40px auto 0px auto;
  width: 740px;

  font-family: Verdana, Arial, SunSans-Regular, sans-serif;
  font-size: 10px;
}
</style>