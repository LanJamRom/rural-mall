<template>
  <view class="pi-scroll-container">
    <!-- 列表 -->
    <mescroll-uni
      :fixed="false"
      class="pi-scroll"
      :up="upOption"
      :down="downOption"
      @down="downRefresh"
      @up="upRefresh"
      @init="mescrollInit"
    >
      <view class="cart-list">
        <block v-for="(item, index) in cartList" :key="index" @tap="navToDetail(item.id)">
          <view class="cart-item" :class="{ 'b-b': index !== cartList.length - 1 }">
            <view class="image-wrapper">
              <image
                :src="item.mainImage"
                :class="[item.loaded]"
                mode="aspectFill"
                lazy-load
                @load="onImageLoad('cartList', index)"
                @error="onImageError('cartList', index)"
              />
              <view
                class="yticon icon-xuanzhong2 checkbox"
                :class="{ checked: item.cartItem.checked }"
                @click="check('item', index)"
              />
            </view>
            <view class="item-right">
              <text class="clamp title">{{ item.name }}</text>
              <text v-if="item.cartItem && item.cartItem.sub_id" class="attr">{{ item.cartItem.sub_name }}</text>
              <text v-if="item.cartItem && item.cartItem.twice_id" class="attr">
                {{ `/${item.cartItem.twice_name}` }}
              </text>
              <view class="pi-heihgt-40 pi-lh-40">
                <text>¥</text>
                <text class="pi-mg-left-10">{{ item.cartItem.currentUnitPrice * item.cartItem.quantity }}</text>
              </view>
              <uni-number-box
                class="step"
                :min="1"
                :max="item.stock"
                :value="item.cartItem.quantity > item.cartItem.stock ? item.cartItem.stock : item.cartItem.quantity"
                :is-max="item.cartItem.quantity >= item.cartItem.stock ? true : false"
                :is-min="item.cartItem.quantity === 1"
                :index="index"
                @eventChange="numberChange"
              />
            </view>
            <text class="del-btn yticon icon-fork" @click="deleteCartItem(index)" />
          </view>
        </block>
      </view>
    </mescroll-uni>
    <!-- 底部菜单栏 -->
    <view class="action-section">
      <view class="checkbox">
        <image
          :src="allChecked ? '/static/selected.png' : '/static/select.png'"
          mode="aspectFit"
          @click="check('all')"
        />
        <view class="clear-btn" :class="{ show: allChecked }" @click="clearCart">
          清空
        </view>
      </view>
      <view class="total-box">
        <text class="price">¥{{ total }}</text>
        <text class="coupon">
          已优惠
          <text>74.35</text>
          元
        </text>
      </view>
      <button type="primary" class="no-border confirm-btn" @click="createOrder">去结算</button>
    </view>
  </view>
</template>

