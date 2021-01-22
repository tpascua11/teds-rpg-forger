import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VueBlobJsonCsv from 'vue-blob-json-csv';
import VModal from 'vue-js-modal'

Vue.use(VueBlobJsonCsv)
Vue.use(VModal)


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
