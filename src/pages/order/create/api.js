import request from '@/src/basic/utils/request'

/**
 * 查找默认地址
 */
export const apiGetDefaultShipping = async () => {
  const { data } = await request.get('/rural/v2/shipping_default')
  return data
}

/**
 * 提交订单
 * @param {String} type 类型: cart/prod
 * @param {Array} ids condition条件数组
 */
export const apiSaveOrder = async (type, ids) => {
  const { data } = await request.post('/rural/v2/order', { type, condition: ids })
  return data
}

/**
 * 更新订单状态
 * @param {String} id 订单id
 * @param {String | Number} status 订单状态
 */
export const apiUpdateOrder = async (id, status) => {
  const { data } = await request.put('/rural/v2/order', { id, status })
  return data
}
