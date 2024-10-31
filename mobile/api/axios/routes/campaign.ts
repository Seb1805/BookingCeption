import {axiosClientJson} from "../axiosClient";

const campaignApi = {
  getCampaignData: (page: Number) => axiosClientJson.get(`/campaign/page/${page}`)
}

export default campaignApi;