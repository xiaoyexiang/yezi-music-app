<template>
  <div id="app">
    <player></player>
    <router-view></router-view>
  </div>
</template>
<script>
    import Player from '@/components/player/player.vue';

    export default {
        components: {
            Player,
        }
    }
</script>
<style lang="stylus">
</style>
