<template>
  <view class="content pi-scroll-container">
    <view class="navbar" :style="{ position: headerPosition, top: headerTop }">
      <view class="nav-item" :class="{ current: filterIndex === 0 }" @click="tabClick(0)">
        综合排序
      </view>
      <view class="nav-item" :class="{ current: filterIndex === 1 }" @click="tabClick(1)">
        销量优先
      </view>
      <view class="nav-item" :class="{ current: filterIndex === 2 }" @click="tabClick(2)">
        <text>价格</text>
        <view class="p-box">
          <text :class="{ active: priceOrder === 1 && filterIndex === 2 }" class="yticon icon-shang" />
          <text :class="{ active: priceOrder === 2 && filterIndex === 2 }" class="yticon icon-shang xia" />
        </view>
      </view>
      <text class="cate-item yticon icon-fenlei1" @click="toggleCateMask('show')" />
    </view>
    <mescroll-uni
      :fixed="false"
      class="pi-scroll"
      :up="upOption"
      :down="downOption"
      @down="downRefresh"
      @up="upRefresh"
      @init="mescrollInit"
    >
      <view class="goods-list">
        <view v-for="(item, index) in goodsList" :key="index" class="goods-item" @click="navToDetailPage(item.id)">
          <view class="image-wrapper">
            <image :src="item.mainImage" mode="aspectFill" />
          </view>
          <text class="title clamp">{{ item.name }}</text>
          <view class="price-box">
            <text class="price">{{ item.price }}</text>
            <text v-if="item.extra">已售 {{ item.extra.sales }}</text>
          </view>
        </view>
      </view>
    </mescroll-uni>

    <view
      class="cate-mask"
      :class="cateMaskState === 0 ? 'none' : cateMaskState === 1 ? 'show' : ''"
      @click="toggleCateMask"
    >
      <view class="cate-content" @click.stop.prevent="stopPrevent" @touchmove.stop.prevent="stopPrevent">
        <scroll-view scroll-y class="cate-list">
          <view v-for="item in cateList" :key="item.id">
            <view class="cate-item b-b two">{{ item.name }}</view>
            <view
              v-for="tItem in item.child"
              :key="tItem.id"
              class="cate-item b-b"
              :class="{ active: tItem.id == cateId }"
              @click="changeCate(tItem)"
            >
              {{ tItem.name }}
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script>
import MescrollUni from 'mescroll-uni'
import { apiGetProdList } from './api'
export default {
  components: {
    MescrollUni
  },
  data() {
    return {
      cateMaskState: 0, // 分类面板展开状态
      headerPosition: 'fixed',
      headerTop: '0px',
      filterIndex: 0,
      cateId: 0, // 已选三级分类id
      priceOrder: 0, // 1 价格从低到高 2价格从高到低
      cateList: [],
      goodsList: [],
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
      },
      condition: {}
    }
  },

  onLoad(options) {
    // #ifdef H5
    this.headerTop = document.getElementsByTagName('uni-page-head')[0].offsetHeight + 'px'
    // #endif
    this.condition.secondCategoryId = options.secondCategoryId
    // this.loadCateList(options.fid, options.sid)
  },
  mounted() {
    this.loadData()
  },
  onPageScroll(e) {
    // 兼容iOS端下拉时顶部漂移
    if (e.scrollTop >= 0) {
      this.headerPosition = 'fixed'
    } else {
      this.headerPosition = 'absolute'
    }
  },
  methods: {
    async loadData() {
      const {
        data,
        head: { ret, msg = '获取商品列表失败' }
      } = await apiGetProdList(this.mescroll.num, this.mescroll.size, this.condition)
      if (ret !== this.$consts.RET_CODE.SUCCESS) return this.$utils.common.toast.fail(msg)
      if (this.mescroll.num == 1) this.goodsList = [] // 如果是第一页需手动制空列表
      const items = data || []
      this.goodsList = this.goodsList.concat(items)
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
    // 加载分类
    async loadCateList(fid, sid) {
      let list = await this.$api.json('cateList')
      let cateList = list.filter(item => item.pid == fid)

      cateList.forEach(item => {
        let tempList = list.filter(val => val.pid == item.id)
        item.child = tempList
      })
      this.cateList = cateList
    },
    // 筛选点击
    tabClick(index) {
      if (this.filterIndex === index && index !== 2) {
        return
      }
      this.filterIndex = index
      if (index === 2) {
        this.priceOrder = this.priceOrder === 1 ? 2 : 1
      } else {
        this.priceOrder = 0
      }
      uni.pageScrollTo({
        duration: 300,
        scrollTop: 0
      })
      if (this.filterIndex === 1) {
        this.condition.orderBy = 'sales,DESC'
      }
      if (this.filterIndex === 2) {
        this.priceOrder === 1 ? (this.condition.orderBy = 'price,ASC') : (this.condition.orderBy = 'price,DESC')
      }
      this.downRefresh()
    },
    // 显示分类面板
    toggleCateMask(type) {
      let timer = type === 'show' ? 10 : 300
      let state = type === 'show' ? 1 : 0
      this.cateMaskState = 2
      setTimeout(() => {
        this.cateMaskState = state
      }, timer)
    },
    // 分类点击
    changeCate(item) {
      this.cateId = item.id
      this.toggleCateMask()
      uni.pageScrollTo({
        duration: 300,
        scrollTop: 0
      })
      this.loadData('refresh', 1)
      uni.showLoading({
        title: '正在加载'
      })
    },
    // 详情
    navToDetailPage(id) {
      this.$utils.common.navigateTo('src/pages/product/detail/index', { id })
    },
    stopPrevent() {}
  }
}
</script>

