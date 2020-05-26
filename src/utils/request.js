import qs from 'qs';
import axios from 'axios';
import store from '../store';

import { UserActions } from "../store/actionTypes";

/**
 * axios请求拦截部分对数据进行了处理.
 * axios请求拦截中，multipart/form-data 数据直接就被Qs进行序列化了，
 * 因为无法序列化FormData的内容，所以返回的data就是一个空的内容，
 * 导致最后判断是不是formData对象时出错。
 * 
 * 解决方法，如果'Content-Type' === 'multipart/form-data;charset=UTF-8'就是直接返回data，不进行序列化。
 */
const restClient = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 30000,
  withCredentials: true,
  transformRequest: [function (data, headers) {
    try {
      if (headers['Content-Type']) {
        if (headers['Content-Type'].toLowerCase().includes('application/x-www-form-urlencoded')) {
          return qs.stringify(data);
        } else if (headers['Content-Type'].toLowerCase().includes('multipart/form-data')) {
          return data;
        }
      } else {
        return qs.stringify(data);
      }
    } catch (e) {
      console.error(e);
    }
  }]
});

// 请求拦截器
restClient.interceptors.request.use(
  config => {
    // 增加应用ID与版本号
    // config.headers['X-Application-Id'] = store.getters.appId();

    return config;
  },

  error => {
    Promise.reject(error);
  }
);

// 响应拦截器
restClient.interceptors.response.use(
  async (response) => {
    if (!response) return store.dispatch(UserActions.SignOut);

    if (response.status === 200 && !response.errorCode) {
      return response.data;
    }

    throw new Error(response.data.message);
  },

  async (error) => {
    console.error(error)
    if (!error.response) {
      throw new Error('亲，您与服务器之间的网络不太顺畅哟~');
    }

    if (error.response.status === 403) {
      await store.dispatch(UserActions.SignOut);
    } else {
      let message = null;

      try {
        message = error.response.data.message;
      } catch (err) {
        console.error(`解析REST请求错误消息出错: ${err.message}`);
      }

      throw new Error(message);
    }
  }
);

export default restClient
