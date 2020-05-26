/**
 * 微信公众号/小程序 store。
 */
import { param } from "@/utils";
import request from '@/utils/request';

import {
  WxAppActions
} from '@/store/actionTypes';
import {
  WxAppMutations
} from '@/store/mutationTypes';

const wxApps = {
  state: {
    wxApps: {
      items: [],
      _meta: {
        totalCount: 3,
        pageCount: 1,
        currentPage: 1,
        perPage: 20
      }
    }
  },

  getters: {
    wxApps(state) {
      return state.wxApps;
    }
  },

  mutations: {
    [WxAppMutations.SetWxAppList](state, payload) {
      state.wxApps = payload;
    }
  },

  actions: {
    // 获取列表
    async [WxAppActions.GetWxAppList]({ commit, getters }, payload) {
      const wxApps = await request({
        url: `apps`,
        method: 'get'
      });

      commit(WxAppMutations.SetWxAppList, wxApps);
    },
  }
};

export default wxApps;
