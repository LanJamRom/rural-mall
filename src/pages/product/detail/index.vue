<template>
  <view class="container">
    <view class="carousel">
      <swiper indicator-dots circular="true" duration="400">
        <swiper-item v-for="(item, index) in detail.subImages" :key="index" class="swiper-item">
          <view class="image-wrapper">
            <image :src="item" class="loaded" mode="scaleToFill" />
          </view>
        </swiper-item>
      </swiper>
    </view>

    <view class="introduce-section">
      <text class="title">{{ detail.name }}</text>
      <view class="price-box">
        <text class="price-tip">¥</text>
        <text class="price">{{ detail.price }}</text>
        <text class="m-price">¥{{ detail.price * 1.3 }}</text>
        <text class="coupon-tip">7折</text>
      </view>
      <view v-if="detail.extra" class="bot-row">
        <text>销量: {{ detail.extra.sales }}</text>
        <text>库存: {{ detail.stock }}</text>
        <text>浏览量: {{ detail.extra.visit_num }}</text>
      </view>
    </view>

    <!--  分享 -->
    <view v-if="detail.subtitle" class="share-section" @click="share">
      <view class="share-icon">
        <text class="yticon icon-xingxing" />
        返
      </view>
      <view class="tit pi-align-center" style="font-size: 20rpx;">{{ detail.subtitle }}</view>
      <text class="yticon icon-bangzhu1" />
      <view class="share-btn">
        立即分享
        <text class="yticon icon-you" />
      </view>
    </view>

    <view class="c-list">
      <view v-show="detail.ProductSpus && detail.ProductSpus.length" class="c-row b-b" @click="toggleSpec">
        <text class="tit">购买类型</text>
        <view class="con">
          <text v-for="(sItem, sIndex) in specSelected" :key="sIndex" class="selected-text">
            {{ sItem.name }}
          </text>
        </view>
        <text class="yticon icon-you" />
      </view>
      <view class="c-row b-b">
        <text class="tit">优惠券</text>
        <text class="con t-r red">领取优惠券</text>
        <text class="yticon icon-you" />
      </view>
      <view class="c-row b-b">
        <text class="tit">促销活动</text>
        <view class="con-list">
          <text>新人首单送20元无门槛代金券</text>
          <text>订单满50减10</text>
          <text>订单满100减30</text>
          <text>单笔购买满两件免邮费</text>
        </view>
      </view>
      <view class="c-row b-b">
        <text class="tit">服务</text>
        <view class="bz-list con">
          <text>7天无理由退换货 ·</text>
          <text>假一赔十 ·</text>
        </view>
      </view>
    </view>

    <!-- 评价 -->
    <view class="eva-section">
      <view class="e-header">
        <text class="tit">评价</text>
        <text>(86)</text>
        <text class="tip">好评率 100%</text>
        <text class="yticon icon-you" />
      </view>
      <view class="eva-box">
        <image
          class="portrait"
          src="http://img3.imgtn.bdimg.com/it/u=1150341365,1327279810&fm=26&gp=0.jpg"
          mode="aspectFill"
        />
        <view class="right">
          <text class="name">Leo yo</text>
          <text class="con">商品收到了，79元两件，质量不错，试了一下有点瘦，但是加个外罩很漂亮，我很喜欢</text>
          <view class="bot">
            <text class="attr">购买类型：XL 红色</text>
            <text class="time">2019-04-01 19:21</text>
          </view>
        </view>
      </view>
    </view>

    <view class="detail-desc">
      <view class="d-header">
        <text>图文详情</text>
      </view>
      <view class="pi-width-100P pi-flex-column">
        <view class="pi-flex-column">
          <view class="pi-pd-32">
            <text class="pi-fz-26" style="color: rgb(102, 102, 102);">品牌名称：</text>
            <text class="pi-fz-26" style=" color: rgb(51, 51, 51);">{{ detail.brand }}</text>
          </view>
          <view v-if="hasSpcs" class="pi-pd-lr-32 pi-fz-24" style="color: #999999;">
            产品参数:
          </view>
          <view class="pi-pd-32">
            <view v-if="hasSpcs" class="pi-grid pi-col-3 pi-col-space-20 pi-fz-20" stlye="color: #666666;">
              <view v-for="spc in detail.ProductSpcs" :key="spc.id">
                <text>{{ spc.spc_name }}：</text>
                <text>{{ spc.spc_value }}</text>
              </view>
            </view>
          </view>
        </view>
        <view v-for="(imgDetail, idx) in detail.imageDetails" :key="idx" class="pi-width-100P">
          <image class="pi-width-100P" :src="imgDetail" mode="widthFix" />
        </view>
      </view>
    </view>

    <!-- 底部操作菜单 -->
    <view class="page-bottom">
      <navigator url="/pages/index/index" open-type="switchTab" class="p-b-btn">
        <text class="yticon icon-xiatubiao--copy" />
        <text>首页</text>
      </navigator>
      <navigator url="/pages/cart/cart" open-type="switchTab" class="p-b-btn">
        <text class="yticon icon-gouwuche" />
        <text>购物车</text>
      </navigator>
      <view class="p-b-btn" :class="{ active: favorite }" @click="toFavorite">
        <text class="yticon icon-shoucang" />
        <text>收藏</text>
      </view>

      <view class="action-btn-group">
        <button type="primary" class=" action-btn no-border buy-now-btn" @click="buy">立即购买</button>
        <button type="primary" class=" action-btn no-border add-cart-btn" @click="add">加入购物车</button>
      </view>
    </view>

    <!-- 规格-模态层弹窗 -->
    <view class="popup spec" :class="specClass" @touchmove.stop.prevent="stopPrevent" @click="toggleSpec">
      <!-- 遮罩层 -->
      <view class="mask" />
      <view class="layer attr-content" @click.stop="stopPrevent">
        <view class="a-t">
          <image :src="detail.mainImage" />
          <view class="right">
            <text class="price">¥{{ price }}</text>
            <text class="stock">库存：{{ stock }}件</text>
            <view class="selected">
              已选：
              <text v-for="(sItem, sIndex) in specSelected" :key="sIndex" class="selected-text">
                {{ sItem.name }}
              </text>
            </view>
          </view>
        </view>
        <view v-for="(spu, idx) in detail.ProductSpus" :key="spu.id" class="attr-list">
          <text>{{ spu.spu_name }}</text>
          <view class="item-list">
            <text
              v-for="sku in spu.ProductSkus"
              :key="sku.id"
              class="tit"
              :class="{ selected: specSelected[idx].id === sku.id }"
              @click="selectSpec(idx, sku.id, sku.sku_name)"
            >
              {{ sku.sku_name }}
            </text>
          </view>
        </view>
        <button class="btn" @click="toggleSpec">完成</button>
      </view>
    </view>
    <!-- 分享 -->
    <!-- <share ref="share" :content-height="580" :share-list="shareList" /> -->
  </view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapMutations } = createNamespacedHelpers('app')
