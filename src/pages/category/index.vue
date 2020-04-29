<template>
  <view class="pi-scroll-container" style="background-color: #f8f8f8;">
    <scroll-view scroll-y class="left-aside">
      <view
        v-for="(item, idx) in cate"
        :key="item.id"
        class="pi-justify-center pi-align-center pi-width-100P pi-height-100 pi-fz-28 pi-default left-menu"
        :class="{ active: idx === currentIdx }"
        @click="tabTap(idx)"
      >
        {{ item.name }}
      </view>
    </scroll-view>
    <scroll-view
      scroll-with-animation
      scroll-y
      class="pi-pd-left-20 right-aside pi-scroll"
      :scroll-top="tabScrollTop"
      @scroll="handleScroll"
    >
      <view v-for="item in cate" :id="'main-' + item.id" :key="item.id" class="s-list">
        <text class="pi-align-center pi-height-70 pi-pd-top-12 pi-fz-28">{{ item.name }}</text>
        <view class="pi-flex-wrap pi-width-100P pi-pd-top-12 pi-bg-white pi-radius-10">
          <view v-for="second in item.secondCategories" :key="second.id" class="t-item" @click="navTo(second.id)">
            <image :src="second.describeImg" />
            <text>{{ second.name }}</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { getCategory } from './api'
export default {
  name: 'Category',
  data() {
    return {
      cate: [],
      currentIdx: 0,
      tabScrollTop: 0,
      sizeCalcState: false
    }
  },
  onLoad() {
    this.loadData()
  },
  methods: {
    async loadData() {
      const { data = [], head: { ret, msg = '请求分类类别失败' } = {} } = await getCategory()
      if (ret !== this.$consts.RET_CODE.SUCCESS) {
        return this.$utils.common.toast.fail(msg)
      }
      this.cate = data
    },
    // 一级分类点击
    tabTap(idx) {
      if (!this.sizeCalcState) {
        this.calcTabHeight()
      }
      this.currentIdx = idx
      this.tabScrollTop = this.cate[idx].top
    },
    // 右侧栏滚动
    handleScroll(e) {
      if (!this.sizeCalcState) {
        this.calcTabHeight()
      }
      let scrollTop = e.detail.scrollTop
      let tabs = this.cate.filter(item => item.top >= scrollTop)
      if (tabs.length > 0) {
        this.currentIdx = tabs[0].idx
      }
    },
    // 计算右侧栏每个tab的高度等信息
    calcTabHeight() {
      let h = 0
      this.cate.forEach((item, idx) => {
        let view = uni.createSelectorQuery().select('#main-' + item.id)
        view
          .fields(
            {
              size: true
            },
            data => {
              item.top = h
              h += data.height
              item.bottom = h
              item.idx = idx
            }
          )
          .exec()
      })
      this.sizeCalcState = true
    },
    navTo(id) {
      this.$utils.common.navigateTo('src/pages/product/list/index', { secondCategoryId: id })
    }
  }
}
</script>

<style lang="scss" scoped>
.pi-scroll-container {
  flex-direction: row;
  height: calc(100vh - var(--window-bottom) - var(--window-top));
}
.left-aside {
  flex-shrink: 0;
  width: 200rpx;
  height: 100%;
  overflow: hidden;
  background-color: #ffffff;
  .left-menu {
    position: relative;
    &::after {
      position: absolute;
      right: 0;
      left: 0;
      z-index: 3;
      height: 0;
      content: '';
      border-bottom: 1px solid #e4e7ed;
      transform: scaleY(0.5);
    }
    &.active {
      color: $pi-primary-color;
      background: #f8f8f8;
      &::before {
        position: absolute;
        top: 50%;
        left: 0;
        width: 8rpx;
        height: 36rpx;
        content: '';
        background-color: $pi-primary-color;
        border-radius: 0 8rpx 8rpx 0;
        opacity: 0.8;
        transform: translateY(-50%);
      }
    }
  }
}
.right-aside {
  flex: 1;
  height: 100%;
  overflow: hidden;
}
.t-item {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 176rpx;
  padding-bottom: 20rpx;
  font-size: 26rpx;
  color: #666666;

  image {
    width: 140rpx;
    height: 140rpx;
  }
}
</style>
