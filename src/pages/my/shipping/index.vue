<template>
  <view class="pi-container">
    <view v-for="(item, index) in addressList" :key="index" class="list b-b" @click="checkAddress(item)">
      <view class="wrapper">
        <view class="u-box">
          <text class="name">{{ item.receiverName }}</text>
          <text class="mobile">{{ item.receiverPhone }}</text>
        </view>
        <view class="address-box">
          <text v-if="index === 0" class="tag">默认</text>
          <text class="address">{{ item.fullAddress }}</text>
        </view>
      </view>
      <text class="pi-icon-bianji1" @click.stop="addAddress('edit', item)" />
    </view>
    <button class="add-btn" @click="addAddress('add')">新增地址</button>
  </view>
</template>

<script>
import { apiGetShipping } from './api'
export default {
  name: 'Shipping',
  data() {
    return {
      source: 0,
      addressList: [],
      timer: null
    }
  },
  onLoad(option) {
    console.log(option.source)
    this.source = option && option.source
    this.lodaData()
    uni.$on('reFreshShipping', async () => {
      this.lodaData()
    })
  },
  methods: {
    async lodaData() {
      const {
        data = [],
        head: { ret, msg = '获取用户地址列表失败' }
      } = await apiGetShipping()
      if (ret !== this.$consts.RET_CODE.SUCCESS) {
        return this.$utils.common.toast.fail(msg)
      }
      this.addressList = data
    },
    // 选择地址
    checkAddress(item) {
      if (this.source == 1) {
        uni.$emit('shippingSelect', item)
      }
      this.timer = null
      this.timer = setTimeout(() => {
        this.$utils.common.navigateBack()
      }, 250)
    },

    addAddress(type, item) {
      this.$utils.common.navigateTo('src/pages/my/shipping/edit', { type, ...item })
    },
    // 添加或修改成功之后回调
    refreshList(data, type) {
      // 添加或修改后事件，这里直接在最前面添加了一条数据，实际应用中直接刷新地址列表即可
      this.addressList.unshift(data)

      console.log(data, type)
    }
  }
}
</script>

<style lang="scss" scoped>
.pi-container {
  padding-bottom: 120rpx;
}
.list {
  position: relative;
  display: flex;
  align-items: center;
  padding: 20rpx 30rpx;
  background: #ffffff;
}
.wrapper {
  display: flex;
  flex: 1;
  flex-direction: column;
}
.address-box {
  display: flex;
  align-items: center;
  margin-top: 8rpx;
  .tag {
    padding: 4rpx 10rpx;
    margin-right: 10rpx;
    font-size: 20rpx;
    line-height: 1;
    color: $base-color;
    background: #fffafb;
    border: 1px solid #ffb4c7;
    border-radius: 4rpx;
  }
  .address {
    font-size: 24rpx;
    line-height: 1;
    color: $font-color-dark;
  }
}
.u-box {
  margin-top: 16rpx;
  font-size: 28rpx;
  color: $font-color-light;
  .name {
    margin-right: 30rpx;
    color: $font-color-dark;
  }
}
.icon-bianji {
  display: flex;
  align-items: center;
  height: 80rpx;
  padding-left: 30rpx;
  font-size: 40rpx;
  color: $font-color-light;
}

.add-btn {
  position: fixed;
  right: 30rpx;
  bottom: 16rpx;
  left: 30rpx;
  z-index: 95;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 690rpx;
  height: 80rpx;
  font-size: 32rpx;
  color: #ffffff;
  background-color: $base-color;
  border-radius: 10rpx;
  box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
}
</style>
