<template>
    <transition appear name="slide">
        <div class="page-container">
            <div class="back" @click.prevent.stop="goBack()">
                <i class="icon iconfont icon-xiangzuojiantou"></i>
            </div>
            <h2 class="title">推荐</h2>
            <div id="pylist-header-wrap" ref="pylistHeaderWrap">
                <section class="pylist-header">
                    <div class="bg-image" :style="bgStyle"></div>
                    <div class="plhead_wrap">
                        <div class="plhead_fl">
                            <img class="u-img" v-lazy="bgImageUrl">
                            <span class="lsthd_icon">歌单</span>
                            <span class="lsthd_num">
                                <i class="icon iconfont icon-erjieps"></i> {{handleCount(playlist && playlist.playCount)}}
                            </span>
                        </div>
                        <div class="plhead_fr">
                            <h2 class="lsthd_title">{{playlist.name}}</h2>
                            <div class="lsthd_auth">
                                <div class="u-avatar lsthd_ava">
                                    <img class="u-img" :src="playlist && playlist.creator.avatarUrl">
                                </div>
                                <span class="nickname">{{playlist && playlist.creator.nickname}}</span>

                            </div>
                        </div>
                    </div>
                </section>
                <section class="pylst_intro">
                    <div class="lstit_tags" v-if="playlist.tags && playlist.tags.length" v-cloak>
                        标签：
                        <em class="border-1px lstit_tag" :key="index" v-for="(tag, index) in playlist.tags">{{tag}}</em>
                    </div>
                    <div class="u-intro">
                        <span v-html="'简介：' + playlist.description "></span>
                    </div>
                </section>
            </div>

            <div class="list-container" ref="list">
                <cube-scroll
                        ref="scroll"
                        :data="playlist.tracks">
                    <h3 class="u-smtitle">歌曲列表</h3>
                    <ul class="songlist">
                        <template v-for="(song, index) in playlist.tracks">
                            <li class="item border-bottom-1px" :data-song-id="song.id" @click.prevent.stop="goPlay(song.id)">
                                <div class="content">
                                    <h3 v-html="song.name"></h3>
                                    <p class="desc">{{ getDesc(song) }}</p>
                                </div>
                            </li>
                        </template>
                    </ul>
                </cube-scroll>
            </div>

        </div>
    </transition>
