import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    redirect: '/recommend'
  }, {
    path: "/recommend",
    name: "recommend",
    meta: {
      title: '推荐'
    },
    component: () =>
      import ("./views/recommend/recommend.vue"),
    children: [
      {
        path: ':id',
        component: () =>
          import ("./views/playlistDetail/playlistDetail.vue")
      }
    ]
  }, {
    path: "/singer",
    name: "singer",
    meta: {
      title: '歌手'
    },
    component: () =>
      import ("./views/singer/singer.vue"),
    children: [
      {
        path: ':id',
        component: () =>
          import ("./views/playlistDetail/playlistDetail.vue")
      }
    ]
  }, {
    path: "/mine",
    name: "mine",
    meta: {
      title: '我的'
    },
    component: () =>
      import ("./views/mine/mine.vue")
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