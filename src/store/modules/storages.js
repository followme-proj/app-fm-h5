/**
 * 存储 store。
 */
import {param} from "@/utils";
import request from '@/utils/request';

import {
  StorageActions
} from '../actionTypes';

const storages = {
  state: {
  },

  getters: {
  },

  mutations: {
  },

  actions: {
    // 获取一个上传文件 URL
    async [StorageActions.GetUploadUrl]({commit, getters}, payload) {
      const res = await request({
        url: `storages`,
        method: 'post'
      });

      return res;
    },
  }
};

export default storages;
