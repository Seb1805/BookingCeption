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

// export type Location = {
//   locationName: string
//   address: string
//   organizerId: number
// }

export type Location = {
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
  spotnumber: number
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
  location: Location
  campaignId: number
  active: boolean
  amount?: number
}

export type TicketBought = {
  name: string
  validDateStart: string
  validDateEnd: string
  validTimeStart: string
  address: string
  sectionName: string
  spotNumber?: number
  boughtAmount: number
  campaignName: string
  campaignCoverImage?: string
}
