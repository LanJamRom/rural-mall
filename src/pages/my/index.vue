<template>
  <view class="pi-container">
    <view class="user-section">
      <view class="user-info-box">
        <view class="user-info-box pi-justify-start pi-align-center">
          <image :src="avatar" />
          <text class="pi-mg-left-20 pi-fz-28">{{ userName }}</text>
        </view>
        <view class="vip-card-box">
          <view class="pi-justify-between pi-flex-column">
            <image :src="FILE_HOST + 'vip-card-bg.png'" class="bg-bc" />
            <view class="pi-justify-between">
              <view class="pi-fz-30 pi-align-center pi-justify-start" style="color: #f7d680;">
                <image :src="FILE_HOST + 'zuanshi.png'" class="pi-width-32 pi-height-32" />
                <text class="pi-mg-left-16">
                  DCloud会员
                </text>
              </view>
              <view class="b-btn">立即开通</view>
            </view>
            <text class="pi-pd-lr-20 pi-pd-tb-32 pi-fz-32" style="color: #f7d680;">DCloud Union</text>
            <text class="pi-pd-lr-20 pi-fz-24" style="color: #d8cba9;">开发无bug，一测就上线</text>
          </view>
        </view>
      </view>
    </view>
    <view
      class="cover-container"
      :style="[
        {
          transform: coverTransform,
          transition: coverTransition
        }
      ]"
      @touchstart="coverTouchstart"
      @touchmove="coverTouchmove"
      @touchend="coverTouchend"
    >
      <image :src="FILE_HOST + 'arc.png'" class="arc" />
      <view class="pi-justify-around pi-align-center pi-bg-white pi-radius-10">
        <view class="pi-flex-column-center tj-item">
          <text class="num">128.8</text>
          <text>余额</text>
        </view>
        <view class="pi-flex-column-center tj-item">
          <text class="num">0</text>
          <text>优惠券</text>
        </view>
        <view class="pi-flex-column-center tj-item">
          <text class="num">20</text>
          <text>积分</text>
        </view>
      </view>
      <!-- 订单 -->
      <view class="pi-mg-top-20 pi-pd-tb-28 pi-justify-around pi-align-center pi-radius-10 pi-bg-white">
        <view
          class="pi-flex-column-center pi-fz-24"
          style=" width: 120rpx; height: 120rpx;"
          hover-class="common-hover"
          :hover-stay-time="50"
          @click="navTo('src/pages/order/list/index?state=0')"
        >
          <image :src="FILE_HOST + 'dingdan.png'" class="pi-width-45 pi-height-45" />
          <text class="pi-mg-top-18">全部订单</text>
        </view>
        <view
          class="pi-flex-column-center pi-fz-24"
          style=" width: 120rpx; height: 120rpx;"
          hover-class="common-hover"
          :hover-stay-time="50"
          @click="navTo('src/pages/order/list/index?state=1')"
        >
          <image :src="FILE_HOST + 'daifukuan.png'" class="pi-width-45 pi-height-45" />
          <text class="pi-mg-top-18">代付款</text>
        </view>
        <view
          class="pi-flex-column-center pi-fz-24"
          style=" width: 120rpx; height: 120rpx;"
          hover-class="common-hover"
          :hover-stay-time="50"
          @click="navTo('src/pages/order/list/index?state=2')"
        >
          <image :src="FILE_HOST + 'daishouhuo-.png'" class="pi-width-45 pi-height-45" />
          <text class="pi-mg-top-18">待收货</text>
        </view>
        <view
          class="pi-flex-column-center pi-fz-24"
          style=" width: 120rpx; height: 120rpx;"
          hover-class="common-hover"
          :hover-stay-time="50"
          @click="navTo('src/pages/order/list/index?state=3')"
        >
          <image :src="FILE_HOST + 'tuihuotuikuan.png'" class="pi-width-45 pi-height-45" />
          <text class="pi-mg-top-18">退款售后</text>
        </view>
      </view>
      <!-- 浏览历史 -->
      <view class="pi-pd-top-30 pi-mg-top-20 pi-bg-white pi-radius-10">
        <view class="pi-fz-28 pi-lh-20 pi-mg-left-30 pi-align-center" style="color: #303133;">
          <text class="pi-icon-timefill" style="color: #5eba8f;" />
          <text class="pi-mg-left-16">浏览历史</text>
        </view>
        <scroll-view scroll-x="true" enable-flex class="pi-pd-top-30 pi-pd-lr-30 swap-item">
          <image
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105186633&di=c121a29beece4e14269948d990f9e720&imgtype=0&src=http%3A%2F%2Fimg004.hc360.cn%2Fm8%2FM04%2FDE%2FDE%2FwKhQplZ-QteEBvsbAAAAADUkobU751.jpg"
            mode="aspectFill"
            class="pi-width-100P pi-height-100P pi-radius-10 pi-mg-right-20"
            style=" width: 160rpx; height: 160rpx;"
            @click="navTo"
          />
          <image
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105186633&di=c121a29beece4e14269948d990f9e720&imgtype=0&src=http%3A%2F%2Fimg004.hc360.cn%2Fm8%2FM04%2FDE%2FDE%2FwKhQplZ-QteEBvsbAAAAADUkobU751.jpg"
            mode="aspectFill"
            class="pi-width-100P pi-height-100P pi-radius-10 pi-mg-right-20"
            style=" width: 160rpx; height: 160rpx;"
            @click="navTo"
          />
          <image
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105186633&di=c121a29beece4e14269948d990f9e720&imgtype=0&src=http%3A%2F%2Fimg004.hc360.cn%2Fm8%2FM04%2FDE%2FDE%2FwKhQplZ-QteEBvsbAAAAADUkobU751.jpg"
            mode="aspectFill"
            class="pi-width-100P pi-height-100P pi-radius-10 pi-mg-right-20"
            style=" width: 160rpx; height: 160rpx;"
            @click="navTo"
          />
          <image
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105186633&di=c121a29beece4e14269948d990f9e720&imgtype=0&src=http%3A%2F%2Fimg004.hc360.cn%2Fm8%2FM04%2FDE%2FDE%2FwKhQplZ-QteEBvsbAAAAADUkobU751.jpg"
            mode="aspectFill"
            class="pi-width-100P pi-height-100P pi-radius-10 pi-mg-right-20"
            style=" width: 160rpx; height: 160rpx;"
            @click="navTo"
          />
          <image
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105186633&di=c121a29beece4e14269948d990f9e720&imgtype=0&src=http%3A%2F%2Fimg004.hc360.cn%2Fm8%2FM04%2FDE%2FDE%2FwKhQplZ-QteEBvsbAAAAADUkobU751.jpg"
            mode="aspectFill"
            class="pi-width-100P pi-height-100P pi-radius-10 pi-mg-right-20"
            style=" width: 160rpx; height: 160rpx;"
            @click="navTo"
          />
        </scroll-view>
        <view class="pi-list ">
          <view class="pi-list-item more border pi-pd-30 pi-justify-between">
            <view class="pi-justify-start">
              <view class="pi-width-50">
                <image :src="FILE_HOST + 'wodeqianbao.png'" class="pi-width-35 pi-height-35" />
              </view>
              <text>我的钱包</text>
            </view>
            <view class="tips">您的会员还有3天过期</view>
          </view>
          <view class="pi-list-item more border pi-pd-30" @click="navTo('src/pages/my/shipping/index')">
            <view class="pi-width-50">
              <image :src="FILE_HOST + 'dizhiguanli.png'" class="pi-width-40 pi-height-40" />
            </view>
            <text>地址管理</text>
          </view>
          <view class="pi-list-item more border pi-pd-30 pi-justify-between">
            <view class="pi-justify-start">
              <view class="pi-width-50">
                <image :src="FILE_HOST + 'fenxiang.png'" class="pi-width-40 pi-height-40" />
              </view>
              <text>分享</text>
            </view>
            <text class="tips">邀请好友赢10万大礼</text>
          </view>
          <view class="pi-list-item more border pi-pd-30 pi-justify-between">
            <view class="pi-justify-start">
              <view class="pi-width-50">
                <image :src="FILE_HOST + 'shaidan.png'" class="pi-width-35 pi-height-35" />
              </view>
              <text>晒单</text>
            </view>
            <text class="tips">晒单抢红包</text>
          </view>
          <view class="pi-list-item more border pi-pd-30">
            <view class="pi-width-50">
              <image :src="FILE_HOST + 'wodeqianbao.png'" class="pi-width-35 pi-height-35" />
            </view>
            <text>我的收藏</text>
          </view>
          <view class="pi-list-item more border pi-pd-30" @click="navTo('src/pages/my/setting/index')">
            <view class="pi-width-50">
              <image :src="FILE_HOST + 'setting.png'" class="pi-width-35 pi-height-35" />
            </view>
            <text>设置</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
