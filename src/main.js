// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router';
import iView from 'iview';
import axios from 'axios'
import Qs from 'qs'
import 'iview/dist/styles/iview.css';
import { setCookie, getCookie, delCookie } from './assets/cookie';

Vue.use(VueRouter);
Vue.use(iView);
Vue.prototype.axios = axios;
Vue.prototype.qs = Qs;
Vue.prototype.$cookieStore = {
  setCookie,
  getCookie,
  delCookie
};


// The routing configuration
// const RouterConfig = {
//   routes: Routers
// };
// const router1 = new VueRouter(RouterConfig);

// new Vue({
//   el: '#app',
//   router: router,
//   render: h => h(App)
// });

// Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
