import { User } from "@/constants/DBDatatypes";
import {axiosClientJson} from "../axiosClient";

const userApi = {
  getUserData: () => axiosClientJson.get(`/users/me`),
  addUser: (data: User) => axiosClientJson.post('/users', data)
}

export default userApi;