import { apiGetProductDetail, apiAddToCart, apiAddToOrder } from './api'
// import share from '@/components/share'
export default {
  components: {
    // share
  },
  data() {
    return {
      id: '',
      detail: {},
      specClass: 'none',
      specSelected: [],
      stock: '',
      price: '',
      favorite: true,
      shareList: []
    }
  },
  onLoad(options) {
    this.id = options.id
    this.loadData()
  },
  computed: {
    hasSpcs() {
      return this.detail.ProductSpcs && this.detail.ProductSpcs.length
    }
  },
  watch: {
    specSelected: {
      deep: true,
      handler(val) {
        if (val.length && val.findIndex(item => item.id === '') === -1) {
          const { ProductStocks } = this.detail
          const [sub_id, twice_id] = this.specSelected.map(item => item.id)
          const productStock = ProductStocks.find(item => {
            if (twice_id) {
              return (
                (item.subId === sub_id && item.twiceId === twice_id) ||
                (item.subId === twice_id && item.twiceId === sub_id)
              )
            } else {
              return item.subId === sub_id
            }
          })
          this.price = productStock.price
          this.stock = productStock.stock
        }
      }
    }
  },
  methods: {
    ...mapMutations(['saveCartItem']),
    async loadData() {
      const {
        data = {},
        head: { ret, msg = '请求失败' }
      } = await apiGetProductDetail(this.id)
      if (ret !== this.$consts.RET_CODE.SUCCESS) return this.$utils.common.toast.fail(msg)
      this.detail = data
      this.initData()
    },
    initData() {
      const length = this.detail.ProductSpus.length
      for (let i = 0; i < length; i++) {
        const itemSelect = { id: '', name: '' }
        i === 0 && (itemSelect.name = '请选择类型')
        this.specSelected.push(itemSelect)
      }
      this.stock = this.detail.stock
      this.price = this.detail.price
    },
    // 规格弹窗开关
    toggleSpec() {
      if (this.specClass === 'show') {
        this.specClass = 'hide'
        setTimeout(() => {
          this.specClass = 'none'
        }, 250)
      } else if (this.specClass === 'none') {
        this.specClass = 'show'
      }
    },
    // 选择规格
    selectSpec(idx, id, name) {
      this.specSelected[idx].id = id
      this.specSelected[idx].name = name
      console.log('已选规格：', this.specSelected)
    },
    // 分享
    share() {
      this.$refs.share.toggleMask()
    },
    // 收藏
    toFavorite() {
      this.favorite = !this.favorite
    },
    validateData(...argu) {
      const count = this.detail.ProductSpus.length
      if (count) {
        let i = 0
        argu.forEach(item => item && i++)
        console.log('i:', i)
        if (i !== count) {
          this.$utils.common.toast.info('请先选择规格')
          return false
        }
        return true
      }
      return true
    },
    // 加入购物车
    async add() {
      const [sub_id, twice_id] = this.specSelected.map(item => item.id)
      if (this.validateData(sub_id, twice_id)) {
        const { head: { ret, msg = '加入购物车失败' } = {} } = await apiAddToCart(this.detail.id, sub_id, twice_id)
        if (ret !== this.$consts.RET_CODE.SUCCESS) {
          return this.$utils.common.toast.fail(msg)
        }
        return this.$utils.common.toast.success('加入购物车成功')
      }
    },
    async buy() {
      const [sub_id = '', twice_id = ''] = this.specSelected.map(item => item.id)
      if (this.validateData(sub_id, twice_id)) {
        const list = []
        const { id, name, mainImage } = this.detail
        const cartObj = {
          id,
          name,
          mainImage,
          cartItem: {
            sub_id: '',
            sub_name: '',
            twice_id: '',
            twice_name: '',
            currentUnitPrice: this.price,
            quantity: 1
          }
        }
        this.specSelected.map((item, idx) => {
          if (idx === 0) {
            cartObj.cartItem.sub_id = item.id
            cartObj.cartItem.sub_name = item.name
          }
          if (idx === 1) {
            cartObj.cartItem.twice_id = item.id
            cartObj.cartItem.twice_name = item.name
          }
        })
        list.push(cartObj)
        this.saveCartItem({ list })
        this.$utils.common.navigateTo('src/pages/order/create/index', { type: 'prod' })
      }
    },
    stopPrevent() {}
  }
}
</script>

