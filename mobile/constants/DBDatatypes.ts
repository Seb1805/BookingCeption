import { Float } from "react-native/Libraries/Types/CodegenTypes"

export type Campaign = {
  name: string
  description: string
  coverImage: string
  dateStart: string
  timeStart: string
  dateEnd: string
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
  locationId?: number
  name: string
  roomForParticipants: number
  layoutImage: string
}

export type Spot = {
  position: string
  status: boolean
  lengthCM: number
  widthCM: number
  priceExtra: number
  pricePrSquareMeter: number
  spotType: number
  sectionId: number
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
  locationName: string
  address: string
  city: string
  campaignId: number
  campaignName: string
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

export type Booking = {
  userId: number
  bookingStatus: number
  dateCreated: Date
}

export type BookingCampaign = {
  ticketId: number
  bookingId?: number
  ticketAmount: number
  sumPrice: Float
}

export type BookingExtended = {
  userId: number
  bookingStatusId: number
  dateCreated: string
  bookingCampaigns: BookingCampaign[]
}