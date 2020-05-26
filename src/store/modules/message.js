/**
 * 消息 store。
 */
import {param} from "@/utils";
import request from '@/utils/request';

import {
  MessageActions
} from '@/store/actionTypes';

const templates = {
  state: {
  },

  getters: {
  },

  mutations: {
  },

  actions: {
    // 发送消息
    async [MessageActions.SendMessage]({commit, getters}, payload) {
      return request({
        url: `messages`,
        method: 'post',
        data: payload
      });
    },
  }
};

export default templates;
