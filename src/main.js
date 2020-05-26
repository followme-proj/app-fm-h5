import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Ionic from '@ionic/vue';
import {addIcons} from 'ionicons';
import * as allIcons from 'ionicons/icons';
import '@ionic/core/css/ionic.bundle.css';
import './registerServiceWorker'

Vue.use(Ionic);

Vue.config.productionTip = false;

// 修复 0.0.9 版图标本无法显示问题
const currentIcons = Object.keys(allIcons).map(i => {
  const key = i.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
  if (typeof allIcons[i] === 'string') {
    return {
      [key]: allIcons[i],
    }
  }

  return {
    ['ios-' + key]: allIcons[i].ios,
    ['md-' + key]: allIcons[i].md,
  };
});

const iconsObject = Object.assign({}, ...currentIcons);
addIcons(iconsObject);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
