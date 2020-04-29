<template>
  <view class="pi-container">
    <view class="row pi-solid-bottom-1">
      <text class="tit">联系人</text>
      <input
        v-model="addressData.receiverName"
        class="input"
        type="text"
        placeholder="收货人姓名"
        placeholder-class="placeholder"
      />
    </view>
    <view class="row pi-solid-bottom-1">
      <text class="tit">手机号</text>
      <input
        v-model="addressData.receiverPhone"
        class="input pi-height-32 pi-lh-32 pi-fz-24"
        type="number"
        placeholder="收货人手机号码"
        placeholder-class="placeholder"
      />
    </view>
    <view class="row pi-solid-bottom-1">
      <text class="tit">地址</text>
      <input :value="cityLabel" class="input" type="text" placeholder="省市区" placeholder-class="placeholder" />
      <text class="pi-icon-location" @click="chooseLocation" />
    </view>
    <view class="row pi-solid-bottom-1">
      <text class="tit">门牌号</text>
      <input
        v-model="addressData.receiverAddress"
        class="input"
        type="text"
        placeholder="楼号、门牌"
        placeholder-class="placeholder"
      />
    </view>
    <view class="row pi-solid-bottom-1">
      <text class="tit">邮编</text>
      <input
        v-model="addressData.receiverZip"
        class="input"
        type="number"
        placeholder="邮编号吗"
        placeholder-class="placeholder"
      />
    </view>
    <simple-address ref="simpleAddress" theme-color="#007AFF" @onConfirm="onConfirm" />
    <view class="row default-row">
      <text class="tit">设为默认</text>
      <switch :checked="addressData.default" color="#fa436a" @change="switchChange" />
    </view>
    <button class="add-btn" @click="submit">提交</button>
  </view>
</template>

<script>
import SimpleAddress from '@/src/components/simple-address'
import { apiCreateShipping, apiUpdateShipping } from './api'
export default {
  name: 'ShippingEdit',
  components: {
    SimpleAddress
  },
  data() {
    return {
      addressData: {
        receiverName: '',
        receiverPhone: '',
        receiverProvince: '',
        receiverCity: '',
        receiverDistrict: '',
        receiverAddress: '',
        receiverZip: '',
        default: false
      },
      cityLabel: '',
      cityPickerValueDefault: [0, 0, 1],
      rules: [
        {
          name: 'receiverName',
          tip: '联系人'
        },
        {
          name: 'receiverPhone',
          tip: '手机号',
          format: /^[1]([3-9])[0-9]{9}$/,
          formatMsg: '正确的手机号'
        },
        {
          name: 'receiverProvince',
          tip: '省份'
        },
        {
          name: 'receiverCity',
          tip: '城市'
        },
        {
          name: 'receiverDistrict',
          tip: '区域'
        },
        {
          name: 'receiverAddress',
          tip: '详细地址'
        },
        {
          name: 'receiverZip',
          tip: '邮编地址',
          format: /^[0-9]{6}/,
          formatMsg: '正确的邮编地址'
        }
      ]
    }
  },
  onLoad(option) {
    let title = '新增收货地址'
    !!option.default
    if (option.type === 'edit') {
      title = '编辑收货地址'
      delete option.type
      this.addressData = option
      this.addressData.default = option.default === 'false' ? false : true
    }
    this.manageType = option.type
    uni.setNavigationBarTitle({
      title
    })
    console.log(this.addressData)
  },
  mounted() {
    this.handleInitData()
  },
  methods: {
    switchChange(e) {
      this.addressData.default = e.detail.value
    },
    handleInitData() {
      if (!this.addressData.receiverProvince) {
        return (this.cityPickerValueDefault = [0, 0, 1])
      }
      const { receiverProvince, receiverCity, receiverDistrict } = this.addressData
      const addressArr = [receiverProvince, receiverCity, receiverDistrict]
      console.log(addressArr)
      this.cityPickerValueDefault = this.$refs.simpleAddress.queryIndex(addressArr, 'label').index
      this.cityLabel = `${this.addressData.receiverProvince} - ${this.addressData.receiverCity} - ${this.addressData.receiverDistrict}`
    },
    onConfirm(e) {
      console.log(e)
      const { label, labelArr = [] } = e
      if (labelArr.length && label) {
        this.addressData.receiverProvince = labelArr[0]
        this.addressData.receiverCity = labelArr[1]
        this.addressData.receiverDistrict = labelArr[2]
        this.cityLabel = label
      }
    },
    chooseLocation() {
      this.$refs.simpleAddress.open()
    },
    validateForm() {
      return this.rules.every(item => {
        if (this.addressData[item.name] === '' || !this.addressData[item.name].length) {
          this.$utils.common.toast.fail(`请输入${item.tip}`)
          return false
        }
        if (item.format && !item.format.test(this.addressData[item.name])) {
          this.$utils.common.toast.fail(`请输入${item.formatMsg}`)
          return false
        }
        return true
      })
    },
    async submit() {
      if (this.validateForm()) {
        if (!this.addressData.id) {
          const { head: { ret, msg } = {} } = await apiCreateShipping(this.addressData)
          if (ret !== this.$consts.RET_CODE.SUCCESS) {
            return this.$utils.common.toast.fail(msg)
          }
        } else {
          const { head: { ret, msg } = {} } = await apiUpdateShipping(this.addressData)

          if (ret !== this.$consts.RET_CODE.SUCCESS) {
            return this.$utils.common.toast.fail(msg)
          }
        }
        uni.$emit('reFreshShipping')
        this.$utils.common.navigateBack()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pi-container {
  min-height: calc(100vh - var(--window-top));
  padding-top: 16rpx;
  background: $page-color-base;
}

.row {
  position: relative;
  display: flex;
  align-items: center;
  height: 110rpx;
  padding: 0 30rpx;
  background: #ffffff;

  .tit {
    flex-shrink: 0;
    width: 120rpx;
    font-size: 30rpx;
    color: $font-color-dark;
  }
  .input {
    flex: 1;
    font-size: 26rpx;
    color: $font-color-dark;
  }
}
.default-row {
  margin-top: 16rpx;
  .tit {
    flex: 1;
  }
  switch {
    transform: translateX(16rpx) scale(0.9);
  }
}
.add-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 690rpx;
  height: 80rpx;
  margin: 60rpx auto;
  font-size: $font-lg;
  color: #ffffff;
  background-color: $base-color;
  border-radius: 10rpx;
  box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
}
</style>
