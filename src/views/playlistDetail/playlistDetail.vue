<template>
    <div class="list-container">
        <header>
            <img width="200" height="200" v-lazy="playlist.coverImgUrl" alt="">
        </header>
        <ol>
            <li :key="index" v-for="(song, index) in playlist.tracks" @click="goPlay(song.id)">
                <h2 v-html="song.name"></h2>
            </li>
        </ol>
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
        // this.playlistId = this.$route.params.id;
        this.playlistId = 19723756;
        console.log(this.playlistId);
        this.getPlaylistDetail();
    },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>

</style>
