<template>
    <div id="app">
        <y-header></y-header>
        <tab-nav></tab-nav>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <player></player>
    </div>
</template>
<script>
  import Player from '@/components/player/player.vue';
  import TabNav from '@/components/tabNav/tabNav.vue';
  import YHeader from '@/components/yHeader/yHeader.vue';

  export default {
    components: {
      Player,
      TabNav,
      YHeader
    }
  }
</script>
<style lang="stylus">
</style>
