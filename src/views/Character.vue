<template>
  <div class="container container-lg">
    <div class="pure-u-1-24" >
    </div>

    <div class="pure-u-3-24" style="right: 10">
      <JustList
        v-model="selectedEntity"
        v-bind:map="thisMapList"
        v-bind:title="'Character'"
        v-bind:set_height="'150px'"
        v-bind:template="thisMap.template"
        @selected="refreshArea"
        @created="refreshInteractionList"
      />
      <!--
    -->
   </div>

    <div class="pure-u-1-24">
    </div>

    <div class="pure-u-12-24 dt-border-x2">
      <div>
        <div class="row border-down-x3 margin1" style="min-height: 40px;">
          <div class="d-font-x2-b">
            {{showInterface}}
          </div>
          <div class="pure-u-24-24" style=" position:relative; top: 3px;">
              <div class="" style="overflow: hidden; ">
                <label>
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
                <button class="pure-button sm-button" v-on:click="selectAttribute"
                        v-bind:style="[showOption == 'ATTRIBUTE' ? targeted : {}]"
                >
                  <div class="sm-text">
                    Attributes
                  </div>
                </button>
              </span>
              <span v-for="(row,index) in templateInfo" :key="index">
                <span v-if="row.type == 'script_list' "> - </span>
                <button v-if="row.type == 'script_list'"
                  class="pure-button sm-button"
                  v-bind:style="[
                  (showOption == 'SCRIPT_LIST') && (listName == index) ? targeted : {}
                  ]"
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
          <div v-if="false">
            <StatList v-bind:title="'Stats'" v-model="template.stat" v-bind:reference="'stat'"/>
            <hr>
            <ListMultiSelect v-model="template.drop_inventory" v-bind:reference="'item'"/>
            <hr>
            <ListAmount v-model="template.drop_inventory" v-bind:reference="'item'"/>
          </div>
          <div v-for="(row , index) in template" :key="index">
            <div v-if="templateInfo[index]">
              <div v-if="templateInfo[index].type == 'list_current_and_max'">
                <StatList v-bind:title="index" v-model="template[index]" v-bind:reference="'stat'"/>
                <hr>
              </div>
              <div v-else-if="templateInfo[index].type == 'list_multi_select'">
                <ListMultiSelect v-bind:title="index" v-model="template[index]" v-bind:reference="'item'"/>
                <hr>
              </div>
              <div v-else-if="templateInfo[index].type == 'list_with_amount'">
                <ListAmount v-bind:title="index" v-model="template[index]" v-bind:reference="'item'"/>
                <hr>
              </div>
              <div v-else-if="(templateInfo[index].type == 'script_list')
                              || index == 'name' ">
              </div>
              <div v-else>
                <label>
                  {{index}} <input class="borderless-gray" placeholder="name..."
                    v-model="template[index]" type="text" style=" height: 25px; width: 50%;" />
                </label>
                <hr>
              </div>
            </div>
          </div>

          <!-- TODO: !!!
          <div v-for="(row , index) in template" :key="index">
            <div v-if="templateInfo[index].type == 'list_max_and_current'>
              <StatList v-bind:title="index" v-model="value[index]"
                        v-bind:reference="'templateInfo[index].type'"/>
            </div
            ...
          </div>
          <div v-for="(row , index) in template" :key="index">
            ... Just for basic one input like string, numbers
          </div
          -->
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
      <div class="" v-if="showOption == 'SCRIPT_LIST'">
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

import ListMultiSelect from '@/components/attribute/ListMultiSelect.vue'

import ListAmount from '@/components/attribute/ListWithAmount.vue'
import JustList from '@/components/list/JustList.vue'

export default {
  name: 'Character',
  components: {
    ScriptList,
    ScriptAction,
    StatList,
    ListMultiSelect,
    ListAmount,
    JustList

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
      targeted: { 'background-color': 'lightblue' },
      showOption: 'ATTRIBUTE',
      template: {
        name           : "",
        stat           : {},
        drop_inventory : {},
        inventory : {},
        on_death       : [ {test: 'cool'},],
        on_creation    : [ {test: '1 tower'}, {test: '2 fire'}, ],
        //conditionList: [],
      },
      templateInfo: {
        name           : {type: 'string'},
        stat           : {type: 'list_current_and_max', ref: 'stat'},
        inventory      : {type: 'list_multi_select', ref: 'item'},
        drop_inventory : {type: 'list_with_amount', ref: 'item'},
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
    },
    thisMap: function(){ return this.$root.world.group.character},
    thisMapList: function(){ return this.$root.world.group.character.list},
    //areaMap: this.$root.world.group.area.list,
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

    refreshArea(){
      //this.selectedArea = this.selectedEntity;
      //this.showInterface = 'AREA';
    },
    refreshInteractionList(){
      //console.log("check before", this.selectedInteraction);
      //this.selectedInteraction = {empty: true};
      //console.log("check after", this.selectedInteraction);
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
