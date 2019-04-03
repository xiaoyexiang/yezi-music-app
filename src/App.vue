<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <player></player>
    <router-view />
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
