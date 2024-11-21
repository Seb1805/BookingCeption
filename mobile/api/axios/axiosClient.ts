import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseUrl = `${process.env.EXPO_PUBLIC_SCHEMA_SERVER}${process.env.EXPO_PUBLIC_SERVER_DOMAIN}`

export const axiosClient = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*'
    }
})

export const axiosClientJson = axios.create({
  baseURL: baseUrl,
  headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
  }
})
axiosClient.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem('access_token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        console.log(config)
        return config
    },
    error => {
        console.error("Request error:", error)
        console.error("Config:", error.config)
        return Promise.reject(error)
    }
)

axiosClientJson.interceptors.request.use(
  async config => {
      const token = await AsyncStorage.getItem('access_token')
      if (token) {
          config.headers.Authorization = `Bearer ${token}`
      }
      console.log(config)
      return config
  },
  error => {
      console.error("Request error:", error)
      console.error("Config:", error.config)
      return Promise.reject(error)
  }
)
export const loginApi = {
    login: async (data : FormData) => {
        try {
            const response = await axiosClient.post('/token', data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Access-Control-Allow-Origin': '*'

                }
            })
            if (response.data.access_token) {
                await AsyncStorage.setItem('access_token', response.data.access_token)
            }
            else(
              console.log("Response:", response)
            )
            return response
        } catch (error) {
            console.error("Login error:", error)
            
            throw error
        }
    }
}

export default axiosClient
