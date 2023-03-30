import axios from "axios";
import { getUserFromLocalStorage } from "./localStorage";

const api = axios.create({
  baseURL: "https://172.16.99.4:5000",
});

api.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage();
  if (user) {
    config.headers.common["Authorization"] = `Bearer ${user.token}`;
  }
  return config;
});

export default api;
