import axios from "axios";

const instance = axios.create({
  baseURL: "https://authcore-backend.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

//automatically attaching token to outgoing requests
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;
