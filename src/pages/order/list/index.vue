<template>
  <view class="content">
    <view class="navbar">
      <view
        v-for="(item, index) in navList"
        :key="index"
        class="nav-item"
        :class="{ current: tabCur == index }"
        @click="tabClick(index)"
      >
        {{ item.text }}
      </view>
    </view>

    <swiper :current="tabCur" class="swiper-box" duration="300" @change="changeTab">
      <swiper-item v-for="(tabItem, tabIndex) in navList" :key="tabIndex" class="tab-content pi-scroll">
        <order-item-list :tab-index="tabIndex" :tab-cur="tabCur" :status="tabItem.state" />
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import OrderItemList from './components/order-item-list'
export default {
  components: {
    OrderItemList
  },
  data() {
    return {
      tabCur: 0,
      navList: [
        {
          state: 0,
          text: '全部'
        },
        {
          state: 10,
          text: '待付款'
        },
        {
          state: 20,
          text: '待发货'
        },
        {
          state: 40,
          text: '待收货'
        },
        {
          state: 50,
          text: '未评价'
        }
      ]
    }
  },

  onLoad(options) {
    this.tabCur = +options.state
  },

  methods: {
    // swiper 切换
    changeTab(e) {
      this.tabCur = e.target.current
    },
    // 顶部tab点击
    tabClick(index) {
      this.tabCur = index
    },
    // 删除订单
    deleteOrder(index) {
      uni.showLoading({
        title: '请稍后'
      })
      setTimeout(() => {
        this.navList[this.tabCur].orderList.splice(index, 1)
        uni.hideLoading()
      }, 600)
    },
    // 取消订单
    cancelOrder(item) {
      uni.showLoading({
        title: '请稍后'
      })
      setTimeout(() => {
        let { stateTip, stateTipColor } = this.orderStateExp(9)
        item = Object.assign(item, {
          state: 9,
          stateTip,
          stateTipColor
        })

        // 取消订单后删除待付款中该项
        let list = this.navList[1].orderList
        let index = list.findIndex(val => val.id === item.id)
        index !== -1 && list.splice(index, 1)

        uni.hideLoading()
      }, 600)
    },

    // 订单状态文字和颜色
    orderStateExp(state) {
      let stateTip = '',
        stateTipColor = '#fa436a'
      switch (+state) {
        case 1:
          stateTip = '待付款'
          break
        case 2:
          stateTip = '待发货'
          break
        case 9:
          stateTip = '订单已关闭'
          stateTipColor = '#909399'
          break

        // 更多自定义
      }
      return { stateTip, stateTipColor }
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
  background: $page-color-base;
}

.swiper-box {
  height: calc(100% - 40px);
}
.list-scroll-content {
  height: 100%;
}

.navbar {
  position: relative;
  z-index: 10;
  display: flex;
  height: 40px;
  padding: 0 5px;
  background: #ffffff;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.06);
  .nav-item {
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 15px;
    color: $font-color-dark;
    &.current {
      color: $base-color;
      &::after {
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 44px;
        height: 0;
        content: '';
        border-bottom: 2px solid $base-color;
        transform: translateX(-50%);
      }
    }
  }
}

.uni-swiper-item {
  height: auto;
}
.order-item {
  display: flex;
  flex-direction: column;
  padding-left: 30rpx;
  margin-top: 16rpx;
  background: #ffffff;
  .i-top {
    position: relative;
    display: flex;
    align-items: center;
    height: 80rpx;
    padding-right: 30rpx;
    font-size: $font-base;
    color: $font-color-dark;
    .time {
      flex: 1;
    }
    .state {
      color: $base-color;
    }
    .del-btn {
      position: relative;
      padding: 10rpx 0 10rpx 36rpx;
      font-size: $font-lg;
      color: $font-color-light;
      &::after {
        position: absolute;
        top: 50%;
        left: 20rpx;
        width: 0;
        height: 30rpx;
        content: '';
        border-left: 1px solid $border-color-dark;
        transform: translateY(-50%);
      }
    }
  }

  /* 多条商品 */
  .goods-box {
    height: 160rpx;
    padding: 20rpx 0;
    white-space: nowrap;
    .goods-item {
      display: inline-block;
      width: 120rpx;
      height: 120rpx;
      margin-right: 24rpx;
    }
    .goods-img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  /* 单条商品 */
  .goods-box-single {
    display: flex;
    padding: 20rpx 0;
    .goods-img {
      display: block;
      width: 120rpx;
      height: 120rpx;
    }
    .right {
      display: flex;
      flex: 1;
      flex-direction: column;
      padding: 0 30rpx 0 24rpx;
      overflow: hidden;
      .title {
        font-size: $font-base + 2rpx;
        line-height: 1;
        color: $font-color-dark;
      }
      .attr-box {
        padding: 10rpx 12rpx;
        font-size: $font-sm + 2rpx;
        color: $font-color-light;
      }
      .price {
        font-size: $font-base + 2rpx;
        color: $font-color-dark;
        &::before {
          margin: 0 2rpx 0 8rpx;
          font-size: $font-sm;
          content: '￥';
        }
      }
    }
  }

  .price-box {
    display: flex;
    align-items: baseline;
    justify-content: flex-end;
    padding: 20rpx 30rpx;
    font-size: $font-sm + 2rpx;
    color: $font-color-light;
    .num {
      margin: 0 8rpx;
      color: $font-color-dark;
    }
    .price {
      font-size: $font-lg;
      color: $font-color-dark;
      &::before {
        margin: 0 2rpx 0 8rpx;
        font-size: $font-sm;
        content: '￥';
      }
    }
  }
  .action-box {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100rpx;
    padding-right: 30rpx;
  }
  .action-btn {
    width: 160rpx;
    height: 60rpx;
    padding: 0;
    margin: 0;
    margin-left: 24rpx;
    font-size: $font-sm + 2rpx;
    line-height: 60rpx;
    color: $font-color-dark;
    text-align: center;
    background: #ffffff;
    border-radius: 100px;
    &::after {
      border-radius: 100px;
    }
    &.recom {
      color: $base-color;
      background: #fff9f9;
      &::after {
        border-color: #f7bcc8;
      }
    }
  }
}
</style>
