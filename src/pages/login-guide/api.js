import request from '@/src/basic/utils/request'

/**
 * 获取验证
 * @param {String} phone 电话号码
 */
export const apiGetCode = async phone => {
  const { data } = await request.post('/rural/v1/getCode', { phone })
  return data
}

/**
 * 登录
 * @param {String} phone 电话号码
 * @param {String} code 验证码
 */

export const apiLogin = async (phone, code) => {
  const { data } = await request.post('/rural/v1/login', { phone, code })
  return data
}
