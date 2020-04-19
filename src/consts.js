import $basicConsts from '@/src/basic/consts.js'

const FILE_HOST = '/static/img/' // file host

export default {
  ...$basicConsts,
  // DEBUG: true,
  // BASE_URL: 'https://api.yichengme.com',
  // DEV_BASE_URL: 'https://api.yichengme.com',
  FILE_HOST,
  // LOGIN_PATH: 'src/pages/login/index',
  // INDEX_PATH: 'src/pages/index/index',
  // TOKEN_KEY: 'jwttoken',
  // TOKEN_API: '/api/user/account/v1/login/getaccesstoken',
  // ENCRPY_KEY: [119, 242, 211, 219, 137, 201, 138, 145, 65, 222, 145, 171, 213, 17, 129, 200], // 加密秘钥
  // IS_ENCRPY_DATA: false, // 对发送的参数进行加密
  // TOKEN_EXCEPTION_PROCESS: false // 自定义处理token异常情况
  INT_MAX_VALUE: 214748364 // pageSize的最大默认值
}
