import request from '@/src/basic/utils/request'

/**
 * 查询商品列表
 * @param {Number} pageNo 页码
 * @param {Number} pageSize 页数
 * @param {Object} condition 载荷
 */
export const apiGetProdList = async (pageNo, pageSize, condition = {}) => {
  const params = { pageNo, pageSize, ...condition }
  const { data } = await request.get('/rural/v1/prod_list', params)
  return data
}
