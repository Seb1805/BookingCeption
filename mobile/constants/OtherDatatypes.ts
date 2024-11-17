
export type Cart = {
  lastUpdate: string,
  cartItems: CartItem[]
}

export type CartItem = {
  ticketId: number,
  amount: number
}