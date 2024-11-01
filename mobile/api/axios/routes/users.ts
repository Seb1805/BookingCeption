import {axiosClientJson} from "../axiosClient";

const userApi = {
  getUserData: () => axiosClientJson.get(`/user/me`)
}

export default userApi;