// USE: axios helps to send api requests to the backend server
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});


// Attach token automatically
// Decide what will show to the user right away when the app loads
// 
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;