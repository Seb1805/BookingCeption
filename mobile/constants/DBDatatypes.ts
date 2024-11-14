import { Float } from "react-native/Libraries/Types/CodegenTypes"

export type Campaign = {
  name: string
  description: string
  coverImage: string
  dateStart: Date
  timeStart: string
  dateEnd: Date
  timeEnd: string
  sectionId: number
  active: boolean
  // price: number //Typescript is super cool hehe xd
}

export type Location = {
  locationName: string
  address: string
  organizerId: number
}

export type LocationNew = {
  locationName: string
  address: string
  city: string
  organizerId: number
}


export type User = {
  email: string
  password: string
  firstname: string
  lastname: string
  address: string
  role: number
}

export type Section = {
  locationId: number
  locationItem: number
  name: string
  spotId: number
  roomForParticipants: number
  layoutImage: string
}

export type Spot = {
  position: string
  lengthCM: number
  widthCM: number
  priceExtra: number
  pricePrSquareMeter: number
  spotType: number
  occupied: boolean
}

export type Ticket = {
  ticketId: number
  name: string
  price: Float
  validDateStart: string
  validDateEnd: string
  validTimeStart: string
  spotId?: number
  // sectionId: number
  location: LocationNew
  campaignId: number
  active: boolean
  amount?: number
}

export type Cart = {
  lastUpdate: string,
  cartItems: CartItem[]
}

export type CartItem = {
  ticketId: number,
  amount: number
}