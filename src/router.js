import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const Recommend = () => import("./views/recommend/recommend.vue");
const Disc = () => import("./views/disc/disc.vue");
const Singer = () => import("./views/singer/singer.vue");
const PlaylistDetail = () =>
  import("./views/playlistDetail/playlistDetail.vue");
const Mine = () => import("./views/mine/mine.vue");
const Login = () => import("./views/login/login.vue");
const Register = () => import("./views/register/register.vue");

export default new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/recommend"
    },
    {
      path: "/recommend",
      name: "recommend",
      meta: {
        title: "推荐"
      },
      component: Recommend,
      children: [
        {
          path: ":id",
          component: Disc
        }
      ]
    },
    {
      path: "/singer",
      name: "singer",
      meta: {
        title: "歌手"
      },
      component: Singer,
      children: [
        {
          path: ":id",
          component: PlaylistDetail
        }
      ]
    },
    {
      path: "/mine",
      name: "mine",
      meta: {
        title: "我的"
      },
      component: Mine
    },
    {
      path: "/playlistDetail/:id",
      name: "playlistDetail",
      meta: {
        title: "歌单详情"
      },
      component: () => import("./views/playlistDetail/playlistDetail.vue")
    },
    {
      path: "/login",
      name: "login",
      meta: {
        title: "登录"
      },
      component: Login
    },
    {
      path: "/register",
      name: "register",
      meta: {
        title: "注册"
      },
      component: Register
    }
  ]
});
