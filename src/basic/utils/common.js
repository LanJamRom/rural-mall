/**
 * 将对象解析成url字符串
 * @param  {Object} obj 参数对象
 * @param  {Boolean} unEncodeURI 不使用编码
 * @return {String} 转换之后的url参数
 */
export const param = (obj = {}, unEncodeURI = false) => {
  const result = []

  for (const name of Object.keys(obj)) {
    const value = obj[name]

    result.push(name + '=' + (unEncodeURI ? value : encodeURIComponent(value)))
  }

  if (result.length) {
    return '?' + result.join('&')
  } else {
    return ''
  }
}

/**
 * 将url字符串解析成对象
 * @param  {String} str 带url参数的地址
 * @param  {Boolean} unDecodeURI 不使用解码
 * @return {Object} 转换之后的url参数
 */
export const unparam = (str = '', unDecodeURI) => {
  const result = {}
  const query = str.split('?')[1]

  if (!query) return result

  const arr = query.split('&')

  arr.forEach((item, idx) => {
    const param = item.split('=')
    const name = param[0]
    const value = param[1] || ''

    if (name) {
      result[name] = unDecodeURI ? value : decodeURIComponent(value)
    }
  })

  return result
}

/**
 * 对Object Params Props进行decode
 * @param {Object} params params
 */
export const decodeParams = params => {
  const convertObject = {}
  for (const paramObject of Object.keys(params)) {
    convertObject[paramObject] = decodeURIComponent(params[paramObject])
  }
  return convertObject
}

/**
 * 保留当前页面，跳转到应用内的某个页面
 * @param {String} url 页面路径
 * @param {Object} params 页面参数
 */
export const navigateTo = (url, params = {}) => {
  return _openInterceptor('navigateTo', url, params)
}

/**
 * 关闭当前页面，跳转到应用内的某个页面
 * @param {String} url 页面路径
 * @param {Object} params 页面参数
 */
export const redirectTo = (url, params = {}) => {
  return _openInterceptor('redirectTo', url, params)
}

/**
 * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
 * @param {String} url 页面路径
 * @param {Object} params 页面参数
 */
export const switchTab = (url, params = {}) => {
  return _openInterceptor('switchTab', url, params)
}

/**
 * 关闭所有页面，打开到应用内的某个页面
 * @param {String} url 页面路径
 * @param {Object} params 页面参数
 */
export const reLaunch = (url, params = {}) => {
  return _openInterceptor('reLaunch', url, params)
}

/**
 * 关闭所有页面，打开到应用内的某个页面
 * @param {String} url 页面路径
 * @param {Object} params 页面参数
 */
export const navigateBack = (...args) => {
  return uni.navigateBack.apply(this, args)
}

/**
 * 页面跳转封装
 * @param {String} method 微信JS方法
 * @param {String} url 页面路径
 * @param {Object} params 页面参数
 */
const _openInterceptor = (method, url, params) => {
  // 处理urls
  if (url.indexOf('/') !== 0) {
    url = '/' + url
  }
  // 处理参数
  params = param(params)
  if (url.indexOf('?') !== -1 && params) {
    url = url + params.replace('?', '&')
  } else {
    url = url + params
  }
  console.log('使用导航：', method, url, params)
  uni.hideKeyboard()
  return uni[method]({ url })
}

/**
 *
 * @param args 向控制台打印日志
 */
export const log = (...args) => {
  console && console.log && console.log.apply(console, args)
}

/**
 * 获取系统信息
 */
export const systemInfo = (() => {
  const info = uni.getSystemInfoSync()
  console.log('当前系统信息为：', info)
  return info
})()

/**
 * 是否iphonex
 */
export const isIpx = () => systemInfo.model.indexOf('iPhone X') !== -1

// toast
export const toast = {
  /**
   * 异步，显示消息提示框，支持 Promise 化使用。
   * @param title
   */
  success(title) {
    return uni.showToast({
      title: title || '成功',
      icon: 'success',
      duration: 1500,
      mask: true
    })
  },
  fail(title) {
    return uni.showToast({
      title: title || '失败',
      // image: '../images/common/error.png',
      icon: 'none',
      duration: 1500,
      mask: true
    })
  },

  /**
   * 异步，显示消息提示框，不带图片，支持 Promise 化使用。
   * @param title
   */
  info(title) {
    return uni.showToast({
      title: title,
      icon: 'none',
      duration: 1500,
      mask: true
    })
  },

  /**
   * 异步，显示 Loading 提示框, 需主动调用 uni.hideLoading 才能关闭提示框，支持 Promise 化使用。
   * @param title
   */
  loading(title = '请稍后', mask = true) {
    return uni.showLoading({
      title,
      mask
    })
  },

  /**
   * 隐藏 loading 提示框
   */
  hideLoading() {
    uni.hideLoading()
  },

  /**
   * 隐藏消息提示框
   */
  hideToast() {
    uni.hideToast()
  }
}
