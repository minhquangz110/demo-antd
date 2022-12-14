import axios from "axios";
import { getToken } from "../persist/localstorage";
import { IDataApi } from "../types/dataApi";

const request = axios.create({
  // baseURL: "https://demo-be.onrender.com/api",
  //baseURL: "http://175.41.154.200",
  baseURL: "http://13.215.252.255/api"
});
request.interceptors.request.use(
  async (config) => {
    const token = getToken();
    config.headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      referrerPolicy: "unsafe_url",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
export const get = async (path: string, params: any, ) => {
  const res = await request.get(path, { params: params });
  return res.data;
};
export const post = async (path: string, data: any) => {
  const res = await request.post(path, data);
  return res.data;
};

export const put = async (path: string, data: any) => {
  const res = await request.put(path, data);
  return res.data;
};

export const del = async (path: string, params: any) => {
  const res = await request.delete(path, { params: params });
  return res.data;
};

export const upload = async (
  path: string,
  files: any[]
): Promise<IDataApi<any>> => {
  let formData = new FormData();
  for (let i = 0; i < files.length; ++i) {
    formData.append("file", files[i].originFileObj);
  }
  return (await request.post(path, formData)).data;
};
