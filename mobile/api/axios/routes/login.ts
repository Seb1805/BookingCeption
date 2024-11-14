import { axiosClient } from "../axiosClient";

const loginApi = {
  login: (data: FormData) => axiosClient.post('/token', data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export default loginApi