<template>
  <view class="content">
    <text class="success-icon yticon icon-xuanzhong2" />
    <text class="tit">支付成功</text>

    <view class="btn-group">
      <navigator url="/src/pages/order/list?status=0" open-type="redirect" class="mix-btn">查看订单</navigator>
      <navigator url="/src/pages/index/index" open-type="switchTab" class="mix-btn hollow">返回首页</navigator>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.success-icon {
  margin-top: 100rpx;
  font-size: 160rpx;
  color: #fa436a;
}
.tit {
  font-size: 38rpx;
  color: #303133;
}
.btn-group {
  padding-top: 100rpx;
}
.mix-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 600rpx;
  height: 80rpx;
  margin-top: 30rpx;
  font-size: $font-lg;
  color: #ffffff;
  background-color: $base-color;
  border-radius: 10rpx;
  &.hollow {
    color: #303133;
    background: #ffffff;
    border: 1px solid #cccccc;
  }
}
</style>
