<template>
  <view class="pi-container">
    <swiper-wrap />
    <category />

    <view class="pi-width-100P pi-pd-tb-10" style="height: 210rpx;">
      <image src="/static/img/ad1.jpg" mode="scaleToFill" class="pi-width-100P pi-height-100P" />
    </view>
  </view>
</template>

<script>
import SwiperWrap from './components/swiper-wrap'
import Category from './components/category'
export default {
  components: {
    SwiperWrap,
    Category
  },
  data() {
    return {}
  },
  onLoad() {},
  methods: {}
}
</script>

<style lang="scss"></style>
