<template>
    <div class="content">
        <main class="main">
            this is pages/work.vue
        </main>
        <Sidebar class="sidebar" name="home"></Sidebar>
    </div>
</template>

<script setup>
const emit = defineEmits(['updateTitle']);
onMounted(() => {
    emit('updateTitle', 'work')
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

.sidebar {
    position: relative;
    width: 180px;
    border: 3px solid #336600;
    background-color: #FFFFFF;
    padding: 25px 10px 10px 10px;
}

.sidebar::before,
.sidebar::after {
    display: block;
    width: 200px;
    height: 18px;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    z-index: 1;
    background: linear-gradient(13deg, rgba(67, 114, 67, 0) -40%, rgba(67, 114, 67, .848) 53%, #437243);
    background-repeat: no-repeat;
}

.sidebar::after {
    z-index: 2;
    background: repeating-linear-gradient(0deg,
            #FFFFFF,
            #FFFFFF 2px,
            rgba(0, 0, 0, 0) 2px,
            rgba(0, 0, 0, 0) 4px);
}
</style>