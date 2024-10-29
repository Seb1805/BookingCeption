import axiosClient from "../axiosClient";

const userApi = {
  getUserData: () => axiosClient.get(`/user/me`)
}

export default userApi;