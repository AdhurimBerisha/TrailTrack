import axios from "axios";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

if (!API_URL) {
  console.warn("API_URL is not defined. Please create a .env file with API_URL set.");
}

const instance = axios.create({
  baseURL: API_URL || "http://localhost:3000",
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
