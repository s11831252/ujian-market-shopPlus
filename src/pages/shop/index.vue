<template>
  <div class="shop-detail">
    <div class="shop-detail-head">
      <div class="shop-detail-logo">
        <img :src="extConfig.sLogo">
      </div>
      <div class="shop-simple-info">
        <p class="shop-detail-name">{{extConfig.sName}}</p>
        <p class="shop-detail-notice">
          店铺公告：
          <span>{{shopDetail.Notice}}</span>
        </p>
        <div class="shop-detail-statistics">
          <p class="shop-detail-statistics-sales">
            本店销量：
            <span>{{shopDetail.Sales}}</span>
          </p>
          <p class="shop-detail-statistics-goods">
            商品数：
            <span>{{shopDetail.GoodsCount}}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="shop-detail-tab">
      <ul class="navbar">
        <li v-for="(item,index) in Tabs" :key="index" :id="index" :class="{'navbar_item_on':activeIndex == index}" class="navbar_item" @click="tabClick(item,$event)">
          <div class="navbar_title">{{item.name}}</div>
        </li>
      </ul>
      <div class="navbar_slider" :class="navbarSliderClass"></div>
      <div class="navbar-body">
        <div :hidden="activeIndex != 0">
          <div class="shop-detail-tab-goods">
            <ul class="shop-detail-tab-goods-types">
              <li v-for="(item,index) in FilterGoodsType " :key="index" :class="{'active': item.TypeId==activeType}" @click="changeGoodsType(item.TypeId)">
                <p>{{item.TypeName}}</p>
              </li>
            </ul><ul class="shop-detail-tab-goods-list">
              <li v-for="(item,index) in goodList" :key="index" class="shop-detail-tab-goods-detail" @click="go({path:'/pages/shop/good-detail',query:{sId:item.sId,gId:item.gId,sName:shopDetail.sName}})">
                <indexGoodDetail :goodsInfo="item" :sName="shopDetail.sName"></indexGoodDetail>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <shoppingCar :sId="shopDetail.sId"></shoppingCar>
    <customService></customService>
  </div>
</template>
<script>
import shoppingCar from "@/components/shoppingCarToolbar";
import customService from "@/components/customService";
import indexGoodDetail from "./index-good-detail";

