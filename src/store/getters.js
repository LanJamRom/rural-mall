const getters = {
  totalPrice: state => {
    const total = state.app.cartItem.reduce((curr, prev) => {
      curr = curr + prev.cartItem.currentUnitPrice * prev.cartItem.quantity
      return curr
    }, 0)
    return total
  }
}

export default getters
