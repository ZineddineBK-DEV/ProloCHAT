import axios from "axios";
import { Navigate } from "react-router-dom";
import { getUserFromLocalStorage,removeUserFromLocalStorage } from "./localStorage";

const api = axios.create({
  baseURL: "http://localhost:5000",
});
api.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage();
  if (user) {
    config.headers.common["Authorization"] = `Bearer ${user.token}`;
  }
  return config;
});

export default api;
