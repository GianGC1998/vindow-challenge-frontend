import axios, { ResponseType } from "axios";

interface IRequestConfig<P, D> {
  params?: P;
  data?: D;
  responseType?: ResponseType;
}

export const apiManager = {
  async get<P = {}, D = {}>(url: string, config: IRequestConfig<P, D> = {}) {
    const { params, responseType } = config;
    const headers = getHeaders();
    return axios.get<D>(url, { params, headers, responseType });
  },
};

function getHeaders() {
  const headers = {
    "x-rapidapi-key": process.env.REACT_APP_API_KEY,
    "x-rapidapi-host": process.env.REACT_APP_API_HOST,
  };
  return headers;
}
