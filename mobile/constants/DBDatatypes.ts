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
  price: number //Typescript is super cool hehe xd
}

export type Location = {
  locationName: string
  address: string
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
  status: boolean
  position: string
  lengthCM: number
  widthCM: number
  priceExtra: number
  pricePrSquareMeter: number
  spotType: number

}