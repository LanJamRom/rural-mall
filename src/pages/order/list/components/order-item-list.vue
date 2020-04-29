<template>
  <mescroll-uni
    :fixed="false"
    :up="upOption"
    :down="downOption"
    @down="downRefresh"
    @up="upRefresh"
    @init="mescrollInit"
  >
    <!-- 订单列表 -->
    <view v-for="(item, index) in dataList" :key="index" class="order-item">
      <view class="i-top b-b">
        <text class="time">{{ item.createTime | dateFilter('YYYY-MM-DD HH:mm') }}</text>
        <text class="state" :style="{ color: orderStateExp(item.status).stateTipColor }">
          {{ orderStateExp(item.status).stateTip }}
        </text>
        <text v-if="item.state === 9" class="del-btn yticon icon-iconfontshanchu1" @click="deleteOrder(index)" />
      </view>

      <scroll-view v-if="item.products.length > 1" class="goods-box" scroll-x>
        <view v-for="(goodsItem, goodsIndex) in item.products" :key="goodsIndex" class="goods-item">
          <image class="goods-img" :src="goodsItem.mainImage" mode="aspectFill" />
        </view>
      </scroll-view>
      <view v-if="item.products.length === 1">
        <view v-for="(goodsItem, goodsIndex) in item.products" :key="goodsIndex" class="goods-box-single">
          <image class="goods-img" :src="goodsItem.mainImage" mode="aspectFill" />
          <view class="right">
            <text class="title clamp">{{ goodsItem.name }}</text>
            <text v-if="goodsItem.orderItem.sub_id" class="attr-box">{{ goodsItem.orderItem.sub_name }}</text>
            <text v-if="goodsItem.orderItem.twice_id" class="attr-box">{{ goodsItem.orderItem.twice_name }}</text>
            <text class="attr-box">x {{ goodsItem.orderItem.quantity }}</text>
            <text class="price">{{ goodsItem.orderItem.currentUnitPrice }}</text>
          </view>
        </view>
      </view>

      <view class="price-box pi-solid-bottom-1">
        共
        <text class="num">{{ item.products.length }}</text>
        件商品 实付款
        <text class="price">{{ handleTotalPrice(item.products) }}</text>
      </view>
      <view v-if="item.status === 10" class="action-box">
        <button class="action-btn" @click="cancelOrder(item.id)">取消订单</button>
        <button class="action-btn recom">立即支付</button>
      </view>
    </view>
  </mescroll-uni>
</template>

