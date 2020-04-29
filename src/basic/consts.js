export default {
  // 基础设置
  VERSION: '1.0.0', // 版本号
  NAME: '', // 应用名称
  LOG: true, // 是否开启日志
  BASE_URL: 'http://localhost:7001', // api host
  // WEBVIEW_HOST: 'http://visit.sadais.com', // webview host
  // FILE_HOST: 'http://m.sadais.com/visitor/iphone/', // file host
  INDEX_PATH: 'src/pages/index/index', // 主页入口（项目如果配置不一致，需要覆盖）
  LOGIN_PATH: 'src/pages/login-guide/index',
  TOKEN_API: '/rural/v1/getAccessToken',
  // TOKEN_KEY: 'tokenid', // 设置header token key
  TOKEN_EXCEPTION_PROCESS: true, // 使用通用逻辑处理TOKEN异常，需要自定义处理则设置成false
  TOKEN_INVALID_CODE: [2, 3], // 接口返回码如果是1 则表明token过期或无效 需要自动刷新token
  TOKEN_WHITE_LIST: [], // 不需要设置token的白名单
  API_AUTH: true, // 如果服务器开启了AUTH验证，没有开启则设置空
  // ENCRPY_KEY: [119, 242, 211, 219, 137, 201, 138, 145, 65, 222, 145, 171, 213, 17, 129, 200], // 加密秘钥
  IS_ENCRPY_DATA: false, // 对发送的参数进行加密
  RET_CODE: { SUCCESS: 0, FAIL: 1, TOKEN_UNDEFINED: 19, TOKEN_EXPIRED: 2 } // 返回RET状态码解析
  // // 微信小程序相关
  // SADAIS_AGENT: false,
  // WX_APP_FROM: 'health',
  // WX_APP_CHANNEL: 'wechat_app',
  // SHARE_TITLE: '',
  // USER_INFO: 'user-info',
  // OPEN_ID: 'open-id',
  // // 推送相关
  // PUSH: {
  //   BIND: '', // 推送关联cid与codeid的接口
  //   UNBIND: '' // 解除关联
  // },
  // DEBUG: false
}
