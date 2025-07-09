import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
// import { getAuth } from "firebase/auth";
import { fireBaseAuth } from "../config/firebase";

export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000, // 10 segundos
});

// Interceptor para adicionar o token antes de cada requisição
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const user = fireBaseAuth.currentUser;
    // const auth = getAuth();
    // const user = auth.currentUser;

    if (user) {
      try {
        const token = await user.getIdToken();
        config.headers.set("Authorization", `Bearer ${token}`);
      } catch (error) {
        console.error("Erro ao obter token do usuário no Firebase", error);
      }
      // const token = await user.getIdToken();
      // config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  // (error) => {
  //   return Promise.reject(error);
  // },
);
