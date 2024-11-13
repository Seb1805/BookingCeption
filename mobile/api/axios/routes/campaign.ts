import {axiosClientJson} from "../axiosClient";

const campaignApi = {
  getCampaignData: () => axiosClientJson.get('/campaign'),
  getCampaignDatapage: (page: Number) => axiosClientJson.get(`/campaigns/page/${page}`),
  getCampaignSingle: (id: number) => axiosClientJson.get(`/campaign/${id}`)
}

export default campaignApi;