<script>
import MescrollUni from 'mescroll-uni'
import { apiGetOrder } from '../api'
import { apiUpdateOrder } from '../../create/api'
export default {
  name: 'OrderItemList',
  components: {
    MescrollUni
  },
  props: {
    tabIndex: {
      type: Number,
      required: true
    },
    tabCur: {
      type: Number,
      required: true
    },
    status: {
      type: Number,
      require: true
    }
  },
  data() {
    return {
      dataList: [],
      downOption: {
        auto: false
      },
      mescroll: null, // mescroll实例对象，不需要定义pageNo, pageSize
      upOption: {
        auto: false,
        page: {
          num: 0,
          size: 20 // 每页数据的数量,默认10
        },
        empty: {
          use: false
        }
      },
      isInit: false,
      type: ''
    }
  },
  watch: {
    tabCur(val) {
      if (val === this.tabIndex) {
        this.isInit = true
        this.mescroll.resetUpScroll()
      }
    }
  },
  mounted() {
    if (this.tabCur == this.tabIndex && !this.isInit) {
      this.isInit = true
      this.mescroll.resetUpScroll()
    }
  },
  methods: {
    async loadData() {
      const { data = [], head: { ret, msg = '获取返工申请列表失败' } = {} } = await apiGetOrder(
        this.mescroll.num,
        this.mescroll.size,
        this.status
      )
      if (ret !== this.$consts.RET_CODE.SUCCESS) {
        this.mescroll.endErr()
        return this.$utils.common.toast.fail(msg)
      }

      if (this.mescroll.num == 1) this.dataList = [] // 如果是第一页需手动制空列表
      const items = data || []
      this.dataList = this.dataList.concat(items)
      this.mescroll.endSuccess(items.length, data.hasNext)
    },
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit(mescroll) {
      this.mescroll = mescroll
    },
    downRefresh() {
      this.mescroll.resetUpScroll()
    },
    upRefresh() {
      this.loadData()
    },
    // 删除订单
    deleteOrder(index) {
      uni.showLoading({
        title: '请稍后'
      })
      setTimeout(() => {
        this.navList[this.tabCurrentIndex].orderList.splice(index, 1)
        uni.hideLoading()
      }, 600)
    },
    // 取消订单
    async cancelOrder(id) {
      this.$utils.common.showLoading
      const {
        head: { ret, msg = '取消订单失败' }
      } = await apiUpdateOrder(id, 0)
      if (ret !== this.$consts.RET_CODE.SUCCESS) return this.$utils.common.toast.fail(msg)
      this.$utils.common.toast.success('取消订单成功!')
      this.mescroll.resetUpScroll()
    },

    // 订单状态文字和颜色
    orderStateExp(state) {
      let stateTip = '',
        stateTipColor = '#fa436a'
      switch (+state) {
        case 10:
          stateTip = '待付款'
          break
        case 20:
          stateTip = '待发货'
          break
        case 40:
          stateTip = '已发货'
          break
        case 50:
          stateTip = '订单完成'
          break
        case 60:
          stateTip = '订单已关闭'
          stateTipColor = '#909399'
          break

        // 更多自定义
      }
      return { stateTip, stateTipColor }
    },
    handleTotalPrice(products) {
      let totalPrice = 0
      products.forEach(item => (totalPrice += item.orderItem.currentUnitPrice * item.orderItem.quantity))
      return totalPrice
    }
  }
}
</script>

<style lang="scss" scoped>
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
        display: -webkit-box;
        overflow: hidden;
        font-size: 26rpx;
        color: $font-color-dark;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
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
      border: 1rpx solid rgba(0, 0, 0, 0.2);
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

/* load-more */
.uni-load-more {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 80rpx;
}

.uni-load-more__text {
  font-size: 28rpx;
  color: #999999;
}

.uni-load-more__img {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}

.uni-load-more__img > view {
  position: absolute;
}

.uni-load-more__img > view view {
  position: absolute;
  width: 6px;
  height: 2px;
  background: #999999;
  border-top-left-radius: 1px;
  border-bottom-left-radius: 1px;
  opacity: 0.2;
  transform-origin: 50%;
  animation: load 1.56s ease infinite;
}

.uni-load-more__img > view view:nth-child(1) {
  top: 2px;
  left: 9px;
  transform: rotate(90deg);
}

.uni-load-more__img > view view:nth-child(2) {
  top: 11px;
  right: 0;
  transform: rotate(180deg);
}

.uni-load-more__img > view view:nth-child(3) {
  bottom: 2px;
  left: 9px;
  transform: rotate(270deg);
}

.uni-load-more__img > view view:nth-child(4) {
  top: 11px;
  left: 0;
}

.load1,
.load2,
.load3 {
  width: 24px;
  height: 24px;
}

.load2 {
  transform: rotate(30deg);
}

.load3 {
  transform: rotate(60deg);
}

.load1 view:nth-child(1) {
  animation-delay: 0s;
}

.load2 view:nth-child(1) {
  animation-delay: 0.13s;
}

.load3 view:nth-child(1) {
  animation-delay: 0.26s;
}

.load1 view:nth-child(2) {
  animation-delay: 0.39s;
}

.load2 view:nth-child(2) {
  animation-delay: 0.52s;
}

.load3 view:nth-child(2) {
  animation-delay: 0.65s;
}

.load1 view:nth-child(3) {
  animation-delay: 0.78s;
}

.load2 view:nth-child(3) {
  animation-delay: 0.91s;
}

.load3 view:nth-child(3) {
  animation-delay: 1.04s;
}

.load1 view:nth-child(4) {
  animation-delay: 1.17s;
}

.load2 view:nth-child(4) {
  animation-delay: 1.3s;
}

.load3 view:nth-child(4) {
  animation-delay: 1.43s;
}

@-webkit-keyframes load {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0.2;
  }
}
</style>
