<template>
  <view class="pi-flex">
    <scroll-view scroll-y class="left-aside">
      <view
        v-for="item in flist"
        :key="item.id"
        class="f-item b-b"
        :class="{ active: item.id === currentId }"
        @click="tabtap(item)"
      >
        {{ item.name }}
      </view>
    </scroll-view>
    <!-- <scroll-view scroll-with-animation scroll-y class="right-aside" :scroll-top="tabScrollTop" @scroll="asideScroll">
      <view v-for="item in slist" :id="'main-' + item.id" :key="item.id" class="s-list">
        <text class="s-item">{{ item.name }}</text>
        <view class="t-list">
          <view
            v-for="titem in tlist"
            v-if="titem.pid === item.id"
            :key="titem.id"
            class="t-item"
            @click="navToList(item.id, titem.id)"
          >
            <image :src="titem.picture" />
            <text>{{ titem.name }}</text>
          </view>
        </view>
      </view>
    </scroll-view> -->
  </view>
</template>

<script>
export default {}
</script>

<style lang="scss">
.left-aside {
  flex-shrink: 0;
  width: 200rpx;
  height: 100%;
}
</style>
