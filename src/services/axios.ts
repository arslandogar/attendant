import { notification } from 'antd';
import Axios, { AxiosRequestConfig } from 'axios';
import fireStoreParser from 'firestore-parser';

import { API_URL } from '@/config';
import storage from '@/utils/storage';

function authRequestInterceptor(config: AxiosRequestConfig) {
  const token = storage.getToken();
  if (config.headers === undefined) {
    config.headers = {};
  }
  if (token) {
    //config.headers.authorization = `Bearer ${token}`;
  }
  config.headers.Accept = 'application/json';
  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    if ('fields' in response.data) {
      return fireStoreParser(response.data);
    }
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.error?.message;
    notification.error({
      message: error.message,
      description: message,
    });

    return Promise.reject(error);
  }
);