<script>
import MescrollUni from 'mescroll-uni'
import { apiGetCart, apiUpdateQuantity, apiDelCart } from './api'
import uniNumberBox from '@/src/components/uni-number-box.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapMutations } = createNamespacedHelpers('app')
export default {
  components: {
    uniNumberBox,
    MescrollUni
  },
  data() {
    return {
      total: 0, // 总价格
      allChecked: false, // 全选状态  true|false
      cartList: [],
      downOption: {
        auto: false
      },
      mescroll: null, // mescroll实例对象，不需要定义pageNo, pageSize
      upOption: {
        auto: true,
        page: {
          num: 0,
          size: 10 // 每页数据的数量,默认10
        },
        empty: {
          use: false
        }
      }
    }
  },
  // mounted() {
  //   this.loadData()
  // },
  onShow() {
    this.loadData()
  },
  methods: {
    ...mapMutations(['saveCartItem']),
    async loadData() {
      const {
        data = [],
        head: { ret, msg = '获取购物车列表失败' }
      } = await apiGetCart(this.mescroll.num, this.mescroll.size)
      if (ret !== this.$consts.RET_CODE.SUCCESS) {
        return this.$utils.common.toast.fail(msg)
      }
      if (this.mescroll.num == 1) this.cartList = [] // 如果是第一页需手动制空列表
      const items = data || []
      this.cartList = this.cartList.concat(items)
      this.mescroll.endSuccess(items.length, data.hasNext)
      this.calcTotal() // 计算总价
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
    // 监听image加载完成
    onImageLoad(key, index) {
      this.$set(this[key][index], 'loaded', 'loaded')
    },
    // 监听image加载失败
    onImageError(key, index) {
      this[key][index].image = '/static/errorImage.jpg'
    },
    navToLogin() {
      uni.navigateTo({
        url: '/pages/public/login'
      })
    },
    // 选中状态处理
    check(type, index) {
      if (type === 'item') {
        this.cartList[index].cartItem.checked = !this.cartList[index].cartItem.checked
      } else {
        const checked = !this.allChecked
        const list = this.cartList
        list.forEach(item => {
          item.cartItem.checked = checked
        })
        this.allChecked = checked
      }
      this.calcTotal()
    },
    // 数量
    async numberChange(data) {
      const {
        cartItem: { id }
      } = this.cartList[data.index]
      const {
        head: { ret, msg = '更新失败' }
      } = await apiUpdateQuantity(id, data.number)
      if (ret !== this.$consts.RET_CODE.SUCCESS) {
        return this.$utils.common.toast.fail(msg)
      }
      this.cartList[data.index].cartItem.quantity = data.number
      this.calcTotal()
    },
    // 删除
    async deleteCartItem(index) {
      const id = this.cartList[index].cartItem.id
      this.$utils.common.toast.loading
      const condition = { ids: [id] }
      const {
        head: { ret, msg = '操作失败' }
      } = await apiDelCart(condition)
      if (ret !== this.$consts.RET_CODE.SUCCESS) {
        return this.$utils.common.toast.fail(msg)
      }
      this.$utils.common.toast.hideLoading
      this.cartList.splice(index, 1)
      this.calcTotal()
    },
    // 清空
    clearCart() {
      uni.showModal({
        content: '清空购物车？',
        success: async e => {
          if (e.confirm) {
            this.$utils.common.toast.loading
            const ids = this.cartList.map(item => item.cartItem.id)
            const condition = { ids }
            const {
              head: { ret, msg = '操作失败' }
            } = await apiDelCart(condition)
            if (ret !== this.$consts.RET_CODE.SUCCESS) {
              return this.$utils.common.toast.fail(msg)
            }
            this.$utils.common.toast.hideLoading
            this.cartList = []
          }
        }
      })
    },
    // 计算总价
    calcTotal() {
      if (this.cartList.length === 0) {
        return
      }
      let total = 0
      let checked = true
      this.cartList.forEach(item => {
        if (item.cartItem.checked) {
          total += item.cartItem.currentUnitPrice * item.cartItem.quantity
        }
        !item.cartItem.checked && (checked = false)
      })
      this.allChecked = checked
      this.total = Number(total.toFixed(2))
    },
    // 创建订单
    async createOrder() {
      const list = this.cartList.reduce((curr, prev) => {
        if (prev.cartItem.checked) {
          curr.push(prev)
        }
        return curr
      }, [])
      this.saveCartItem({ list })
      this.$utils.common.navigateTo('src/pages/order/create/index', { type: 'cart' })
    },
    // 调到主页
    navToDetail(id) {
      this.$utils.common.navigateTo('src/pages/product/detail/index', { id })
    }
  }
}
</script>

<style lang="scss">
.container {
  padding-bottom: 134rpx;

  /* 空白页 */
  .empty {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    padding-bottom: 100rpx;
    background: #ffffff;
    image {
      width: 240rpx;
      height: 160rpx;
      margin-bottom: 30rpx;
    }
    .empty-tips {
      display: flex;
      font-size: $font-sm + 2rpx;
      color: $font-color-disabled;
      .navigator {
        margin-left: 16rpx;
        color: $uni-color-primary;
      }
    }
  }
}

/* 购物车列表项 */
.cart-item {
  position: relative;
  display: flex;
  padding: 30rpx 40rpx;
  .image-wrapper {
    position: relative;
    flex-shrink: 0;
    width: 230rpx;
    height: 230rpx;
    image {
      width: 100%;
      height: 100%;
      border-radius: 8rpx;
    }
  }
  .checkbox {
    position: absolute;
    top: -16rpx;
    left: -16rpx;
    z-index: 8;
    padding: 4rpx;
    font-size: 44rpx;
    line-height: 1;
    color: $font-color-disabled;
    background: #ffffff;
    border-radius: 50px;
  }
  .item-right {
    position: relative;
    display: flex;
    flex: 1;
    flex-direction: column;
    padding-left: 30rpx;
    overflow: hidden;
    .title {
      width: 320rpx;
      height: 40rpx;
      overflow: hidden;
      font-size: 24rpx;
      line-height: 40rpx;
      color: $font-color-dark;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .attr {
      height: 50rpx;
      font-size: $font-sm + 2rpx;
      line-height: 50rpx;
      color: $font-color-light;
    }
  }
  .del-btn {
    height: 50rpx;
    padding: 4rpx 10rpx;
    font-size: 34rpx;
    color: $font-color-light;
  }
}

/* 底部栏 */
.action-section {
  position: fixed;
  bottom: 30rpx;
  left: 30rpx;
  z-index: 95;
  display: flex;
  align-items: center;
  width: 690rpx;
  height: 100rpx;
  padding: 0 30rpx;
  margin-bottom: 100rpx;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16rpx;
  box-shadow: 0 0 20rpx 0 rgba(0, 0, 0, 0.5);
  .checkbox {
    position: relative;
    height: 52rpx;
    image {
      position: relative;
      z-index: 5;
      width: 52rpx;
      height: 100%;
    }
  }

  .clear-btn {
    position: absolute;
    top: 0;
    left: 26rpx;
    z-index: 4;
    width: 0;
    height: 52rpx;
    padding-left: 38rpx;
    font-size: $font-base;
    line-height: 52rpx;
    color: #ffffff;
    background: $font-color-disabled;
    border-radius: 0 50px 50px 0;
    opacity: 0;
    transition: 0.2s;
    &.show {
      width: 120rpx;
      opacity: 1;
    }
  }
  .total-box {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding-right: 40rpx;
    text-align: right;
    .price {
      font-size: $font-lg;
      color: $font-color-dark;
    }
    .coupon {
      font-size: $font-sm;
      color: $font-color-light;
      text {
        color: $font-color-dark;
      }
    }
  }
  .confirm-btn {
    height: 76rpx;
    padding: 0 38rpx;
    margin: 0;
    font-size: $font-base + 2rpx;
    line-height: 76rpx;
    background: $uni-color-primary;
    border-radius: 100px;
    box-shadow: 1px 2px 5px rgba(217, 60, 93, 0.72);
  }
}

/* 复选框选中状态 */
.action-section .checkbox.checked,
.cart-item .checkbox.checked {
  color: $uni-color-primary;
}
</style>
