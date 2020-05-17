import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy';
import VueClipboard from 'vue-clipboard2';

Vue.use(VueClipboard);
Vue.use(Buefy, {});

new Vue({
  el: '#app',
  render: h => h(App)
})
