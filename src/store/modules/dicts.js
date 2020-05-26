/**
 * 字典 store。
 */
import {param} from "@/utils";
import request from '@/utils/request';

import {
  DictActions
} from '../actionTypes';
import {
  DictMutations
} from '../mutationTypes';

const dictItems = {
  state: {
    dictItems: {},
  },

  getters: {
    // 字典项
    dictItems(state) {
      return state.dictItems;
    },
  },

  mutations: {
    // 设置字典项列表
    [DictMutations.SetDictItemList](state, payload) {
      state.dictItems = {
        ...state.dictItems,
        [payload.id]: payload.items
      };
    }
  },

  actions: {
    // 获取字典项列表
    async [DictActions.GetDictItemList]({commit, getters}, payload) {
      if (getters.dictItems[payload.id]) return;

      const dictItems = await request({
        url: `dict_items?id=${payload.id}`,
        method: 'get'
      });

      commit(DictMutations.SetDictItemList, {
        id: payload.id,
        items: dictItems
      });
    },
  }
};

export default dictItems;
