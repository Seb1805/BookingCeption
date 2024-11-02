import {axiosClientJson} from "../axiosClient";

const campaignApi = {
  getCampaignData: (page: Number) => axiosClientJson.get(`/campaigns/page/${page}`)
}

export default campaignApi;