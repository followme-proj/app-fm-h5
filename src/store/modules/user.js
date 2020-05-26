/**
 * 用户 store.
 */
import router from '../../router';
import request from '../../utils/request';
import { AppActions, UserActions, WebSocketActions } from '../actionTypes';
import { UserMutations } from '../mutationTypes';

const UserInfoKey = 'user-info';
const RememberMeKey = 'remember-me';

const user = {
  state: {
    user: {
      id: undefined,
      headimgUrl: 'http://img.mp.sohu.com/q_70,c_zoom,w_640/upload/20170522/0ef267e09ef4490790796129a37df278_th.jpg',
      nickname: 'Candy',
      accessToken: null
    },
  },

  getters: {
    user(state) {
      if (!state.user.id) {
        try {
          let userInfo = localStorage.getItem(UserInfoKey);
          if (userInfo) {
            state.user = JSON.parse(userInfo);
          }
        } catch (e) {
        }
      }

      return state.user;
    },
  },

  mutations: {
    // 更新本地用户数据，若是退出，直接清空本地缓存
    [UserMutations.SetUserData](state, user) {
      state.user = user ? { ...state.user, ...user } : { proxy_infos: {} };

      const cache = user ? JSON.stringify(state.user) : { proxy_infos: {} };
      localStorage.setItem(UserInfoKey, cache);
    },

    [UserMutations.HeartBeat](state, status) {
      state.user.online = status.online;

      const cache = state.user ? JSON.stringify(state.user) : { proxy_infos: {} };
      localStorage.setItem(UserInfoKey, cache);
    },
  },

  actions: {
    // 注册
    async [UserActions.SignUp]({ commit }, payload) {
      let user = await request({ url: `users/sign-up`, method: 'post', data: payload });
      commit(UserMutations.SetUserData, user);
    },

    // 登录
    async [UserActions.SignIn]({ getters, commit, dispatch }, payload) {
      let user = await request({ url: `users/sign-in`, method: 'post', data: payload });
      commit(UserMutations.SetUserData, user);

      // 连接 WebSocket
      dispatch(WebSocketActions.ConnectToServer, {});

      // 首页
      router.push({ name: 'Home' });
    },

    // 退出
    async [UserActions.SignOut]({ commit, dispatch }) {
      await request({ url: `users/sign-out`, method: 'post' });
      commit(UserMutations.SetUserData, null);

      // 断开 WebSocket 服务
      dispatch(WebSocketActions.DisconnectFromServer, {});

      router.push({ name: 'SignIn' });
    },

    // 记住当前用户
    async [UserActions.RememberMe]({ commit }, payload) {
      if (!payload.keepPassword) payload.password = '';

      const data = JSON.stringify(payload);
      localStorage.setItem(RememberMeKey, data);
    },

    // 获取上次用户
    async [UserActions.GetRememberMe]({ commit }, payload) {
      try {
        let cache = localStorage.getItem(RememberMeKey);
        return cache ? JSON.parse(cache) : null;
      } catch (e) {
        return null;
      }
    },

    // 读取用户信息
    async [UserActions.GetUserInfo]({ dispatch, commit, getters }) {
      if (!getters.user.id) return dispatch(UserActions.SignOut);

      let res = await request({ url: `users/${getters.user.id}`, method: 'get' });
      commit(UserMutations.SetUserData, res);
    },

    // 更新个人信息
    async [UserActions.UpdateProfile]({ commit, getters }, payload) {
      payload._method = 'put';

      let res = await request({ url: `users/${getters.user.id}`, method: 'post', data: payload });
      commit(UserMutations.SetUserData, res);
    },

    // 请求预授权
    async [UserActions.PreAuth]({ commit, getters }, payload) {
      return request({ url: `users/pre_auth`, method: 'post', data: payload });
    },

    // 绑定授权
    async [UserActions.BindAuth]({ commit, getters }, payload) {
      await request({ url: `users/bind_auth`, method: 'post', data: payload });
    }
  },
};

export default user;
