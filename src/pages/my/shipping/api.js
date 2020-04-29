import request from '@/src/basic/utils/request'

/**
 * 获取用户地址列表
 */
export const apiGetShipping = async () => {
  const { data } = await request.get('/rural/v2/shipping')
  return data
}

/**
 * 创建新的地址
 * @param {Object} payload 参数
 */
export const apiCreateShipping = async payload => {
  const { data } = await request.post('/rural/v2/shipping', payload)
  return data
}

/**
 * 更新地址
 * @param {Object} payload 载荷
 */
export const apiUpdateShipping = async payload => {
  const { data } = await request.put('/rural/v2/shipping', payload)
  return data
}
