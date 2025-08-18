import axios from "axios";

const baseApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}`,
  timeout: 5000,
});

const setToken = (token: string | null) => {
  if (token) {
    baseApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete baseApi.defaults.headers.common["Authorization"];
  }
};

export { baseApi, setToken };