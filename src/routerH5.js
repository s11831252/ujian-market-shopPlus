import Vue from 'vue'
import Router from 'vue-router'
import home from './pages/home/index'
import order from './pages/order/index'
import my from './pages/my/index'
import index from './pages/index/indexH5'
import shop from './pages/shop/index'
import shopgoods from './pages/shop/detail'
import settle from './pages/order/settle'
import logistics from './pages/order/logistics'
import pay from './pages/order/pay'


import store from './store'
Vue.use(Router)
var routes = [
    {
        path:'/',
        redirect:'pages/index/index'
    },
    {
        path: 'pages/index/index',
        name: 'index',
        config: {
            navigationBarTitleText: '授权登录页',
            enablePullDownRefresh: true
        },
        meta: { noAuth: true },
        alias: '/pages/index/index',
        component: index
    },
    {
        path: 'pages/home/index',
        name: 'home',
        config: {
            navigationBarTitleText: '主页',
            enablePullDownRefresh: true,
            EnableNav:true,
        },
        alias: '/pages/home/index',
        component: home
    },
    {
        path: 'pages/order/index',
        name: 'order',
        config: {
            navigationBarTitleText: '订单',
            enablePullDownRefresh: true,
            EnableNav:true,
        },
        alias: '/pages/order/index',
        component: order
    },
    {
        path: 'pages/my/index',
        name: 'my',
        config: {
            navigationBarTitleText: '我的',
            enablePullDownRefresh: true,
            EnableNav:true,

        },
        alias: '/pages/my/index',
        component: my
    },
    {
        path: 'pages/shop/index',
        name: 'shopindex',
        config: {
            navigationBarTitleText: '店铺详情',
            enablePullDownRefresh: true
        },
        alias: '/pages/shop/index',
        component: shop
    },
    {
        path:'pages/shop/detail',
        name:'shopgoods',
        config: {
            navigationBarTitleText: '商品详情',
            enablePullDownRefresh: false
        },
        alias: '/pages/shop/detail',
        component: shopgoods
    },    
    {
        path:'pages/order/settle',
        name:'settle',
        config: {
            navigationBarTitleText: '订单结算',
            enablePullDownRefresh: false
        },
        alias: '/pages/order/settle',
        component: settle
    },
    {
        path:'pages/order/logistics',
        name:'logistics',
        config: {
            navigationBarTitleText: '物流选择',
            enablePullDownRefresh: false
        },
        alias: '/pages/order/logistics',
        component: logistics
    },
    {
        path:'pages/order/pay',
        name:'pay',
        config: {
            navigationBarTitleText: '订单支付',
            enablePullDownRefresh: false
        },
        alias: '/pages/order/pay',
        component: pay
    }
]

let router =new Router({routes:routes})
router.beforeEach((to, from, next) => {
    if (!to.matched.some(record => record.meta.noAuth)) {
        //这里判断用户是否登录，验证store中的token是否已登录
        if (!store.getters.Logined) { // 判断当前的token是否存在
            next({
                path: '/pages/index/index',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next() // 确保一定要调用 next()
    }
  })
export default router
