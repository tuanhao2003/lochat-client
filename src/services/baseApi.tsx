import axios from "axios";

const BaseApi = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 5000,
});

const SetToken = (token: string | null) => {
  if (token) {
    BaseApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete BaseApi.defaults.headers.common["Authorization"];
  }
};

export { BaseApi, SetToken };