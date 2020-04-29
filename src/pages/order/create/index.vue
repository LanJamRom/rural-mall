<template>
  <view class="pi-container">
    <!-- 地址 -->
    <navigator url="/src/pages/my/shipping/index?source=1" class="address-section">
      <view class="order-content">
        <text class="yticon icon-shouhuodizhi" />
        <view class="cen">
          <view class="top">
            <text class="name">{{ addressData.receiverName }}</text>
            <text class="mobile">{{ addressData.receiverPhone }}</text>
          </view>
          <text class="address">{{ addressData.fullAddress }}</text>
        </view>
        <text class="yticon icon-you" />
      </view>

      <image
        class="a-bg"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAAFCAYAAAAaAWmiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Rjk3RjkzMjM2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Rjk3RjkzMjQ2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGOTdGOTMyMTY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGOTdGOTMyMjY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrEOZlQAAAiuSURBVHjazJp7bFvV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"
      />
    </navigator>

    <view class="goods-section">
      <view class="g-header b-b">
        <image class="logo" src="http://duoduo.qibukj.cn/./Upload/Images/20190321/201903211727515.png" />
        <text class="name">西城小店铺</text>
      </view>
      <!-- 商品列表 -->
      <view v-for="(item, idx) in cartItem" :key="idx" class="g-item">
        <image :src="item.mainImage" />
        <view class="right">
          <text
            class="title clamp"
            style="

