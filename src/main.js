import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VueBlobJsonCsv from 'vue-blob-json-csv';
import VModal from 'vue-js-modal';

import '@desislavsd/vue-select/dist/vue-select.css';

import VueSelect from '@desislavsd/vue-select';



Vue.use(VueBlobJsonCsv);
Vue.use(VModal);

Vue.use(VueSelect, {
    /**
     * The name of the globally available component.
     * defaults to <v-select>
     */
    name: 'vSelect',
    /**
     * A Vue mixin that can be used to override
     * default options and methods of the original
     * component. Useful to define app specific
     * standart of the select component.
     */
    mixin: {}
})



Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
