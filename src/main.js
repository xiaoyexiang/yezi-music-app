import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";
import fastclick from "fastclick";
import VueLazyload from "vue-lazyload";

import "@/common/stylus/index.styl";

import "./cube-ui.js";

Vue.config.productionTip = false;

Vue.use(VueLazyload, {
  loading: require('@/common/image/default.png')
})

fastclick.attach(document.body);

router.beforeEach((to, from, next) => {
  /* 路由發生變化修改頁面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
