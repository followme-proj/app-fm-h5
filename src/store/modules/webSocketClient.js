/**
 * WebSocket 客户端。
 */
import Vue from 'vue';
import {
  AudioPlayerActions,
  WebSocketActions
} from '../actionTypes';

const WebSocketClient = {
  state: {
    socket: {
      isConnected: false,
      message: '',
      reconnectError: false,
    }
  },

  mutations: {
    SOCKET_ONOPEN(state, event) {
      console.log('Socket 连接成功: ', event);

      Vue.prototype.$socket = event.currentTarget;
      state.socket.isConnected = true;
    },

    SOCKET_ONCLOSE(state, event) {
      console.log('Socket 连接断开: ', event);

      state.socket.isConnected = false;
    },

    SOCKET_ONERROR(state, event) {
      console.error('Socket 连接出错: ', state, event);
    },

    // 接收到消息时保存到此处
    SOCKET_ONMESSAGE(state, message) {
      state.message = message;
    },

    SOCKET_RECONNECT(state, count) {
      console.log('Socket 断线重连: ', state.socket, count);
    },

    SOCKET_RECONNECT_ERROR(state) {
      console.log('Socket 重连出错: ', state.socket);
      state.socket.reconnectError = true;
    },
  },

  actions: {
    // 连接服务端
    async [WebSocketActions.ConnectToServer]({ getters, state }) {
      if (state.socket.isConnected) return;
      if (!getters.user || !getters.user.id) return;

      const url = process.env.WS_PATH.replace(':userId', getters.user.id);
      console.log(`连接WebSocket：${url}`);

      // Vue.prototype.$connect(url);
    },

    // 服务端断开
    async [WebSocketActions.DisconnectFromServer]({ }) {
      Vue.prototype.$disconnect();
    },

    // 连接成功
    async ['ConnectSucceed']({ getter, dispatch }, payload) {
      if (process.env.NODE_ENV === 'development') {
        let tip = `WebSocket 连接成功`;
        Vue.prototype.$globalToast.success(payload.message);

        await dispatch(AudioPlayerActions.AddToPlayAudio, tip);
      }
    },
  }
};

export default WebSocketClient;
