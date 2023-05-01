import axios, { ResponseType } from "axios";

interface IRequestConfig {
  params?: any;
  data?: any;
  responseType?: ResponseType;
}

export const apiManager = {
  async get<T = any>(url: string, config: IRequestConfig = {}) {
    const { params, responseType } = config;
    const headers = getHeaders();
    return axios.get<T>(url, { params, headers, responseType });
  },
};

function getHeaders() {
  const headers = {
    "x-rapidapi-key": process.env.REACT_APP_API_KEY,
    "x-rapidapi-host": process.env.REACT_APP_API_HOST,
  };
  return headers;
}
