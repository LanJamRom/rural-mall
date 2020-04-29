<template>
  <view class="pi-container">
    <view class="left-bottom-sign" />
    <view class="back-btn" @click="navBack">
      <image src="/static/back.png" class="pi-width-50 pi-height-50" />
    </view>
    <view class="right-top-sign" />
    <view class="pi-content pi-flex-column">
      <view class="left-top-sign">LOGIN</view>
      <view class="welcome pi-mg-top-100" style="z-index: 60;" @longtap="longClick">欢迎回来!</view>
      <view class="pi-flex-column pi-justify-between pi-mg-top-50">
        <view class="pi-justify-start pi-align-center pi-solid-bottom-1 pi-pd-18">
          <view class="pi-fz-32">
            <text class="pi-pd-20">+86</text>
            <image src="/static/xiala.png" class="pi-width-35 pi-height-25" />
          </view>
          <input
            v-model="phone"
            type="number"
            placeholder="请输入手机号"
            maxlength="11"
            data-key="mobile"
            class="pi-pd-left-20"
          />
        </view>
        <view class="pi-justify-end pi-align-center pi-solid-bottom-1  pi-height-46 pi-lh-46 pi-mg-top-40 pi-pd-tb-40">
          <input
            v-model="code"
            type="number"
            maxlength="6"
            placeholder="请输入收到的验证码"
            class="pi-pd-left-32 pi-flex-sub"
            @confirm="login"
          />
          <view class="code pi-pd-lr-32 pi-height-46 pi-text-center" @click="getCode">{{ codeMsg }}</view>
        </view>
        <view class="pi-justify-center">
          <button class="confirm-btn" @click="login">登录</button>
        </view>
        <text class="forgetSection pi-justify-center">忘记密码</text>
        <view class="registerSection pi-justify-center">
          <text>还没有账号?</text>
          <text>马上注册</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { apiGetCode, apiLogin } from './api'
export default {
  name: 'Login',
  data() {
    return {
      codeMsg: '获取验证码',
      phone: '',
      code: '',
      timer: null,
      rules: [
        {
          name: 'phone',
          tip: '手机号',
          format: /^[1]([3-9])[0-9]{9}$/,
          formatMsg: '正确的手机号'
        },
        {
          name: 'code',
          tip: '验证码',
          format: /^[0-9]{6}$/,
          formatMsg: '正确的验证码'
        }
      ]
    }
  },
  methods: {
    longClick() {
      this.phone = 13226047873
      this.code = 746495
    },
    navBack() {
      this.$utils.common.navigateBack()
    },
    mobileChange() {},
    async getCode() {
      if (!this.phone) {
        return this.$utils.common.toast.fail('请输入手机号')
      }
      if (!/^[1]([3-9])[0-9]{9}$/.test(this.phone)) {
        return this.$utils.common.toast.fail('请输入正确的手机号')
      }
      let TIME_OUT = 60
      this.timer = setInterval(() => {
        if (TIME_OUT > 0) {
          TIME_OUT--
          this.codeMsg = TIME_OUT + 's'
        } else {
          this.codeMsg = '获取验证码'
          clearInterval(this.timer)
          this.timer = null
        }
      }, 1000)
      const { head: { ret, msg = '请求验证码失败' } = {} } = await apiGetCode(this.phone)
      if (ret !== this.$consts.RET_CODE.SUCCESS) {
        return this.$utils.common.toast.fail(msg)
      }
      return this.$utils.common.toast.success(msg)
    },
    handleFormCheck() {
      return this.rules.every(item => {
        if (this[item.name] === '' || this[item.name].length === 0) {
          this.$utils.common.toast.fail(`请输入${item.tip}`)
          return false
        }
        if (item.format && !item.format.test(this[item.name])) {
          this.$utils.common.toast.fail(`请输入${item.formatMsg}`)
          return false
        }
        return true
      })
    },
    async login() {
      if (this.handleFormCheck) {
        const { phone, code } = this
        const {
          data = [],
          head: { ret, msg = '登录失败' }
        } = await apiLogin(phone, code)
        if (ret !== this.$consts.RET_CODE.SUCCESS) {
          return this.$utils.common.toast.fail(msg)
        }
        await this.$utils.user.saveUserAccount(phone)
        await this.$utils.user.saveTokenid(data.token)
        await this.$utils.user.saveUserInfo(data.user)
        this.$utils.common.switchTab('src/pages/my/index')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pi-container {
  overflow-y: hidden;
}
.right-top-sign {
  position: absolute;
  top: 80rpx;
  right: -30rpx;
  z-index: 95;
  &::before,
  &::after {
    display: block;
    width: 400rpx;
    height: 80rpx;
    content: '';
    background: #b4f3e2;
  }
  &::before {
    border-radius: 0 50px 0 0;
    transform: rotate(50deg);
  }
  &::after {
    position: absolute;
    top: 0;
    right: -198rpx;
    border-radius: 50px 0 0 0;
    transform: rotate(-50deg);

    /* background: pink; */
  }
}
.left-top-sign {
  position: relative;
  top: 170rpx;
  left: -16rpx;
  z-index: 50;
  font-size: 120rpx;
  color: $page-color-base;
}
.left-bottom-sign {
  position: absolute;
  bottom: -320rpx;
  left: -270rpx;
  padding: 180rpx;
  border: 100rpx solid #d0d1fd;
  border-radius: 50%;
}
.back-btn {
  position: absolute;
  top: 40rpx;
  left: 32rpx;
  z-index: 9999;
  padding-top: var(--status-bar-height);
  font-size: 40rpx;
  color: $font-color-dark;
}
.welcome {
  font-size: 46rpx;
  color: #555555;
  text-shadow: 1px 0 1px rgba(0, 0, 0, 0.3);
}
.code {
  width: 206rpx;
  color: #848689;
  border-left: 1px solid #cccccc;
}
.confirm-btn {
  width: 630rpx;
  height: 76rpx;
  margin-top: 70rpx;
  font-size: $font-lg;
  line-height: 76rpx;
  color: #ffffff;
  background: $uni-color-primary;
  border-radius: 50px;
  &::after {
    border-radius: 100px;
  }
}
.forgetSection {
  margin-top: 40rpx;
  font-size: $font-sm + 2rpx;
  color: $font-color-spec;
}
.registerSection {
  z-index: 500;
  margin-top: 480rpx;
  font-size: $font-sm + 2rpx;
  color: $font-color-base;
  & > text:last-child {
    margin-left: 10rpx;
    color: $font-color-spec;
  }
}
</style>
