import Vue from 'vue'
import App from './AppH5'
import store from './store'
import router from './routerH5'
import UJAPI from "./api/UJAPI"
import ShoppingAPI from "./api/ShoppingAPI"
import fts from './utils/autorem'

import Toast from './components/Toast';
Vue.use(Toast);

Vue.prototype.$UJAPI = UJAPI; //在实例中用$UJAPI调用UJAPI封装好的RestAPI
Vue.prototype.$ShoppingAPI = ShoppingAPI; //在实例中用$ShoppingAPI调用ShoppingAPI.js封装好的RestAPI
Vue.mixin({
  computed: {
    isMP(){
        return false;
    },
    extConfig() {
      return {
        "sName": "水电建材汇",
        "sLogo":"http://wx.qlogo.cn/mmopen/eTOoibR3VocHTbpuR2Q8KdP0ibrsT7mInvfyoLaQs3F4Q0wuUlGtJlYTWMVR7FfNvauvRavz02OoMiayZyZ6KkYcericMicqMh3Ss/0",
        "sId":"E483F458-7FB4-4FC2-BE39-001E644962BA",
        "appid":"wxf1850ddc593ea296"
      }
    }
  },
  methods: {
      go: function(path) {
        this.$router.push(path);
      },
      toast(title){
        this.$toast.center(title);
      },
    }
});
Vue.config.productionTip = false

const app =new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    store
  });
window.$app=app; //vue实例全局变量
