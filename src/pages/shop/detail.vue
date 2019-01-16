<template>
  <ul class="shop-detail-info">
    <li @click="openLocation">
      <i class="icon">&#xe61f;</i>
      <span>{{shopDetail.Address}}</span>
    </li>
    <li @click="previewImage(shopDetail.License[0],shopDetail.License)">
      <i class="icon">&#xe654;</i>
      <span>查看相关证件</span>
    </li>
    <li>
      <i class="icon">&#xe628;</i>
      <span>主营：{{shopDetail.MainTypeName}}</span>
    </li>
    <li>
      <i class="icon">&#xe60a;</i>
      <span @click="makePhoneCall(shopDetail.Mobile)">{{shopDetail.Mobile}}</span>&nbsp;
      <span @click="makePhoneCall(shopDetail.Tel)">{{shopDetail.Tel}}</span>
    </li>
    <li>
      <i class="icon">&#xe623;</i>
      <span>{{shopDetail.Notice}}</span>
    </li>
    <li>
      <i class="icon">商品分类</i>
      <ul>
        <li v-for="(item,index) in shopDetail.ShopImages" :key="index">
          <!-- <img mode="widthFix" :src="item.ThumbnailUrl"> -->
          <img :src="item.ThumbnailUrl" @click="previewImage(item,shopDetail.ShopImages)">
        </li>
      </ul>
    </li>
    <li>
      <i class="icon">店铺简介</i>
      <span>{{shopDetail.Brief}}</span>
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      gcj02: {
        latitude: 0,
        longitude: 0
      }
    };
  },
  computed: {
    shopDetail() {
      return this.$store.state.Shop.ShopDetail;
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
    previewImage(item,images) {
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
    }
  },
  onShareAppMessage(result) {
    let title = this.extConfig.sName||this.shopDetail.sName;
    let path = `/pages/shop/index?sId=${this.shopDetail.sId}`;
    return {
      title,
      path
    };
  },
  mounted() {
    let that = this;
    if (this.isMP) {
      that.$ShoppingAPI
        .baidu_geocoder({ location: `${that.shopDetail.Latitude},${that.shopDetail.Longitude}`,coordtype:'bd09ll',ret_coordtype:'gcj02ll' })
        .then(rep2 => {
          if (rep2.status == 0) {
            that.gcj02.latitude = rep2.result.location.lat;
            that.gcj02.longitude = rep2.result.location.lng;
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
ul.shop-detail-info {
  > li {
    border-bottom: 1px solid #d6d6d6;
    padding: 0.32rem 0;
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
      margin: 0 0 0 0.52rem;
    }
  }
  > li:last-child {
    border: none;
  }
}
button{
  width: 8rem;
  height: 0.5rem;
  display: inline-block;
}
</style>
