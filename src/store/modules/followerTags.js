/**
 * 分组 store.
 */
import request from '../../utils/request';
import { param } from '../../utils';
import { FollowerTagActions } from '../actionTypes';
import { FollowerGroupMutations } from '../mutationTypes';

const followerTags = {
  state: {
    followerTags: {
      items: []
    }
  },

  getters: {
    followerTags(state) {
      return state.followerTags;
    }
  },

  mutations: {
    // 设置列表
    [FollowerGroupMutations.SetFollowerGroupList](state, payload) {
      state.followerTags = payload;
    }
  },

  actions: {
    // 获取列表
    async [FollowerTagActions.GetFollowerGroupList]({ commit, getters }, payload) {
      let followerTags = await request({ url: `follower_groups?${param(payload)}`, method: 'get' });
      
      commit(FollowerGroupMutations.SetFollowerGroupList, followerTags);
    },

    // 创建
    async [FollowerTagActions.CreateGroup]({ commit, getters }, payload) {
      await request({ url: `follower_groups/sync`, method: 'get' });
    }
  },
};

export default followerTags;