<style lang="scss">
.contaniner {
  padding-bottom: 160rpx;
  background: $page-color-base;
}
.icon-you {
  font-size: $font-base + 2rpx;
  color: #888888;
}
.carousel {
  position: relative;
  height: 722rpx;
  swiper {
    height: 100%;
  }
  .image-wrapper {
    width: 100%;
    height: 100%;
  }
  .swiper-item {
    display: flex;
    align-content: center;
    justify-content: center;
    height: 750rpx;
    overflow: hidden;
    image {
      width: 100%;
      height: 100%;
    }
  }
}

/* 标题简介 */
.introduce-section {
  padding: 20rpx 30rpx;
  background: #ffffff;

  .title {
    height: 50rpx;
    font-size: 32rpx;
    line-height: 50rpx;
    color: $font-color-dark;
  }
  .price-box {
    display: flex;
    align-items: baseline;
    height: 64rpx;
    padding: 10rpx 0;
    font-size: 26rpx;
    color: $uni-color-primary;
  }
  .price {
    font-size: $font-lg + 2rpx;
  }
  .m-price {
    margin: 0 12rpx;
    color: $font-color-light;
    text-decoration: line-through;
  }
  .coupon-tip {
    align-items: center;
    padding: 4rpx 10rpx;
    font-size: $font-sm;
    line-height: 1;
    color: #ffffff;
    background: $uni-color-primary;
    border-radius: 6rpx;
    transform: translateY(-4rpx);
  }
  .bot-row {
    display: flex;
    align-items: center;
    height: 50rpx;
    font-size: $font-sm;
    color: $font-color-light;
    text {
      flex: 1;
    }
  }
}

