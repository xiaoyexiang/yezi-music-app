<template>
    <transition>
        <div class="player-container" v-show="showPlayer && currentSongUrl" v-cloak>
            <template v-if="currentSongUrl">
                <audio :src="currentSongUrl" controls preload="metadata"></audio>
            </template>
        </div>
    </transition>
</template>
<script>
import { requestSongUrl } from '@/api/api.js';
import {mapState} from 'vuex';
// import * as util from '../javascript/util';

export default {
    computed: {
        currentSongUrl() {
            return this.$store.state.currentSongUrl
        }
    },
    data() {
        return {
          showPlayer: true,
        }
    },
    methods: {
    },
    created() {
    },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
    // .player-container {
    //     position fixed
    //     top: 0
    //     right: 0
    //     bottom: 0
    //     left: 0
    //     z-index: 100
    //     margin: auto
    //     display: block
    //     overflow: hidden
    //     background-color: #fff
    // }
</style>