let startY = 0,
  moveY = 0,
  pageAtTop = true
export default {
  name: 'My',
  data() {
    return {
      FILE_HOST: this.$consts.FILE_HOST,
      coverTransform: 'translateY(0px)',
      coverTransition: '0s',
      moving: false,
      userInfo: this.$utils.user.getUserInfo()
    }
  },
  computed: {
    avatar() {
      if (this.userInfo.avatar) return this.userInfo.avatar
      return this.FILE_HOST + 'defaultavatar.png'
    },
    userName() {
      if (this.userInfo.username) return this.userInfo.username
      return '游客'
    }
  },
  methods: {
    /**
     *  会员卡下拉和回弹
     *  1.关闭bounce避免ios端下拉冲突
     *  2.由于touchmove事件的缺陷（以前做小程序就遇到，比如20跳到40，h5反而好很多），下拉的时候会有掉帧的感觉
     *    transition设置0.1秒延迟，让css来过渡这段空窗期
     *  3.回弹效果可修改曲线值来调整效果，推荐一个好用的bezier生成工具 http://cubic-bezier.com/
     */
    coverTouchstart(e) {
      if (pageAtTop === false) {
        return
      }
      this.coverTransition = 'transform .1s linear'
      startY = e.touches[0].clientY
    },
    coverTouchmove(e) {
      moveY = e.touches[0].clientY
      let moveDistance = moveY - startY
      if (moveDistance < 0) {
        this.moving = false
        return
      }
      this.moving = true
      if (moveDistance >= 80 && moveDistance < 100) {
        moveDistance = 80
      }

      if (moveDistance > 0 && moveDistance <= 80) {
        this.coverTransform = `translateY(${moveDistance}px)`
      }
    },
    coverTouchend() {
      if (this.moving === false) {
        return
      }
      this.moving = false
      this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)'
      this.coverTransform = 'translateY(0px)'
    },
    navTo(path, condition) {
      if (!this.userInfo) {
        return this.$utils.common.navigateTo('src/pages/login-guide/index')
      }
      this.$utils.common.navigateTo(path, condition)
    }
  }
}
</script>

