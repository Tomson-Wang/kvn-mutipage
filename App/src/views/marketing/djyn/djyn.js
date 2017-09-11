/**
 * Created by tomson on 2017/3/31.
 */
import Vue from 'vue'
import VueBus from 'vue-bus'
import '@/plugins/Filter'
import audiosView from './djyn.vue'
Vue.config.productionTip = false

//消息总线
Vue.use(VueBus)

new Vue({
    el:'#app' ,
    render:h => h(audiosView)
});

