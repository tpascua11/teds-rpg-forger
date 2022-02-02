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
import SelectSpecific  from '@/components/inputTemplate/selectSpecific.vue'

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
Vue.component("SelectSpecific", SelectSpecific);

Vue.config.productionTip = false;

Vue.mixin({
  methods: {
    objectListToList: function (list) {
      let newList = [];
      console.log("This List", list);
      if(!list) return;

      Object.keys(list).forEach(function(row){
        let newRow = {id: row};
        Object.assign(newRow, list[row]);
        newList.push(newRow);
      }, this);

      return newList;
    },
    nameCap: function (name){
      return name.charAt(0).toUpperCase() + name.slice(1);
    },
    nameVarCap: function (name){
      let fix = Object.keys({name})[0];
      return fix.charAt(0).toUpperCase() + fix.slice(1);
    },
    globalHelper: function () {
      alert("Hello world")
    },
  },
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
