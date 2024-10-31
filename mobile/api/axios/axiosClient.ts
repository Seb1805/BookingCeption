import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseUrl = `${process.env.SCHEMA_SERVER}${process.env.SERVER_DOMAIN}`
  
function createAxiosInstance(contentType = 'application/json') {
  const axiosClient = axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    }
  });

  axiosClient.interceptors.request.use(
    async config => {
      const token = await AsyncStorage.getItem('authenticationToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  return axiosClient;
}

export default createAxiosInstance;