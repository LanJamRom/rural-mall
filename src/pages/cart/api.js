import request from '@/src/basic/utils/request'

/**
 * 获取购物车列表
 */
export const apiGetCart = async (pageNo, pageSize) => {
  const { data } = await request.get('/rural/v2/cart', { pageNo, pageSize })
  return data
}

/**
 * 购物车列表数量增减
 * @param {String} id cartItemId
 * @param {Number} quantity 商品数量
 */
export const apiUpdateQuantity = async (id, quantity) => {
  const { data } = await request.put('/rural/v2/cart', { id, quantity })
  return data
}

/**
 * 删除购物车中的商品
 * @param {Array} ids cartItemid数组集合
 */
export const apiDelCart = async condition => {
  const { data } = await request.del('/rural/v2/cart', condition)
  return data
}
