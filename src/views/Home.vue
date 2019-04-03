<template>
  <div class="home">
    <template v-if="currentSongUrl">
        <audio :src="currentSongUrl" controls preload="auto"></audio>
    </template>
    <ul>
        <li :key="index" v-for="(item, index) in songMenuTopList" @click.prevent.stop="jump('playlistDetail', item)">
            <img width="100" height="100" v-lazy="item.coverImgUrl" alt="">
            <h3 v-text="item.name"></h3>
        </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import requestServer from "@/javascript/requestServer.js";
import {requestToplist} from "@/api/api.js";

export default {
  name: "home",
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
