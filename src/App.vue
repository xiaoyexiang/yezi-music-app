<template>
    <div id="app">
        <player></player>
        <tabNav></tabNav>
        <router-view></router-view>
    </div>
</template>
<script>
  import Player from '@/components/player/player.vue';
  import TabNav from '@/components/tabNav/tabNav.vue';

  export default {
    components: {
      Player,
      TabNav
    }
  }
</script>
<style lang="stylus">
</style>
