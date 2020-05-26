/**
 * 粉丝 store.
 */
import request from '../../utils/request';
import { param } from '../../utils';
import { FollowerActions } from '../actionTypes';
import { FollowerMutations } from '../mutationTypes';

const followers = {
  state: {
    followers: {
      items: []
    }
  },

  getters: {
    followers(state) {
      return state.followers;
    }
  },

  mutations: {
    // 设置列表
    [FollowerMutations.SetFollowerList](state, payload) {
      state.followers = payload;
    }
  },

  actions: {
    // 获取列表
    async [FollowerActions.GetFollowerList]({ commit, getters }, payload) {
      let followers = await request({ url: `followers?${param(payload)}`, method: 'get' });
      
      commit(FollowerMutations.SetFollowerList, followers);
    },

    // 同步用户
    async [FollowerActions.SyncFollowers]({ commit, getters }, payload) {
      await request({ url: `followers/sync`, method: 'get' });
    }
  },
};

export default followers;
