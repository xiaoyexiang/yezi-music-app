<template>
    <div class="list-container">
        <cube-scroll
                ref="scroll"
                :data="playlist.tracks">
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
            <ul>
                <template v-for="(song, index) in playlist.tracks">
                    <li class="songlist" :data-song-id="song.id" @click.prevent.stop="goPlay(song.id)">
                        <p v-html="song.name"></p>
                    </li>
                </template>
            </ul>
        </cube-scroll>

    </div>
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
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
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

    .pylist-header {
        position: relative;
        padding: 30px 10px 30px 15px;
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
                    color: hsla(0,0%,100%,.7);
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

    .songlist {
        display: block
        padding: 0 10px
        height: 40px;
        line-height: 40px
    }
</style>
