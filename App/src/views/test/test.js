import Vue from 'vue'
import VueBus from 'vue-bus'
import '@/plugins/Filter'
import mall from './test.vue'
Vue.config.productionTip = false
Vue.use(VueBus)
new Vue({
  el: '#app',
  render: h => h(mall)
});
