<template>
    <div class="list-container">
        <header>
            <img width="200" height="200" :src="playlist.coverImgUrl" alt="">
        </header>
        <ol>
            <li :key="index" v-for="(song, index) in playlist.tracks" @click="goPlay(song.id)">
                <h2 v-html="song.name"></h2>
            </li>
        </ol>
    </div>
</template>
<script>
import { requestPlaylistDetail } from '@/api/api.js';
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
                console.log(res);
                if (res && +res.code === 200) {
                    this.playlist = res.playlist;
                }
            })
        },
        goPlay(id) {
            console.log(id);
        }
    },
    created() {
        if(!this.playlistId) {
            this.goBack();
        }
        // this.playlistId = this.$route.params.id;
        this.playlistId = 120001;
        console.log(this.playlistId);
        this.getPlaylistDetail();
    },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>

</style>
