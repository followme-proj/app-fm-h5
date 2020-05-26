/**
 * 分享 store。
 */
import {param} from "@/utils";
import request from '@/utils/request';

import {
  ShareActions
} from '../actionTypes';

const shares = {
  state: {
  },

  getters: {
  },

  mutations: {
  },

  actions: {
    async [ShareActions.GetAppDonwloadUrl]({commit, getters}, payload) {
      const share = await request({
        url: `shares`,
        method: 'get'
      });

      return share;
    },
  }
};

export default shares;
