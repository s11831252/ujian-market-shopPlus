import Vue from 'vue'
import App from './AppH5'
import store from './store'
import router from './routerH5'
import UJAPI from "./api/UJAPI"
import ShoppingAPI from "./api/ShoppingAPI"
import WeixinOpenAPI from "./api/WeixinOpenAPI"
import fts from './utils/autorem'

import Toast from './components/Toast';
import './assets/style.css';
import './assets/global.css';
import './assets/iconfont.less';
import './components/Toast/toast.css';
import VueAwesomeSwiper from 'vue-awesome-swiper'
let { swiper, swiperSlide } = VueAwesomeSwiper

import "swiper/dist/css/swiper.css";
Vue.use(Toast);

Vue.prototype.$UJAPI = UJAPI; //在实例中用$UJAPI调用UJAPI封装好的RestAPI
Vue.prototype.$ShoppingAPI = ShoppingAPI; //在实例中用$ShoppingAPI调用ShoppingAPI.js封装好的RestAPI
Vue.prototype.$WeixinOpenAPI = WeixinOpenAPI; //在实例中用$WeixinOpenAPI调用WeixinOpenAPI.js封装好的RestAPI

Vue.mixin({
  components: {
    swiper,
    swiperSlide
  },
  computed: {
    isMP(){
        return false;
    },
    extConfig() {
      return {
        "sName": "U建信息化设备旗舰店",
        "sLogo":"https://image.ujianchina.net/Shopping/ShopImages//7eb046ff17724f5e97da3d2a3c01be91/201808241024127524ZGG.jpg",
        "sId":"7eb046ff-1772-4f5e-97da-3d2a3c01be91",
        "appid":"wxf1850ddc593ea296"
      }
    },
    async launchOptions(){
      return {}
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
