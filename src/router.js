import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import pl from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: [{
    path: "/",
    name: "home",
    component: Home
  }, {
    path: "/about",
    name: "about",
    meta: {
      title: '关于叶子'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import ( /* webpackChunkName: "about" */ "./views/About.vue")
  }, {
    path: "/playlistDetail/:id",
    name: "playlistDetail",
    meta: {
      title: '歌单详情'
    },
    component: () =>
      import ("./views/playlistDetail/playlistDetail.vue")
  }]
});