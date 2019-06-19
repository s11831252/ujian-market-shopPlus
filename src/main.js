import Vue from 'vue'
import App from './App'
import MpvueRoterPatch from 'mpvue-router-patch'
import store from './store'
import UJAPI from "./api/UJAPI"
import ShoppingAPI from "./api/ShoppingAPI"
import WeixinOpenAPI from "./api/WeixinOpenAPI"
import './assets/style.css';
import './assets/global.css';
import './assets/iconfont.less';
import { debug } from 'util';

Vue.prototype.$UJAPI = UJAPI; //在实例中用$UJAPI调用UJAPI封装好的RestAPI
Vue.prototype.$ShoppingAPI = ShoppingAPI; //在实例中用$ShoppingAPI调用ShoppingAPI.js封装好的RestAPI
Vue.prototype.$WeixinOpenAPI = WeixinOpenAPI; //在实例中用$WeixinOpenAPI调用WeixinOpenAPI.js封装好的RestAPI

Vue.prototype.$store = store;
Vue.mixin({
    data() {
        return {

        }
    },
    computed: {
        $route: function () {
            return this.$router.currentRoute
        },
        isMP() {
            return true;
        },
        extConfig() {
            return wx.getExtConfigSync ? wx.getExtConfigSync() : {};
        },
        async launchOptions(){
            var options = await  wx.getLaunchOptionsSync();
            return options;
        }
    },
    methods: {
        go: function (path) {
            this.$router.push(path);
        },
        replace: function (path) {
            this.$router.replace(path);
        },
        toast(title) {
            wx.showToast({
                title: title,
                icon: "none"
            });
        }
    },
    onLaunch() {
        // 获取小程序更新机制兼容
        if (wx.canIUse('getUpdateManager')) {
            const updateManager = wx.getUpdateManager()
            updateManager.onCheckForUpdate(function (res) {
                // 请求完新版本信息的回调
                if (res.hasUpdate) {
                    updateManager.onUpdateReady(function () {
                        wx.showModal({
                            title: '更新提示',
                            content: '新版本已经准备好，是否重启应用？',
                            success: function (res) {
                                if (res.confirm) {
                                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                                    updateManager.applyUpdate()
                                }
                            }
                        })
                    })
                    updateManager.onUpdateFailed(function () {
                        // 新的版本下载失败
                        wx.showModal({
                            title: '已经有新版本了哟~',
                            content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
                        })
                    })
                }
            })
        } else {
            // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
            wx.showModal({
                title: '提示',
                content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
            })
        }
    },
    onLoad() {
        // if (this.$initData$) {
        //   Object.assign(this, JSON.parse(this.$initData$))
        // } else {
        //   this.$initData$ = JSON.stringify(this.$data)
        // }
    },
    onUnload() {
        if (this.$options.data)
            Object.assign(this, this.$options.data())
    },
    created: function () {
        // if(this.extConfig&&this.extConfig.sId)
        // {

        // }else
        // {
        //     let extConfig = wx.getExtConfigSync? wx.getExtConfigSync(): {}
        //     this.extConfig=extConfig;
        // }
        // console.log(this.extConfig)
    }
});
Vue.use(MpvueRoterPatch);//在Vue实例中使用$Router访问Vuex
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue(App)


app.$mount()