</template>
<script>
  import {requestPlaylistDetail, requestSongUrl} from '@/api/api.js';
  import {mapMutations} from 'vuex';
  import * as util from '@/common/js/util';

  export default {
    computed: {
      bgStyle() {
        return `background-image:url(${this.bgImageUrl})`
      }
    },
    data() {
      return {
        playlistId: -1,
        playlist: {
          tracks: [],
          creator: {},
        },
        bgImageUrl: '',
      };
    },
    methods: {
      goBack() {
        this.$router.back();
      },
      getPlaylistDetail() {
        requestPlaylistDetail(this.playlistId).then((res) => {
          if (res && +res.code === 200) {
            this.playlist = res.playlist;
            this.bgImageUrl = this.playlist.coverImgUrl;

            this.$nextTick(() => {
              this.headerHeight = this.$refs.pylistHeaderWrap.offsetHeight;
              console.log(this.headerHeight)
              this.$refs.list.style.top = `${this.headerHeight}px`;
              this.$refs.scroll.refresh();
            })
          }
        }).then(() => {
          console.log(this.playlist);
        })
      },
      goPlay(id) {
        requestSongUrl(id).then((res) => {
          console.log(res);
          let songUrl = res.data[0].url;
          this.$store.commit('updateCurrentSongUrl', songUrl);
        })
      },
      handleCount(num) {
        return util.handleCount(num);
      },
      getDesc(track) {
        return `${track.ar[0].name}·${track.al.name}`
      },
    },
    created() {
      if (!this.playlistId) {
        this.goBack();
      }
      this.playlistId = this.$route.params.id;
      // this.playlistId = 19723756;
      console.log(this.playlistId);
      this.getPlaylistDetail();
    },
    mounted() {

      this.$nextTick(() => {
        this.headerHeight = this.$refs.pylistHeaderWrap.offsetHeight;
        console.log(this.headerHeight)
        this.$refs.list.style.top = `${this.headerHeight}px`;
      })
    }
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
    @import "../../common/stylus/base.styl"
    .page-container {
        position: fixed
        top: 0
        left: 0
        right: 0
        bottom: 0
        z-index: 10
        margin: auto
        background-color: #fff
        overflow: hidden
    }
    .list-container {
        position: fixed
        top: 0
        left: 0
        right: 0
        bottom: 0
        z-index: 10
        margin: auto
        background-color: #fff
        overflow: hidden
    }

    .back {
        position: fixed
        top: 0
        left: 10px
        z-index: 19
        width: 44px
        height: 40px
        display: flex
        align-items: center
        justify-content: center
        color: #000000
    }

    .title {
        position: fixed
        left: 10%
        right: 10%
        top: 0
        z-index: 9
        margin: auto
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        text-align: center;
        line-height: 44px;
        font-size: 18px;
        color: #000;
    }

    .pylist-header {
        position: relative;
        padding: 54px 10px 30px 15px;
        overflow: hidden;
        .bg-image {
            position: absolute
            left: 0
            right: 0
            top: 0
            bottom: 0
            z-index: 1
            margin: auto
            background-repeat: no-repeat;
            background-size: cover;
            background-position: 50%;
            filter: blur(20px);
            transform: scale(1.5);
            &::after {
                content: ''
                position: absolute
                left: 0
                right: 0
                top: 0
                bottom: 0
                z-index: 1
                margin: auto
                background-color: rgba(0, 0, 0, .25)
            }
        }
        .plhead_wrap {
            display: flex
            position: relative
            z-index: 2
            .plhead_fl {
                position: relative
                width: 114px
                height: 114px
                background-color: #e2e2e3
                &::after {
                    content: " ";
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 18px;
                    z-index: 2;
                    background-image: linear-gradient(90deg, transparent, rgba(0, 0, 0, .2));
                }
                .lsthd_icon {
                    position: absolute;
                    z-index: 3;
                    top: 10px;
                    left: 0;
                    padding: 0 8px;
                    height: 17px;
                    color: #fff;
                    font-size: 9px;
                    text-align: center;
                    line-height: 17px;
                    background-color: rgba(217, 48, 48, .8);
                    border-top-right-radius: 17px;
                    border-bottom-right-radius: 17px;
                }
                .u-img {
                    display: block
                    width: 100%
                }
                .lsthd_num {
                    position: absolute;
                    right: 2px;
                    top: 0;
                    z-index: 3;
                    color: #fff;
                    font-size: 12px;
                    text-shadow: 1px 0 0 rgba(0, 0, 0, .15);
                }
            }
            .plhead_fr {
                margin-left: 15px
                flex: 1 1 auto
                overflow: hidden
                width: 1%
                .u-avatar {
                    display: inline-block;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    vertical-align: middle;
                    margin-right: 5px;
                    .u-img {
                        width: 100%
                        border-radius: 50%;
                    }
                }
                .nickname {
                    color: hsla(0, 0%, 100%, .7);
                }
            }
        }
        .lsthd_title {
            padding-top: 1px;
            font-size: 17px;
            line-height: 1.3;
            color: #fefefe;
            height: 44px;
            display: -webkit-box;
            -webkit-box-pack: center;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
        .lsthd_auth {
            display: block;
            position: relative;
            margin-top: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-break: normal;
        }
    }

    .pylst_intro {
        position: relative;
        margin: 0 10px 0 15px;
        padding-top: 10px;
        line-height: 19px;
        color: #666;
        .lstit_tags {
            margin-bottom: 10px;
            line-height: 20px;
            margin-right: -10px;
            .lstit_tag {
                position: relative
                display: inline-block;
                margin-right: 10px;
                padding: 1px 8px;
                font-size: 12px;
                font-style: normal
                &::after {
                    content: '';
                    position: absolute;
                    z-index: 2;
                    content: "";
                    top: 0;
                    left: 0;
                    pointer-events: none;
                    box-sizing: border-box;
                    transform-origin: top left;
                    border: 1px solid rgba(0, 0, 0, .1);
                    -webkit-border-radius: 9999px
                    -moz-border-radius: 9999px
                    border-radius: 9999px
                }
            }
        }
        .u-intro {
            position: relative;
            padding-bottom: 18px;
            font-size: 14px
            line-height: 19px;
            color: #666;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
        }
    }

    .u-smtitle {
        height: 23px;
        line-height: 23px;
        padding: 0 10px;
        font-size: 12px;
        color: #666;
        background-color: #eeeff0;
    }

    .songlist {
        padding: 20px 15px
        .item {
            position: relative
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            box-sizing: border-box;
            height: 64px;
            font-size: 14px;
            &::after {
                content: ''
                position: absolute
                bottom: 0
                left: 0
                right: -15px
                height: 1px
                background: #f2f2f2
            }
            .content {
                -webkit-box-flex: 1;
                -ms-flex: 1;
                flex: 1;
                line-height: 20px;
                overflow: hidden;
                .name {
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    color: #000;
                }
                .desc {
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    margin-top: 4px;
                    color: #999;
                }
            }
        }
    }

    .slide-enter-active, .slide-leave-active
        transition: all 0.3s

    .slide-enter, .slide-leave-to
        transform: translate3d(100%, 0, 0)
</style>
