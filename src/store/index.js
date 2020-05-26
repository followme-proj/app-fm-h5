/**
 * 全局数据存储。
 */
import Vue from 'vue'
import Vuex from 'vuex'

import audioPlayer from './modules/audioPlayer'
import dicts from './modules/dicts'
import followers from './modules/followers'
import followerTags from './modules/followerTags'
import message from './modules/message'
import shares from './modules/shares'
import templates from './modules/templates'
import user from './modules/user'
import webSocketClient from './modules/webSocketClient'
import wxApps from './modules/wxApps'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    audioPlayer,
    dicts,
    followers,
    followerTags,
    message,
    shares,
    templates,
    user,
    webSocketClient,
    wxApps,
  }
});

export default store;