display: -webkit-box;
overflow: hidden;
font-size: 24rpx;
text-overflow: ellipsis;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;"
          >
            {{ item.name }}
          </text>
          <text v-if="item.cartItem && item.cartItem.sub_id" class="spec">{{ item.cartItem.sub_name }}</text>
          <text v-if="item.cartItem && item.cartItem.twice_id" class="spec">{{ item.cartItem.twice_name }}</text>
          <view class="price-box">
            <text class="price">￥{{ item.cartItem.currentUnitPrice }}</text>
            <text class="number">x {{ item.cartItem.quantity }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 优惠明细 -->
    <view class="yt-list">
      <view class="yt-list-cell b-b" @click="toggleMask('show')">
        <view class="cell-icon">
          券
        </view>
        <text class="cell-tit clamp">优惠券</text>
        <text class="cell-tip active">
          选择优惠券
        </text>
        <text class="cell-more wanjia wanjia-gengduo-d" />
      </view>
      <view class="yt-list-cell b-b">
        <view class="cell-icon hb">
          减
        </view>
        <text class="cell-tit clamp">商家促销</text>
        <text class="cell-tip disabled">暂无可用优惠</text>
      </view>
    </view>
    <!-- 金额明细 -->
    <view class="yt-list">
      <view class="yt-list-cell b-b">
        <text class="cell-tit clamp">商品金额</text>
        <text class="cell-tip">￥{{ $store.getters.totalPrice }}</text>
      </view>
      <view class="yt-list-cell b-b">
        <text class="cell-tit clamp">优惠金额</text>
        <text class="cell-tip red">-￥0</text>
      </view>
      <view class="yt-list-cell b-b">
        <text class="cell-tit clamp">运费</text>
        <text class="cell-tip">免运费</text>
      </view>
      <view class="yt-list-cell desc-cell">
        <text class="cell-tit clamp">备注</text>
        <input v-model="desc" class="desc" type="text" placeholder="请填写备注信息" placeholder-class="placeholder" />
      </view>
    </view>

    <!-- 底部 -->
    <view class="footer">
      <view class="price-content">
        <text>实付款</text>
        <text class="price-tip">￥</text>
        <text class="price">{{ $store.getters.totalPrice }}</text>
      </view>
      <text class="submit" @click="submit">提交订单</text>
    </view>

    <!-- 优惠券面板 -->
    <view class="mask" :class="maskState === 0 ? 'none' : maskState === 1 ? 'show' : ''" @click="toggleMask">
      <view class="mask-content" @click.stop.prevent="stopPrevent">
        <!-- 优惠券页面，仿mt -->
        <view v-for="(item, index) in couponList" :key="index" class="coupon-item">
          <view class="con">
            <view class="left">
              <text class="title">{{ item.title }}</text>
              <text class="time">有效期至2019-06-30</text>
            </view>
            <view class="right">
              <text class="price">{{ item.price }}</text>
              <text>满30可用</text>
            </view>

            <view class="circle l" />
            <view class="circle r" />
          </view>
          <text class="tips">限新用户使用</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { apiGetDefaultShipping, apiSaveOrder } from './api'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('app')
export default {
  data() {
    return {
      maskState: 0, // 优惠券面板显示状态
      desc: '', // 备注
      payType: 1, // 1微信 2支付宝
      couponList: [
        {
          title: '新用户专享优惠券',
          price: 5
        },
        {
          title: '庆五一发一波优惠券',
          price: 10
        },
        {
          title: '优惠券优惠券优惠券优惠券',
          price: 15
        }
      ],
      addressData: {},
      type: '', // 类型  'cart'/'prod',
      id: ''
    }
  },
  onLoad(options) {
    this.type = options && options.type
    uni.$on('shippingSelect', data => {
      console.log('data:', data)
      this.addressData = data
    })
    this.loadData()
  },
  computed: {
    ...mapState(['cartItem'])
  },
  methods: {
    async loadData() {
      const {
        data,
        head: { ret, msg = '获取默认地址失败' }
      } = await apiGetDefaultShipping()
      if (ret !== this.$consts.RET_CODE.SUCCESS) return this.$utils.common.toast.fail(msg)
      this.addressData = data[0]
    },
    // 显示优惠券面板
    toggleMask(type) {
      let timer = type === 'show' ? 10 : 300
      let state = type === 'show' ? 1 : 0
      this.maskState = 2
      setTimeout(() => {
        this.maskState = state
      }, timer)
    },
    numberChange(data) {
      this.number = data.number
    },
    changePayType(type) {
      this.payType = type
    },
    async submit() {
      let ids = [this.addressData.id]
      if (this.type === 'cart') {
        const cartIds = this.cartItem.map(item => item.cartItem.id)
        ids = ids.concat(cartIds)
      } else {
        const {
          id,
          cartItem: { sub_id = '', twice_id = '' }
        } = this.cartItem[0]
        ids.push(id, sub_id, twice_id)
      }
      const {
        data = [],
        head: { ret, msg = '提交订单失败' }
      } = await apiSaveOrder(this.type, ids)
      if (ret !== this.$consts.RET_CODE.SUCCESS) return this.$utils.common.toast.fail(msg)
      this.$utils.common.toast.success('创建订单成功')
      setTimeout(() => {
        this.$utils.common.navigateTo('src/pages/order/create/pay/pay', { id: data[0].id })
      }, 800)
    },
    stopPrevent() {}
  }
}
</script>

<style lang="scss" scoped>
.pi-container {
  padding-bottom: 100rpx;
  background: $page-color-base;
}

.address-section {
  position: relative;
  padding: 30rpx 0;
  background: #ffffff;

  .order-content {
    display: flex;
    align-items: center;
  }

  .icon-shouhuodizhi {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 90rpx;
    font-size: 44rpx;
    color: #888888;
  }

  .cen {
    display: flex;
    flex: 1;
    flex-direction: column;
    font-size: 28rpx;
    color: $font-color-dark;
  }

  .name {
    margin-right: 24rpx;
    font-size: 34rpx;
  }

  .address {
    margin-top: 16rpx;
    margin-right: 20rpx;
    font-size: 26rpx;
    color: $font-color-light;
  }

  .icon-you {
    margin-right: 30rpx;
    font-size: 32rpx;
    color: $font-color-light;
  }

  .a-bg {
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 5rpx;
  }
}

.goods-section {
  padding-bottom: 1px;
  margin-top: 16rpx;
  background: #ffffff;

  .g-header {
    position: relative;
    display: flex;
    align-items: center;
    height: 84rpx;
    padding: 0 30rpx;
  }

  .logo {
    display: block;
    width: 50rpx;
    height: 50rpx;
    border-radius: 100px;
  }

  .name {
    margin-left: 24rpx;
    font-size: 30rpx;
    color: $font-color-base;
  }

  .g-item {
    display: flex;
    margin: 20rpx 30rpx;

    image {
      display: block;
      flex-shrink: 0;
      width: 140rpx;
      height: 140rpx;
      border-radius: 4rpx;
    }

    .right {
      flex: 1;
      padding-left: 24rpx;
      overflow: hidden;
    }

    .title {
      font-size: 30rpx;
      color: $font-color-dark;
    }

    .spec {
      font-size: 26rpx;
      color: $font-color-light;
    }

    .price-box {
      display: flex;
      align-items: center;
      padding-top: 10rpx;
      font-size: 32rpx;
      color: $font-color-dark;

      .price {
        margin-bottom: 4rpx;
      }
      .number {
        margin-left: 20rpx;
        font-size: 26rpx;
        color: $font-color-base;
      }
    }

    .step-box {
      position: relative;
    }
  }
}
.yt-list {
  margin-top: 16rpx;
  background: #ffffff;
}

.yt-list-cell {
  position: relative;
  display: flex;
  align-items: center;
  padding: 10rpx 30rpx 10rpx 40rpx;
  line-height: 70rpx;

  &.cell-hover {
    background: #fafafa;
  }

  &.b-b::after {
    left: 30rpx;
  }

  .cell-icon {
    width: 32rpx;
    height: 32rpx;
    margin-right: 12rpx;
    font-size: 22rpx;
    line-height: 32rpx;
    color: #ffffff;
    text-align: center;
    background: #f85e52;
    border-radius: 4rpx;

    &.hb {
      background: #ffaa0e;
    }

    &.lpk {
      background: #3ab54a;
    }
  }

  .cell-more {
    align-self: center;
    margin-right: -10rpx;
    margin-left: 8rpx;
    font-size: 24rpx;
    color: $font-color-light;
  }

  .cell-tit {
    flex: 1;
    margin-right: 10rpx;
    font-size: 26rpx;
    color: $font-color-light;
  }

  .cell-tip {
    font-size: 26rpx;
    color: $font-color-dark;

    &.disabled {
      color: $font-color-light;
    }

    &.active {
      color: $base-color;
    }
    &.red {
      color: $base-color;
    }
  }

  &.desc-cell {
    .cell-tit {
      max-width: 90rpx;
    }
  }

  .desc {
    flex: 1;
    font-size: $font-base;
    color: $font-color-dark;
  }
}

/* 支付列表 */
.pay-list {
  padding-left: 40rpx;
  margin-top: 16rpx;
  background: #ffffff;
  .pay-item {
    position: relative;
    display: flex;
    align-items: center;
    height: 110rpx;
    padding-right: 20rpx;
    line-height: 1;
  }
  .icon-weixinzhifu {
    width: 80rpx;
    font-size: 40rpx;
    color: #6bcc03;
  }
  .icon-alipay {
    width: 80rpx;
    font-size: 40rpx;
    color: #06b4fd;
  }
  .icon-xuanzhong2 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60rpx;
    height: 60rpx;
    font-size: 40rpx;
    color: $base-color;
  }
  .tit {
    flex: 1;
    font-size: 32rpx;
    color: $font-color-dark;
  }
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 995;
  z-index: 998;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 90rpx;
  font-size: 30rpx;
  color: $font-color-base;
  background-color: #ffffff;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
  .price-content {
    padding-left: 30rpx;
  }
  .price-tip {
    margin-left: 8rpx;
    color: $base-color;
  }
  .price {
    font-size: 36rpx;
    color: $base-color;
  }
  .submit {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 280rpx;
    height: 100%;
    font-size: 32rpx;
    color: #ffffff;
    background-color: $base-color;
  }
}

