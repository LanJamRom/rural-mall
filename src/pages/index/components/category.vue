<template>
  <view class="pi-flex-wrap pi-justify-around pi-align-center pi-pd-tb-32 pi-pd-lr-22">
    <view class="cate-item pi-flex-column-center">
      <image src="/static/img/c3.png" />
      <text>环球美食</text>
    </view>
    <view class="cate-item pi-flex-column-center">
      <image src="/static/img/c5.png" />
      <text>个护美妆</text>
    </view>
    <view class="cate-item pi-flex-column-center">
      <image src="/static/img/c6.png" />
      <text>营养保健</text>
    </view>
    <view class="cate-item pi-flex-column-center">
      <image src="/static/img/c7.png" />
      <text>家居厨卫</text>
    </view>
    <view class="cate-item pi-flex-column-center">
      <image src="/static/img/c8.png" />
      <text>速食生鲜</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'Category',
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss">
.cate-item {
  font-size: 26rpx;
  color: $font-color-dark;
  image {
    width: 88rpx;
    height: 88rpx;
    margin-bottom: 14rpx;
    border-radius: 50%;
    box-shadow: 4rpx 4rpx 20rpx rgba(250, 67, 106, 0.3);
    opacity: 0.7;
  }
}
</style>
