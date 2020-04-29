<template>
  <view class="app">
    <view class="price-box">
      <text>支付金额</text>
      <text class="price">{{ $store.getters.totalPrice }}</text>
    </view>

    <view class="pay-type-list">
      <view class="type-item b-b" @click="changePayType(1)">
        <text class="icon yticon icon-weixinzhifu" />
        <view class="con">
          <text class="tit">微信支付</text>
          <text>推荐使用微信支付</text>
        </view>
        <label class="radio">
          <radio value="" color="#fa436a" :checked="payType == 1" />
        </label>
      </view>
      <view class="type-item b-b" @click="changePayType(2)">
        <text class="icon yticon icon-alipay" />
        <view class="con">
          <text class="tit">支付宝支付</text>
        </view>
        <label class="radio">
          <radio value="" color="#fa436a" :checked="payType == 2" />
        </label>
      </view>
      <view class="type-item" @click="changePayType(3)">
        <text class="icon yticon icon-erjiye-yucunkuan" />
        <view class="con">
          <text class="tit">预存款支付</text>
          <text>可用余额 ¥198.5</text>
        </view>
        <label class="radio">
          <radio value="" color="#fa436a" :checked="payType == 3" />
        </label>
      </view>
    </view>

    <text class="mix-btn" @click="confirm">确认支付</text>
  </view>
</template>

<script>
import { apiUpdateOrder } from '../api'
export default {
  data() {
    return {
      payType: 1,
      orderInfo: {},
      id: ''
    }
  },
  onLoad(options) {
    this.id = options && options.id
  },
  methods: {
    // 选择支付方式
    changePayType(type) {
      this.payType = type
    },
    // 确认支付
    async confirm() {
      const {
        head: { ret, msg = '更新失败' }
      } = await apiUpdateOrder(this.id, 20)
      if (ret !== this.$consts.RET_CODE.SUCCESS) return this.$utils.common.toast.fail(msg)
      this.$utils.common.navigateTo('src/pages/order/create/pay/paySuccess')
    }
  }
}
</script>

<style lang="scss" scoped>
.app {
  width: 100%;
}

.price-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 265rpx;
  font-size: 28rpx;
  color: #909399;
  background-color: #ffffff;

  .price {
    margin-top: 12rpx;
    font-size: 50rpx;
    color: #303133;
    &::before {
      font-size: 40rpx;
      content: '￥';
    }
  }
}

.pay-type-list {
  padding-left: 60rpx;
  margin-top: 20rpx;
  background-color: #ffffff;

  .type-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 120rpx;
    padding: 20rpx 0;
    padding-right: 60rpx;
    font-size: 30rpx;
  }

  .icon {
    width: 100rpx;
    font-size: 52rpx;
  }
  .icon-erjiye-yucunkuan {
    color: #fe8e2e;
  }
  .icon-weixinzhifu {
    color: #36cb59;
  }
  .icon-alipay {
    color: #01aaef;
  }
  .tit {
    margin-bottom: 4rpx;
    font-size: $font-lg;
    color: $font-color-dark;
  }
  .con {
    display: flex;
    flex: 1;
    flex-direction: column;
    font-size: $font-sm;
    color: $font-color-light;
  }
}
.mix-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 630rpx;
  height: 80rpx;
  margin: 80rpx auto 30rpx;
  font-size: $font-lg;
  color: #ffffff;
  background-color: $base-color;
  border-radius: 10rpx;
  box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
}
</style>
