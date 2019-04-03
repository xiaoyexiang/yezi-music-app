const mutations = {
    updateCurrentSongUrl(state, url) {
        console.log(url);
        state.currentSongUrl = url;
    }
}

export default mutations