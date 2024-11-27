
export type Cart = {
  lastUpdate: string,
  cartItems: CartItem[]
}

export type CartItem = {
  ticketId: number,
  amount: number
}

export type MesseData = {
  id: number,
  name: string,
  price: number,
  coverImage?: string
}