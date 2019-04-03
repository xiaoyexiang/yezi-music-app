<template>
    <div class="list-container">
        <!-- <div class="cover-zone">
            <img class="play-detail-cover" width="200" height="200" v-lazy="playlist.coverImgUrl" alt="">
        </div> -->
        <ul>
            <template v-for="(song, index) in playlist.tracks">
                <li class="songlist" :data-song-id="song.id" @click.prevent.stop="goPlay(song.id)">
                    <p v-html="song.name"></p>
                </li>
            </template>
        </ul>
    </div>
</template>
<script>
import { requestPlaylistDetail, requestSongUrl } from '@/api/api.js';
import {mapMutations} from 'vuex';
// import * as util from '../javascript/util';

export default {
    data() {
        return {
            playlistId: -1,
            playlist: {
                tracks: [],
                creator: {},
            },
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
        if(!this.playlistId) {
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
