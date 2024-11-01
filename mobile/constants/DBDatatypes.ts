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