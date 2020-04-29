import request from '@/src/basic/utils/request'

/**
 * 获取详情页数据
 * @param {String} id productId
 */
export const apiGetProductDetail = async id => {
  const { data } = await request.get('/rural/v1/prod_detail', { id })
  return data
}

/**
 * 添加到购物车
 * @param {String} id 商品id
 * @param {String} subId 主属性id
 * @param {String} twiceId 副属性id
 */
export const apiAddToCart = async (id, subId, twiceId) => {
  const { data } = await request.post('/rural/v2/cart', { id, subId, twiceId })
  return data
}

/**
 * 立即购买
 * @param {String} id 商品id
 * @param {String} subId 主属性id
 * @param {String} twiceId 副属性id
 */
export const apiAddToOrder = async (id, subId, twiceId) => {
  const payload = {
    type: 'prod',
    condition: [id, subId, twiceId]
  }
  const { data } = await request.post('/rural/v2/order', payload)
  return data
}