<style lang="scss" scoped>
.more {
  padding-right: 60rpx !important;
  &::before {
    right: 30rpx !important;
  }
}
.user-section {
  position: relative;
  height: 520rpx;
  padding: 100rpx 30rpx 0;
  color: #ffffff;
  background-image: linear-gradient(45deg, #f43f3b, #ec008c);
  .user-info-box {
    height: 180rpx;
    & > image {
      width: 130rpx;
      height: 130rpx;
      border: 5rpx solid #ffffff;
      border-radius: 50%;
    }
  }
  .vip-card-box {
    position: relative;
    height: 240rpx;
    padding: 20rpx 24rpx;
    overflow: hidden;
    background: linear-gradient(to left, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8));
    border-radius: 16rpx 16rpx 0 0;
    .bg-bc {
      position: absolute;
      top: 20rpx;
      right: 0;
      width: 380rpx;
      height: 260rpx;
    }
    .b-btn {
      z-index: 1;
      width: 132rpx;
      font-size: 20rpx;
      line-height: 40rpx;
      color: #36343c;
      text-align: center;
      background: linear-gradient(to left, #f9e6af, #ffd465);
      border-radius: 40rpx;
    }
  }
}
.cover-container {
  position: relative;
  padding: 0 30rpx;
  padding-bottom: 20rpx;
  margin-top: -150rpx;
  background: $page-color-base;
  background: #f5f5f5;
  .arc {
    position: absolute;
    top: -34rpx;
    left: 0;
    width: 100%;
    height: 36rpx;
  }
  .tj-item {
    height: 140rpx;
    font-size: $font-sm;
    color: #75787d;
    .num {
      margin-bottom: 8rpx;
      font-size: $font-lg;
      color: $font-color-dark;
    }
  }
}
.swap-item {
  width: 100%;
  height: 100%;
  overflow: auto hidden;
  white-space: nowrap;
}
.tips {
  margin-right: 20rpx;
  font-size: 26rpx;
  color: #909399;
}
</style>