import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      // shopDetail: {},
      goodList: [],
      GoodsType: [],
      Tabs: [],
      activeIndex: 0,
      activeType: 0,
      gcj02: {
        latitude: 0,
        longitude: 0
      }
    };
  },
  components: {
    shoppingCar,
    customService,
    indexGoodDetail
  },
  computed: {
    navbarSliderClass() {
      return "navbar_slider_" + this.activeIndex;
    },
    shopDetail() {
      return this.$store.state.Shop.ShopDetail;
    },
    FilterGoodsType() {
      var that = this;
      var list = that.GoodsType.filter(item => {
        if (item.TypeId > 0) {
          if (!that.shopDetail.Goods) return false;
          var goods = that.shopDetail.Goods.find(v => {
            return v.TypeId.indexOf(item.TypeId) >= 0;
          });
          return goods != null;
        } else {
          if (!that.shopDetail.Goods) return false;
          var goods = that.shopDetail.Goods.find(v => {
            return v.TypeId.length == 0;
          });
          return goods != null;
        }
      });
      return list;
    }
  },
  methods: {
    openLocation() {
      var that = this;
      wx.openLocation({
        latitude: that.gcj02.latitude,
        longitude: that.gcj02.longitude,
        scale: 18
      });
    },
    previewImage(item, images) {
      if (this.isMP) {
        let urls = images.map(item => {
          return item.ImgUrl;
        });
        wx.previewImage({
          current: item.ImgUrl, // 当前显示图片的http链接
          urls // 需要预览的图片http链接列表
        });
      }
    },
    makePhoneCall(phoneNumber) {
      if (this.isMP) {
        wx.makePhoneCall({
          phoneNumber: phoneNumber
        });
      }
    },
    async tabClick(tab, e) {
      if (e) this.activeIndex = e.currentTarget.id;
    },
    changeGoodsType(typeid) {
      this.activeType = typeid;
      this.goodList = this.shopDetail.Goods.filter(item => {
        if (typeid > 1) return item.TypeId.indexOf(typeid) > -1;
        else return item.TypeId.length == 0;
      });
    },
    async init(refresh) {
      // console.log(`init:`,this.extConfig);
      await this.GetShopDetail({ sId: this.extConfig.sId, refresh }); //获取店铺详情
      if (this.extConfig.sId) {
        if (this.shopDetail.sName&&this.isMP) {
            wx.setNavigationBarTitle({ title: this.extConfig.sName });
          // this.Tabs[1].name += `(${this.shopDetail.CommentCount})`; //绑定评价数量
        }
        var rep3 = await this.$ShoppingAPI.Goods_GetByShop({ sId: this.extConfig.sId }); //获取店铺商品
        if (rep3.ret == 0) {
          this.shopDetail.Goods = rep3.data;
        }
        var rep2 = await this.$ShoppingAPI.CustomGoodsType_Get({
          sId: this.extConfig.sId
        }); //获取店铺商品分类
        if (rep2.ret == 0) {
          this.GoodsType = rep2.data;
          this.GoodsType.push({ Sort: "0", TypeId: "-1", TypeName: "其他" });
          this.changeGoodsType(this.GoodsType[0].TypeId);
        }
      }
    },
    ...mapActions(["GetShopDetail"]) //`this.$store.dispatch('GetShopDetail')`
  },
  onShareAppMessage(result) {
    let title = this.extConfig.sName||this.shopDetail.sName;
    let path = `/pages/shop/index?sId=${this.extConfig.sId}`;
    return {
      title,
      path
    };
  },
  onPullDownRefresh() {
    this.init(true);
    wx.stopPullDownRefresh();
  },
  onLoad(query) {
    wx.showShareMenu({
      withShareTicket: true
    });
  },
  async created() {
  },
  async mounted() {
    let that = this;
    this.activeIndex = 0;
    this.Tabs = [
      { name: "分类", type: "1", checked: true }
      // { name: "评价", type: "2", checked: true },
      // { name: "商家", type: "3", checked: true }
    ];
    this.goodList = [];
    await this.init();
  }
};
</script>
<style lang="less" scoped>
.shop-detail {
  padding-bottom: 95px;
  .shop-detail-head {
    background-color: #12b7f5;
    padding: 20px 5px 0 10px;
    color: #fff;
    .shop-detail-logo {
      width: 2.46rem;
      position: relative;
      img {
        // width: 100%;
        // height: 80px;
        width: 2.46rem;
        height: 2.46rem;
        position: absolute;
        border-radius: 10%;
      }
    }
    .shop-simple-info {
      padding-left: 10px;
      width: 69%;
      .shop-detail-name {
        font-family: PingFangSC-Regular, sans-serif;
        font-size: 20px;
        font-weight: bold;
      }
      .shop-detail-notice {
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .shop-detail-statistics {
        font-size: 14px;
        p {
          display: inline-block;
          span {
            color: #fffc00;
          }
        }
        .shop-detail-statistics-goods {
          padding-left: 20px;
        }
      }
    }
    .shop-detail-logo,
    .shop-simple-info {
      display: inline-block;
      vertical-align: top;
    }
  }

  .shop-detail-tab {
    background-color: #fff;
    padding-top: 20px;
    .shop-detail-tab-goods {
      height: 100%;
      min-height: 500px;
      .shop-detail-tab-goods-types {
        width: 23%;
        // background-color: rgb(173, 173, 173);
        color: #717070;
        padding: 0 2px 0 8px;
        li {
          height: 40px;
          line-height: 40px;
          p {
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        li.active {
          color: #1b1b1b;
        }
      }
      .shop-detail-tab-goods-list {
        width: 74%;
        .shop-detail-tab-goods-detail {
          margin-top: 10px;
        }
      }
      .shop-detail-tab-goods-types,
      .shop-detail-tab-goods-list {
        display: inline-block;
        float: left;
        vertical-align: top;
      }
    }
    ul.shop-detail-info {
      > li {
        border-bottom: 1px solid #d6d6d6;
        padding: 7px 0;
        line-height: 0.4rem;
        i {
          font-size: 20px;
          display: inline-block;
          vertical-align: top;
          margin: 0 10px;
        }
        ul {
          display: inline-block;
          li {
            float: left;
            margin-top: 10px;
          }
        }
        i.icon {
          vertical-align: initial;
          font-size: 0.45rem;
        }
        span {
          color: #444444;
          font-size: 13px;
        }
        img {
          width: 2.59rem;
          height: 2.59rem;
          margin: 0 0 0 5px;
        }
      }
      > li:last-child {
        border: none;
      }
    }
  }
}

.navbar {
  height: 40px;
  line-height: 40px;
  width: 100%;
  border-bottom: 1rpx solid #ccc;
  position: relative;
  font-size: 0.41rem;
}

.navbar_item {
  text-align: center;
  display: inline-block;
  width: 33%;
}

.navbar_item_on {
  color: #12b7f5;
}

.navbar_title {
  font-weight: 500;
  display: inline-block;
}
.navbar-body {
  // margin-top: 10px;
}
.navbar_slider {
  position: absolute;
  content: " ";
  left: 0;
  width: 33%;
  height: 2px;
  background-color: #12b7f5;
  -webkit-transition: -webkit-transform 0.1s;
  transition: -webkit-transform 0.1s;
  transition: transform 0.1s;
  transition: transform 0.1s, -webkit-transform 0.1s;
}

.navbar_slider_0 {
  transform: translateX(0);
}

.navbar_slider_1 {
  transform: translateX(100%);
}
.navbar_slider_2 {
  transform: translateX(200%);
}
.navbar_slider_3 {
  transform: translateX(300%);
}
</style>

