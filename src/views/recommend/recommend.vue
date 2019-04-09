<template>
    <div class="recommend-wrapper">
        <cube-scroll ref="scroll"
                     class="horizontal-scroll-list-wrap"
                     :data="songMenuTopList">
            <ul class="recommend-list">
                <li class="item border-bottom-1px" :key="index" v-for="(item, index) in songMenuTopList" @click.prevent.stop="jump('playlistDetail', item)">
                    <div class="cover-zone">
                        <img class="cover" v-lazy="item.coverImgUrl" alt="">
                    </div>
                    <div class="right-main">
                        <h3 class="name" v-html="item.name"></h3>
                        <p class="desc" v-html="item.description"></p>
                    </div>
                </li>
            </ul>
        </cube-scroll>
    </div>
</template>

<script>
  // @ is an alias to /src
  import requestServer from "@/javascript/requestServer.js";
  import {requestToplist} from "@/api/api.js";

  export default {
    name: "recommend",
    data() {
      return {
        songMenuTopList: [],
        currentSongUrl: '',
      }
    },
    methods: {
      getToplist() {
        requestToplist().then((res) => {
          if(parseInt(res.code) === 200) {
            console.log(res)

            this.songMenuTopList = res.list;

            // this.getPlaylistDetail(this.songMenuTopList[0].id);
          }
        })
      },
      getPlaylistDetail(id) {
        let _url = `/playlist/detail?id=${id}`
        requestServer.get(_url).then((res) => {
          if(parseInt(res.code) === 200) {
            console.log(res)
            this.getSongUrl(res.playlist.trackIds[0].id)
          }
        })
      },
      getSongUrl(id) {
        let _url = `/song/url?id=${id}`
        requestServer.get(_url).then((res) => {
          if(parseInt(res.code) === 200) {
            console.log(res)
            this.currentSongUrl = res.data[0].url;
          }
        })
      },
      jump(router, item) {
        if(router) {
          let params = {
            id: item.id
          }
          this.$router.push({
            name: router,
            params
          });
        }
      }
    },
    created() {
      this.getToplist();
    },
    components: {
    }
  };
</script>

<style lang="stylus" scoped>
    @import "./../../common/stylus/mixin.styl"

    .recommend-wrapper {
        position: fixed
        top: 88px
        bottom: 0
        left: 0
        right: 0
        margin: auto
    }
        .horizontal-scroll-list-wrap {
            position: relative
            height: 100%
        }
    .recommend-list {
        .item {
            padding: 10px 15px
            display: flex
            &::after {
                content: ''
                position: absolute
                left: 15px
                bottom: 0
                right: 0
                background-color: #f2f2f2
            }
            .cover-zone {
                padding-right: 12px
                .cover {
                    display: block
                    width: 70px
                    height: 70px
                    object-fit cover
                }
            }
            .right-main {
                flex: 1
                overflow: hidden
            }
            .name {
                display: block
                height: 30px
                line-height: 30px
                font-size: 16px
                font-weight: 500
                no-wrap()
            }
            .desc {
                display: block
                margin-top: 8px
                width: 100%
                height: 32px
                font-size: 12px
                line-height: 16px
                overflow: hidden
                word-wrap: break-word
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
        }
    }
</style>