/* 优惠券面板 */
.mask {
  position: fixed;
  top: var(--window-top);
  bottom: 0;
  left: 0;
  z-index: 9995;
  display: flex;
  align-items: flex-end;
  width: 100%;
  background: rgba(0, 0, 0, 0);
  transition: 0.3s;

  .mask-content {
    width: 100%;
    min-height: 30vh;
    max-height: 70vh;
    overflow-y: scroll;
    background: #f3f3f3;
    transition: 0.3s;
    transform: translateY(100%);
  }
  &.none {
    display: none;
  }
  &.show {
    background: rgba(0, 0, 0, 0.4);

    .mask-content {
      transform: translateY(0);
    }
  }
}

/* 优惠券列表 */
.coupon-item {
  display: flex;
  flex-direction: column;
  margin: 20rpx 24rpx;
  background: #ffffff;
  .con {
    position: relative;
    display: flex;
    align-items: center;
    height: 120rpx;
    padding: 0 30rpx;
    &::after {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0;
      content: '';
      border-bottom: 1px dashed #f3f3f3;
      transform: scaleY(50%);
    }
  }
  .left {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    height: 100rpx;
    overflow: hidden;
  }
  .title {
    margin-bottom: 10rpx;
    font-size: 32rpx;
    color: $font-color-dark;
  }
  .time {
    font-size: 24rpx;
    color: $font-color-light;
  }
  .right {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100rpx;
    font-size: 26rpx;
    color: $font-color-base;
  }
  .price {
    font-size: 44rpx;
    color: $base-color;
    &::before {
      font-size: 34rpx;
      content: '￥';
    }
  }
  .tips {
    padding-left: 30rpx;
    font-size: 24rpx;
    line-height: 60rpx;
    color: $font-color-light;
  }
  .circle {
    position: absolute;
    bottom: -10rpx;
    left: -6rpx;
    z-index: 10;
    width: 20rpx;
    height: 20rpx;
    background: #f3f3f3;
    border-radius: 100px;
    &.r {
      right: -6rpx;
      left: auto;
    }
  }
}
</style>
