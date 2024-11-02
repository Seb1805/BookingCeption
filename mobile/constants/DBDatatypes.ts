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
}

export type Location = {
  locationName: string
  address: string
}

export type User = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  address: string;
  role: number
}