<style lang="scss">
.content {
  padding-top: 96rpx;
  background: $page-color-base;
}
.navbar {
  position: fixed;
  top: var(--window-top);
  left: 0;
  z-index: 10;
  display: flex;
  width: 100%;
  height: 80rpx;
  background: #ffffff;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.06);
  .nav-item {
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 30rpx;
    color: $font-color-dark;
    &.current {
      color: $base-color;
      &::after {
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 120rpx;
        height: 0;
        content: '';
        border-bottom: 4rpx solid $base-color;
        transform: translateX(-50%);
      }
    }
  }
  .p-box {
    display: flex;
    flex-direction: column;
    .yticon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30rpx;
      height: 14rpx;
      margin-left: 4rpx;
      font-size: 26rpx;
      line-height: 1;
      color: #888888;
      &.active {
        color: $base-color;
      }
    }
    .xia {
      transform: scaleY(-1);
    }
  }
  .cate-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80rpx;
    height: 100%;
    font-size: 44rpx;
    &::after {
      position: absolute;
      top: 50%;
      left: 0;
      width: 0;
      height: 36rpx;
      content: '';
      border-left: 1px solid #dddddd;
      transform: translateY(-50%);
    }
  }
}

/* 分类 */
.cate-mask {
  position: fixed;
  top: var(--window-top);
  bottom: 0;
  left: 0;
  z-index: 95;
  width: 100%;
  background: rgba(0, 0, 0, 0);
  transition: 0.3s;

  .cate-content {
    float: right;
    width: 630rpx;
    height: 100%;
    background: #ffffff;
    transition: 0.3s;
    transform: translateX(100%);
  }
  &.none {
    display: none;
  }
  &.show {
    background: rgba(0, 0, 0, 0.4);

    .cate-content {
      transform: translateX(0);
    }
  }
}
.cate-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  .cate-item {
    position: relative;
    display: flex;
    align-items: center;
    height: 90rpx;
    padding-left: 30rpx;
    font-size: 28rpx;
    color: #555555;
  }
  .two {
    height: 64rpx;
    font-size: 30rpx;
    color: #303133;
    background: #f8f8f8;
  }
  .active {
    color: $base-color;
  }
}

/* 商品列表 */
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 0 30rpx;
  background: #ffffff;
  .goods-item {
    display: flex;
    flex-direction: column;
    width: 48%;
    padding-bottom: 40rpx;
    &:nth-child(2n + 1) {
      margin-right: 4%;
    }
  }
  .image-wrapper {
    width: 100%;
    height: 330rpx;
    overflow: hidden;
    border-radius: 3px;
    image {
      width: 100%;
      height: 100%;
      opacity: 1;
    }
  }
  .title {
    display: -webkit-box;
    overflow: hidden;
    font-size: 28rpx;
    color: $font-color-dark;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .price-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 10rpx;
    margin-top: 10rpx;
    font-size: 24rpx;
    color: $font-color-light;
  }
  .price {
    font-size: $font-lg;
    line-height: 1;
    color: $uni-color-primary;
    &::before {
      font-size: 26rpx;
      content: '￥';
    }
  }
}
</style>
