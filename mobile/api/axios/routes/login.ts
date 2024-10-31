import axiosClient from "../axiosClient";

const loginApi = {
  login: (data: FormData) => axiosClient.post('http://localhost:8000/token',data)
}

export default loginApi