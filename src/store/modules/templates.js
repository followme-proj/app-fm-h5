/**
 * 消息模板 store。
 */
import { param } from "@/utils";
import request from '@/utils/request';

import {
  TemplateActions
} from '@/store/actionTypes';
import {
  TemplateMutations
} from '@/store/mutationTypes';

const templates = {
  state: {
    templates: {
      items: [{
        id: 0,
        name: '请选择一个公众号'
      }],
      _meta: {
        totalCount: 0,
        pageCount: 1,
        currentPage: 1,
        perPage: 20
      }
    }
  },

  getters: {
    templates(state) {
      return state.templates;
    }
  },

  mutations: {
    // 设置列表
    [TemplateMutations.SetTplItemList](state, payload) {
      if (payload.items.length === 0) {
        state.templates = {
          items: [{
            id: 0,
            name: '此公众号未配置消息模板'
          }],
          _meta: {
            totalCount: 0,
            pageCount: 1,
            currentPage: 1,
            perPage: 20
          }
        }
      } else {
        state.templates = payload;
      }
    }
  },

  actions: {
    // 获取列表
    async [TemplateActions.GetTemplateList]({ commit, getters }, payload) {
      const templates = await request({
        url: `templates?${param(payload)}`,
        method: 'get'
      });

      commit(TemplateMutations.SetTplItemList, templates);
    },
  }
};

export default templates;
