import axios from "axios"
import { AUTH_TOKEN } from "@/common/constants/constants.ts"

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "API-KEY": import.meta.env.VITE_API_KEY,
  },
})

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem(AUTH_TOKEN)
  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
});