/* 分享 */
.share-section {
  display: flex;
  align-items: center;
  padding: 12rpx 30rpx;
  color: $font-color-base;
  background: linear-gradient(left, #fdf5f6, #fbebf6);
  .share-icon {
    position: relative;
    display: flex;
    align-items: center;
    width: 70rpx;
    height: 30rpx;
    overflow: hidden;
    font-size: 22rpx;
    line-height: 1;
    color: $uni-color-primary;
    border: 1px solid $uni-color-primary;
    border-radius: 4rpx;
    &::after {
      position: absolute;
      top: -12rpx;
      left: -20rpx;
      width: 50rpx;
      height: 50rpx;
      content: '';
      background: $uni-color-primary;
      border-radius: 50%;
    }
  }
  .icon-xingxing {
    position: relative;
    z-index: 1;
    margin-right: 10rpx;
    margin-left: 2rpx;
    font-size: 24rpx;
    line-height: 1;
    color: #ffffff;
  }
  .tit {
    margin-left: 10rpx;
    font-size: $font-base;
  }
  .icon-bangzhu1 {
    padding: 10rpx;
    font-size: 30rpx;
    line-height: 1;
  }
  .share-btn {
    flex: 1;
    font-size: $font-sm;
    color: $uni-color-primary;
    text-align: right;
  }
  .icon-you {
    margin-left: 4rpx;
    font-size: $font-sm;
    color: $uni-color-primary;
  }
}

.c-list {
  font-size: $font-sm + 2rpx;
  color: $font-color-base;
  background: #ffffff;
  .c-row {
    position: relative;
    display: flex;
    align-items: center;
    padding: 20rpx 30rpx;
  }
  .tit {
    width: 140rpx;
  }
  .con {
    flex: 1;
    color: $font-color-dark;
    .selected-text {
      margin-right: 10rpx;
    }
  }
  .bz-list {
    height: 40rpx;
    font-size: $font-sm + 2rpx;
    color: $font-color-dark;
    text {
      display: inline-block;
      margin-right: 30rpx;
    }
  }
  .con-list {
    display: flex;
    flex: 1;
    flex-direction: column;
    line-height: 40rpx;
    color: $font-color-dark;
  }
  .red {
    color: $uni-color-primary;
  }
}

/* 评价 */
.eva-section {
  display: flex;
  flex-direction: column;
  padding: 20rpx 30rpx;
  margin-top: 16rpx;
  background: #ffffff;
  .e-header {
    display: flex;
    align-items: center;
    height: 70rpx;
    font-size: $font-sm + 2rpx;
    color: $font-color-light;
    .tit {
      margin-right: 4rpx;
      font-size: $font-base + 2rpx;
      color: $font-color-dark;
    }
    .tip {
      flex: 1;
      text-align: right;
    }
    .icon-you {
      margin-left: 10rpx;
    }
  }
}
.eva-box {
  display: flex;
  padding: 20rpx 0;
  .portrait {
    flex-shrink: 0;
    width: 80rpx;
    height: 80rpx;
    border-radius: 100px;
  }
  .right {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding-left: 26rpx;
    font-size: $font-base;
    color: $font-color-base;
    .con {
      padding: 20rpx 0;
      font-size: $font-base;
      color: $font-color-dark;
    }
    .bot {
      display: flex;
      justify-content: space-between;
      font-size: $font-sm;
      color: $font-color-light;
    }
  }
}

/*  详情 */
.detail-desc {
  margin-top: 16rpx;
  background: #ffffff;
  .d-header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80rpx;
    font-size: $font-base + 2rpx;
    color: $font-color-dark;

    text {
      position: relative;
      z-index: 1;
      padding: 0 20rpx;
      background: #ffffff;
    }
    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 300rpx;
      height: 0;
      content: '';
      border-bottom: 1px solid #cccccc;
      transform: translateX(-50%);
    }
  }
}

