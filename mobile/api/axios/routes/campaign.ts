import axiosClient from "../axiosClient";

const campaignApi = {
  getCampaignData: (page: Number) => axiosClient.get(`/campaign/page/${page}`)
}

export default campaignApi;