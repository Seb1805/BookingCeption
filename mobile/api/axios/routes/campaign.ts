import { Campaign } from "@/constants/DBDatatypes";
import {axiosClientJson} from "../axiosClient";

const campaignApi = {
  getCampaignData: () => axiosClientJson.get('/campaigns'),
  getCampaignDatapage: (page: Number) => axiosClientJson.get(`/campaigns/page/${page}`),
  getCampaignSingle: (id: number) => axiosClientJson.get(`/campaigns/${id}`),
  searchName: (data: string) => axiosClientJson.get(`/campaigns/search/${data}`),
  campgain: (data: Campaign) => axiosClientJson.post("/campaigns",data),
}

export default campaignApi;