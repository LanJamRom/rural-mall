import consts from '@/src/consts.js'
import { getTokenid, getUserAccount, reLaunchToLogin, saveTokenid } from './user'

/**
 * 通用uni-app网络请求
 * 基于 Promise 对象实现更简单的 request 使用方式，支持请求和响应拦截
 */
const RETRY_TOKEN_TIME = 3 // 重新获取token次数

let isConnected = true // 当前网络连接
let currentTokenRetry = RETRY_TOKEN_TIME // 当前token刷新次数

// 获取当前网络类型，如果不是无网络，那就是有网络连接
// #ifdef H5
const connection = navigator.connection || navigator.webkitConnection
if (connection && connection.effectiveType) {
  uni.getNetworkType({
    success: function(res) {
      isConnected = res.networkType !== 'none'
    }
  })
}
// #endif

// #ifndef H5
uni.getNetworkType({
  success: function(res) {
    isConnected = res.networkType !== 'none'
  }
})
// #endif

// 检测网络状态，判断网络是否可用
uni.onNetworkStatusChange(function(res) {
  isConnected = res.isConnected
})

/**
 * 无网络连接提示
 */
function noConnectedTip() {
  uni.showToast({
    title: '无网络连接，请检查...',
    icon: 'none',
    duration: 1500,
    mask: true
  })
}

export default {
  config: {
    baseUrl: consts.BASE_URL,
    header: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: {},
    method: 'GET',
    dataType: 'json',
    /* 如设为json，会对返回的数据做一次 JSON.parse */
    responseType: 'text',
    success() {},
    fail() {},
    complete() {}
  },
  interceptor: {
    request: null,
    response: null
  },
  async apiGetToken(account) {
    const loginway = 'bymobile'
    const { data } = await this.get(consts.TOKEN_API, {
      account,
      loginway
    })
    return data
  },
  async refreshTokenIfNeed(response) {
    if (response && response.data && response.data.head && consts.TOKEN_INVALID_CODE.includes(response.data.head.ret)) {
      // 账号还没登录的情况下，跳转登录
      const account = getUserAccount()
      if (!account || !currentTokenRetry) {
        reLaunchToLogin()
        return response
      }
      currentTokenRetry--
      // token过期或没有传token了
      const data = await this.apiGetToken(account)
      if (data && data.head && data.head.ret === 0) {
        currentTokenRetry = RETRY_TOKEN_TIME // 重置token重试次数
        // 刷新token成功 保存token
        const accessToken = data.data && data.data.accesstoken
        saveTokenid(accessToken)
        console.log('保存token: ', accessToken)
        // 重新发起请求
        const newResponse = await this.request(response.config)
        return newResponse
      }
    }
    return response
  },
  request(options) {
    // 初始化options
    if (!options) {
      options = {}
    }

    // 初始化options.header
    if (!options.header) {
      options.header = {}
    }

    // request 拦截器
    if (this.interceptor.request) {
      const newOptions = this.interceptor.request(options)
      if (newOptions) {
        options = Object.assign({}, options, newOptions)
      }
    }

    // 兼容 baseUrl 以 '/' 结尾
    let baseUrl = options.baseUrl || this.config.baseUrl
    if (baseUrl.endsWith('/')) {
      baseUrl = baseUrl.slice(0, baseUrl.length - 1)
    }

    const requestUrl = options.url
    options.baseUrl = baseUrl
    options.dataType = options.dataType || this.config.dataType
    options.url = requestUrl.indexOf('http') === 0 ? requestUrl : options.baseUrl + requestUrl
    options.data = options.data || {}
    options.method = options.method || this.config.method

    // 如果post请求 没有设置content-type 则默认application/json
    if (!options.header['content-type'] && options.method.toUpperCase() === 'POST') {
      options.header['content-type'] = 'application/json'
    }
    // 设置Authorization
    if (consts.API_AUTH && !consts.TOKEN_WHITE_LIST.includes[requestUrl]) {
      options.header.Authorization = `Bearer ${getTokenid()}`
    }

    // 数据签名
    // const tokenid = getTokenid()
    // if (!consts.TOKEN_WHITE_LIST.includes[requestUrl] && tokenid) {
    //   const token = {
    //     [consts.TOKEN_KEY]: tokenid
    //   }
    //   options.header = Object.assign({}, options.header, token)
    // }
    return new Promise((resolve, reject) => {
      let _config = null

      options.complete = async response => {
        const statusCode = response.statusCode
        response.config = _config
        // token过期处理
        if (consts.TOKEN_EXCEPTION_PROCESS) {
          response = await this.refreshTokenIfNeed(response)
        }

        if (this.interceptor.response) {
          const newResponse = await this.interceptor.response(response)
          if (newResponse) {
            response = newResponse
          }
        }
        // 统一的响应日志记录
        _reslog(response)
        if (statusCode === 200) {
          // 成功
          resolve(response)
        } else {
          reject(response)
        }
      }

      _config = Object.assign({}, this.config, options)
      _config.requestId = new Date().getTime()

      // 统一的请求日志记录
      _reqlog(_config)

      uni.request(_config)
    })
  },
  get(url, data, options) {
    if (!isConnected) {
      return noConnectedTip()
    }
    if (!options) {
      options = {}
    }
    options.url = url
    options.data = data
    options.method = 'GET'
    return this.request(options)
  },
  post(url, data, options) {
    if (!isConnected) {
      return noConnectedTip()
    }
    if (!options) {
      options = {}
    }
    options.url = url
    options.data = data
    options.method = 'POST'
    return this.request(options)
  },
  put(url, data, options) {
    if (!isConnected) {
      return noConnectedTip()
    }
    if (!options) {
      options = {}
    }
    options.url = url
    options.data = data
    options.method = 'PUT'
    return this.request(options)
  },
  del(url, data, options) {
    if (!isConnected) {
      return noConnectedTip()
    }
    if (!options) {
      options = {}
    }
    options.url = url
    options.data = data
    options.method = 'DELETE'
    return this.request(options)
  }
}

/**
 * 请求接口日志记录
 */
function _reqlog(req) {
  if (process.env.NODE_ENV === 'development') {
    console.log('【' + req.requestId + '】 请求地址：------>>>>>> ' + req.url)
    if (req.header) {
      console.log('【' + req.requestId + '】 请求头：', req.header)
    }
    if (req.data) {
      console.log('【' + req.requestId + '】 请求参数：', req.data)
    }
  }
}

/**
 * 响应接口日志记录
 */
function _reslog(res) {
  const _statusCode = res.statusCode
  if (process.env.NODE_ENV === 'development') {
    // console.log('【' + res.config.requestId + '】 响应结果：', res)
  }
  switch (_statusCode) {
    case 200:
      break
    case 401:
      break
    case 404:
      break
    default:
      break
  }
}
