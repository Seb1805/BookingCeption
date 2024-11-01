import {axiosClient}  from "../axiosClient";

const loginApi = {
  login: (data: FormData) => axiosClient.post('/token',data)
}


export default loginApi