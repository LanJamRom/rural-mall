import request from '@/src/basic/utils/request'

export const getCategory = async () => {
  const { data } = await request.get('/rural/v1/category')
  return data
}
