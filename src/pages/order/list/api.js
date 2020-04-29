import request from '@/src/basic/utils/request'

/**
 * 获取订单列表
 * @param {Number} pageNo 页数
 * @param {Number} pageSize 页码
 * @param {String} type 查询条件
 */
export const apiGetOrder = async (pageNo, pageSize, type) => {
  const params = { pageNo, pageSize }
  if (type !== 0) {
    params.status = type
  }
  const { data } = await request.get('/rural/v2/order', params)
  return data
}
