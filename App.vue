<script>
export default {
  onLaunch: function() {
    console.log('App Launch')
  },
  onShow: function() {
    console.log('App Show')
  },
  onHide: function() {
    console.log('App Hide')
  }
}
</script>

<style lang="scss">
/*
	全局公共样式和字体图标
	*/

/* 每个页面公共css */
@import 'src/PiUI-basic/icon.scss';
@import 'src/PiUI-basic/common.scss';
</style>
