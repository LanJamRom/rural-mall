<template>
  <view class="pi-container">
    <view class="pi-list pi-mg-top-15">
      <view class="pi-list-item more border pi-pd-32">个人资料</view>
      <view class="pi-list-item more border pi-pd-32">收货地址</view>
      <view class="pi-list-item more border pi-pd-32">实名认证</view>
    </view>
    <view class="pi-list pi-mg-tb-15">
      <view class="pi-list-item pi-pd-32 pi-justify-between">
        <text>消息推送</text>
        <switch color="#fa436a" @change="handleMsgSend" />
      </view>
    </view>
    <view class="pi-list">
      <view class="pi-list-item border more pi-pd-32">
        清除缓存
      </view>
      <view class="pi-list-item border more pi-pd-32">
        关于
      </view>
      <view class="pi-list-item border more pi-justify-between pi-pd-32">
        <text>检查更新</text>
        <text class="cell-tip">当前版本 1.0.3</text>
      </view>
    </view>
    <view class="pi-list pi-mg-top-15">
      <view class="pi-red pi-pd-32 pi-justify-center" @click="logout">退出登录</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'Setting',
  data() {
    return {}
  },
  methods: {
    handleMsgSend(value) {},
    logout() {
      this.$utils.user.logout('src/pages/login-guide/index')
    }
  }
}
</script>

<style lang="scss" scoped>
.pi-container {
  min-height: calc(100vh - var(--window-top));
  background-color: #f8f8f8;
}
.cell-tip {
  font-size: $font-base;
  color: $font-color-light;
}
</style>
