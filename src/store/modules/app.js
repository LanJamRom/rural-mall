const state = {
  cartItem: []
}
const mutations = {
  saveCartItem(state, { list }) {
    state.cartItem = list || []
  }
}
const actions = {}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
