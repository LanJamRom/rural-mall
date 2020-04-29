import consts from '@/src/consts.js'
import { redirectTo, reLaunch } from './common'

const USER_INFO = 'USER_INFO' // 用户个人信息
const USER_ACCOUNT = 'USER_ACCOUNT' // 用户账号
const WX_USERINFO = 'WX_USERINFO'
const TOKEN_ID = 'TOKEN_ID' // TOKEN令牌ID
const FACES = 'FACES' // 面容数据

/**
 * 保存用户信息到本地存储中
 * @param {Object} user 用户信息
 */
export const saveUserInfo = async user => {
  const result = await uni.setStorage({
    key: USER_INFO,
    data: user
  })
  return result
}

/**
 * 保存用户账号信息
 * @param account 账号
 */
export const saveUserAccount = async account => {
  const result = await uni.setStorage({
    key: USER_ACCOUNT,
    data: account
  })
  return result
}

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  const user = uni.getStorageSync(USER_INFO)
  return user
}

/**
 * 移除用户信息
 */
export const removeUserInfo = () => {
  return uni.removeStorageSync(USER_INFO)
}

/**
 * 获取用户账号
 */
export const getUserAccount = () => {
  const userAccount = uni.getStorageSync(USER_ACCOUNT)
  return userAccount
}

/**
 * 移除令牌ID
 */
export const removeUserAccount = () => {
  return uni.removeStorageSync(USER_ACCOUNT)
}

/**
 * 从本地存储中获取微信用户信息
 */
export const getWxUserInfo = () => {
  return uni.getStorageSync(WX_USERINFO) || {}
}

/**
 * 从本地存储中获取用户ID
 */
export const getUserid = () => {
  const user = uni.getStorageSync(USER_INFO) || {}
  return user.userid || user.userId
}

/**
 * 保存令牌ID到本地存储中
 * @param {String} tokenid 令牌
 */
export const saveTokenid = tokenid => {
  uni.setStorage({
    key: TOKEN_ID,
    data: tokenid
  })
}

/**
 * 从本地存储中获取令牌ID
 */
export const getTokenid = () => {
  return uni.getStorageSync(TOKEN_ID) || ''
}

/**
 * 移除令牌ID
 */
export const removeTokenid = () => {
  return uni.removeStorageSync(TOKEN_ID)
}

/**
 * 保存面容识别数据到本地存储中
 * @param {Array<Object>} faces 令牌
 */
export const saveFaces = faces => {
  uni.setStorage({
    key: FACES,
    data: faces
  })
}

/**
 * 从本地存储中获取令牌ID
 */
export const getFaces = () => {
  return uni.getStorageSync(FACES) || []
}

/**
 * 移除令牌ID
 */
export const removeFaces = () => {
  return uni.removeStorageSync(FACES)
}

/**
 * 重定向到登录页
 */
export const redirectToLogin = url => {
  // 重定向登录页面
  redirectTo(url || consts.LOGIN_PATH)
}

/**
 * 关闭所有页面打开登录页面
 */
export const reLaunchToLogin = url => {
  reLaunch(url || consts.LOGIN_PATH)
}

/**
 * 用户注销
 * @param {String} url 注销后重定向登录的地址
 */
export const logout = url => {
  console.log('用户注销，清除相关用户信息')
  removeTokenid()
  removeUserInfo()
  removeUserAccount()
  reLaunchToLogin(url || consts.LOGIN_PATH)
}
