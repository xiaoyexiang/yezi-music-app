<template>
    <div class="list-container">
        <cube-scroll
                ref="scroll"
                :data="playlist">
            <section class="pylist-header">
                <div class="bg-image" :style="bgStyle"></div>
                <div class="plhead_wrap">
                    <div class="plhead_fl">
                        <img class="u-img" v-lazy="bgImageUrl">
                        <span class="lsthd_icon">歌单</span>
                        <i class="u-earp lsthd_num">272.6万</i>
                    </div>
                    <div class="plhead_fr"><h2 class="f-thide2 f-brk lsthd_title">你是踩碎星光落入我梦境的一袋幻想</h2>
                        <div class="lsthd_auth f-thide"><a class="lsthd_link" href="/m/user?id=402524626">
                            <div class="u-avatar lsthd_ava"><img class="u-img"
                                                                 src="http://p1.music.126.net/Zit8wCBkBQMDnADGQzMCJA==/109951163672539121.webp?imageView&amp;thumbnail=90x0&amp;quality=75&amp;tostatic=0&amp;type=webp"><span
                                    class="ava-icon ava-icon-daren"></span></div>
                            可能是条淡水鱼</a></div>
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
  // import * as util from '../javascript/util';

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
      }
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
    }

    .cover-zone {
        position: relative;
        display: block;
        width: 200px;
        height: 200px;
        margin: 20px auto;
        .play-detail-cover {
            position: absolute;
            left: 0;
            right: 0;
            top: 0
            bottom: 0
            margin: auto
            display: block;
            width: 200px;
            height: 200px;
        }
    }

    .songlist {
        display: block
        padding: 0 10px
        height: 40px;
        line-height: 40px
    }
</style>
