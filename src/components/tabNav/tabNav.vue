<template>
    <div class="tab-nav-wrap">
        <ul class="tab-list">
            <router-link class="item" tag="li" :to="tab.to" :key="index" v-for="(tab, index) in tabs">
                <span>{{tab.label}}</span>
            </router-link>
        </ul>
    </div>
</template>
<script>
  export default {
    computed: {},
    data() {
      return {
        current: '推荐',
        tabs: [
          {
            to: '/recommend',
            label: '推荐'
          },
          {
            to: '/singer',
            label: '歌手'
          },
          {
            to: '/mine',
            label: '我的'
          }
        ]
      }
    },
    methods: {},
    created() {
    },
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
    .tab-nav-wrap {
        position: relative
        width: 100%
        .tab-list {
            display: flex
            align-items: center
            justify-content: center
            box-shadow: 0 2px 3px rgba(0, 0, 0, .2);
            background-color: rgba(249, 249, 249, .6);
            background-image: linear-gradient(to bottom, rgba(249, 249, 249, .8), rgba(235, 235, 235, .8));
            .item {
                flex: 1
                height: 44px
                display: flex
                align-items: center
                justify-content: center
                overflow: hidden
                font-size: 14px
                color: #4a4a4a
                font-weight: 500
                &.router-link-active {
                    position: relative
                    color: #48b300
                    box-shadow: inset 0 -2px 0 #48b300;

                }
            }
        }
    }
</style>