<template>
  <div class="container container-lg">
    <div class="pure-u-1-24" >
    </div>

    <div class="pure-u-3-24" style="right: 10">
   </div>

    <div class="pure-u-1-24">
    </div>

    <div class="pure-u-12-24 dt-border-x2">
      <div>
        <div class="row border-down-x3 margin1" style="min-height: 40px;">
          <div class="d-font-x2-b">
            <!--
                  <i class="ra  ra-quill-ink"
                    style="position: relative; left: 5px;">
                  </i>
                  -->
            {{showInterface}}
          </div>
          <div class="pure-u-24-24" style=" position:relative; top: 3px;">
              <div class="" style="overflow: hidden; ">
                <label>
                  <!--
                  -->
                  <input
                    class="borderless-gray" placeholder="name..."
                    v-model="selectedEntity.name"
                    type="text" style="font-weight: 900; font-size: 25px; height:
                    25px; width: 100%;"
                  />
                </label>
              </div>
          </div>
        </div>
        <div class="dt-border-x2 margin1">
            <div class="pure-u-24-24" style="font-weight: 900;">
              <span>
                <button class="pure-button sm-button" v-on:click="selectAttribute">
                  <div class="sm-text">
                    Attributes
                  </div>
                </button>
              </span>
              <span v-for="(row,index) in templateInfo" :key="index">
                <span v-if="row.type == 'script_list' "> - </span>
                <button v-if="row.type == 'script_list'"
                  class="pure-button sm-button"
                  v-on:click="selectScriptListName(index)"
                >
                  <div class="sm-text">
                    {{index}} Event
                  </div>
                </button>
              </span>
            </div>
        </div>
        <div class="" v-if="showOption == 'ATTRIBUTE'">
          <StatList v-model="template" v-bind:reference="'stat'"/>
        </div>
        <div v-else class="">
          <ScriptList
            v-bind:scriptList="template[listName]"
            v-bind:entity="template"
            v-bind:listName="listName"
            v-model="selectedAction"
          />
        </div>
      </div>
    </div>

    <div class="pure-u-1-24"></div>
    <div class="pure-u-5-24 margin2">
      <section class="">
      <div class="">
        <ScriptAction
          v-model="selectedAction"
          v-bind:scriptList="template[listName]"
          v-bind:entity="selectedAction"
        />
      </div>
      <div class="margin2" v-if="!selectedAction.empty">
        <div class="pure-u-3-5">
          <button class="button-warning pure-button full-width"
            v-on:click="deselectAction()"       > Back </button>
        </div>
        <div class="pure-u-2-5">
          <button class="button-error pure-button full-width"
              v-on:click="removeAction()"       > Remove </button>
        </div>
      </div>
      </section>
    </div>
  </div>
  </template>

<script>

import ScriptList from '@/components/ScriptList.vue'
import ScriptAction from '@/components/ScriptAction.vue'
import StatList from '@/components/attribute/ListCurrentAndMax.vue'

export default {
  name: 'Character',
  components: {
    ScriptList,
    ScriptAction,
    StatList,
  },
  data: function() {
    return {
      name: "Item",
      map: this.$root.world.group.item.list,

      selectedAction: {empty: true},
      selectedInteraction: {},
      selectedEntity: {scriptList: [], empty: true},
      selectedName: "",
      showInterface: "Character",

      selectedScriptList: [],
      listName: "",

      //selectedScriptList
      showOption: 'ATTRIBUTE',
      template: {
        name           : "",
        stat           : {},
        drop_inventory : [],
        on_death       : [
          {test: 'cool'},
          {test: 'happy'},
          {test: 'sad'},
          {test: 'hot'},
          {test: 'fire'},
          {test: 'cool'},
          {test: 'cool'},
        ],
        on_creation    : [
          {test: '1 tower'},
          {test: '2 fire'},
          {test: '3 sad'},
        ],
        conditionList: [],
      },
      templateInfo: {
        name           : {type: 'string'},
        stat           : {type: 'current_and_max_list', ref: 'stat'},
        drop_inventory : {type: 'percentage_list', ref: 'item'},
        on_death       : {type: 'script_list'},
        on_creation    : {type: 'script_list'}
      }

    };
  },
  props: {
    world: Object,
  },
  computed: {
    rworld: function(){
      return this.$root.world;
    },
    itemMap: function(){
      return this.$root.world.itemMap;
    }
  },
  methods:{
    addNewItem: function(){
      this.selectedName = "-----------";
      this.selectedEntity= {
        limit: 10,
        description: "",
        script_list: [],
        scriptList: []
      };

      let index = Object.keys(this.map).length;
      this.map[index] = this.selectedEntity;
      //this.selectedAction = {empty:true};

      console.log("see this", this.map[index]);
    },
    selectEntity: function(entity){
      this.selectedEntity = entity;
    },
    selectAttribute: function(){
      this.showOption = 'ATTRIBUTE';
    },
    selectScriptListName: function(scriptListName){
      this.listName = scriptListName;
      this.showOption = 'SCRIPT_LIST';
      console.log("new list name", this.listName);
    },
    deselectAction(){
      //console.log("ACTION DESELECTED!");
      this.selectedAction = {empty:true};
    },


  },
  mounted(){
  }
}
</script>


<style scoped>
textarea {
  box-sizing:border-box;
  height: 20%;
  width: 100%;
}
.nice-border{
  border: 1px solid black;
}

.simple-border{
  border: 1px solid black;
}

.hidden-border{
  border-style: none;
}

.nice-small-fit{
  font-family: Neucha;
  font-size: 17px;
  height: 25px;
  padding:0.2em
}

.nice-mid-fit{
  font-family: Neucha;
  font-size: 21px;
  height: 30px;
  padding:0.2em
}

.description-row{
  position:relative;
  top: -50px;
}

.script-row{
  height: 225px;
  position:relative;
  top: -125px;
}

p{
  font-size: 16px;
}

.big{
  width: 190vh;
}

input{
  background: #e5e4e2;
}
input:focus {
  border-color: black;
  border-width: 1px;
  background: pink;
}

.border-down{
	border-color: black;
	border-bottom-style: solid;
  /*
  border-right-style: solid;
  border-left-style: solid;
   */
  border-width: 1px;
}

.button-error {
	background-color: #E9967A;
}

.button-warning {
  background-color: #f2f28d;
}

.title-row {
  position: relative;
  bottom: 9px;
  left: 5px;

}


</style>
