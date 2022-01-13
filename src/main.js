import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VueBlobJsonCsv from 'vue-blob-json-csv';
import VModal from 'vue-js-modal';
import draggable from 'vuedraggable'

import '../node_modules/rpg-awesome/css/rpg-awesome.min.css'
import '../node_modules/purecss/build/pure-min.css'

/*import VueSelect from '@desislavsd/vue-select';*/
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import SelectNameAndID from '@/components/inputTemplate/selectNameAndID.vue'

Vue.prototype.theWorld = {};

//* This Is Everything*//
/*
import {World} from './js/world.js';
Vue.prototype.world = World;
*/

Vue.use(VueBlobJsonCsv);
Vue.use(VModal);
Vue.use(draggable);

Vue.component("v-select", vSelect);
Vue.component("SelectNameAndID", SelectNameAndID);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