/* 规格选择弹窗 */
.attr-content {
  padding: 10rpx 30rpx;
  .a-t {
    display: flex;
    image {
      flex-shrink: 0;
      width: 170rpx;
      height: 170rpx;
      margin-top: -40rpx;
      border-radius: 8rpx;
    }
    .right {
      display: flex;
      flex-direction: column;
      padding-left: 24rpx;
      font-size: $font-sm + 2rpx;
      line-height: 42rpx;
      color: $font-color-base;
      .price {
        margin-bottom: 10rpx;
        font-size: $font-lg;
        color: $uni-color-primary;
      }
      .selected-text {
        margin-right: 10rpx;
      }
    }
  }
  .attr-list {
    display: flex;
    flex-direction: column;
    padding-top: 30rpx;
    padding-left: 10rpx;
    font-size: $font-base + 2rpx;
    color: $font-color-base;
  }
  .item-list {
    display: flex;
    flex-wrap: wrap;
    padding: 20rpx 0 0;
    text {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 60rpx;
      height: 60rpx;
      padding: 0 20rpx;
      margin-right: 20rpx;
      margin-bottom: 20rpx;
      font-size: $font-base;
      color: $font-color-dark;
      background: #eeeeee;
      border-radius: 100rpx;
    }
    .selected {
      color: $uni-color-primary;
      background: #fbebee;
    }
  }
}

/*  弹出层 */
.popup {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;

  &.show {
    display: block;
    .mask {
      animation: showPopup 0.2s linear both;
    }
    .layer {
      animation: showLayer 0.2s linear both;
    }
  }
  &.hide {
    .mask {
      animation: hidePopup 0.2s linear both;
    }
    .layer {
      animation: hideLayer 0.2s linear both;
    }
  }
  &.none {
    display: none;
  }
  .mask {
    position: fixed;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .layer {
    position: fixed;
    bottom: 0;
    z-index: 99;
    width: 100%;
    min-height: 40vh;
    background-color: #ffffff;
    border-radius: 10rpx 10rpx 0 0;
    .btn {
      height: 66rpx;
      margin: 30rpx auto 20rpx;
      font-size: $font-base + 2rpx;
      line-height: 66rpx;
      color: #ffffff;
      background: $uni-color-primary;
      border-radius: 100rpx;
    }
  }

  @keyframes showPopup {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes hidePopup {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes showLayer {
    0% {
      transform: translateY(120%);
    }
    100% {
      transform: translateY(0%);
    }
  }

  @keyframes hideLayer {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(120%);
    }
  }
}

/* 底部操作菜单 */
.page-bottom {
  position: fixed;
  bottom: 30rpx;
  left: 30rpx;
  z-index: 95;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 690rpx;
  height: 100rpx;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16rpx;
  box-shadow: 0 0 20rpx 0 rgba(0, 0, 0, 0.5);

  .p-b-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 96rpx;
    height: 80rpx;
    font-size: $font-sm;
    color: $font-color-base;
    .yticon {
      font-size: 40rpx;
      line-height: 48rpx;
      color: $font-color-light;
    }
    &.active,
    &.active .yticon {
      color: $uni-color-primary;
    }
    .icon-fenxiang2 {
      font-size: 42rpx;
      transform: translateY(-2rpx);
    }
    .icon-shoucang {
      font-size: 46rpx;
    }
  }
  .action-btn-group {
    position: relative;
    display: flex;
    height: 76rpx;
    margin-left: 20rpx;
    overflow: hidden;
    background: linear-gradient(to right, #ffac30, #fa436a, #f56c6c);
    border-radius: 100px;
    box-shadow: 0 20rpx 40rpx -16rpx #fa436a;
    box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
    &::after {
      position: absolute;
      top: 50%;
      right: 50%;
      width: 0;
      height: 28rpx;
      content: '';
      border-right: 1px solid rgba(255, 255, 255, 0.5);
      transform: translateY(-50%);
    }
    .action-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 180rpx;
      height: 100%;
      padding: 0;
      font-size: $font-base;
      background: transparent;
      border-radius: 0;
    }
  }
}
</style>
