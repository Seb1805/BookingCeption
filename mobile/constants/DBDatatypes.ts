import { Float } from "react-native/Libraries/Types/CodegenTypes"

export type Campaign = {
  campaignId: number
  name: string
  description: string
  cocverImage: string
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
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  address: string;
  role: number
}