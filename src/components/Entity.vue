<template>
  <div class="container container-lg">
    <div class="pure-u-1-24" >
    </div>

    <div class="pure-u-3-24" style="right: 10">
      <JustList
        v-model="selectedEntity"
        v-bind:map="thisMapList"
        v-bind:title="title"
        v-bind:set_height="'450px'"
        v-bind:template="thisMap.template"
        v-bind:templateInfo="thisMap.templateInfo"
        @selected="refreshArea"
        @created="refreshInteractionList"
        v-bind:refresh="refresh"
      />
   </div>

    <div class="pure-u-1-24">
    </div>

    <div class="pure-u-12-24 dt-border-x2">
      <div v-if="!selectedEntity.empty">
        <div class="row border-down-x3 margin1" style="min-height: 40px;">
          <div class="d-font-x2-b">
            <div class="pure-u-16-24">
              {{title}}
            </div>
            <div class="pure-u-8-24 right">
              <button class="pure-button b-yellow sm-button"
                v-on:click="copyEntity();">
                <div class="sm-text"> Copy </div>
              </button>
              -
              <button class="pure-button b-red sm-button" v-on:click="test();">
                <div class="sm-text"> X </div>
              </button>
            </div>
          </div>
          <div class="pure-u-24-24" style=" position:relative; top: 3px;">
              <div class="" style="overflow: hidden; ">
                <label>
                  <input
                    class="borderless-gray" placeholder="name..."
                    v-model="selectedEntity.name"
                    type="text" style="font-weight: 900; font-size: 25px; height: 25px; width: 100%;"
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
                -
                <button class="pure-button sm-button" v-on:click="selectCondition"
                        v-bind:style="[showOption == 'CONDITION' ? targeted : {}]"
                >
                  <div class="sm-text">
                    Conditions
                  </div>
                </button>
              </span>
              <span v-for="(row,index) in templateInfo" :key="index">
                <span v-if="row.type == 'script_list' "> - </span>
                <button v-if="row.type == 'script_list'" class="pure-button sm-button"
                  v-bind:style="[(showOption == 'SCRIPT_LIST') && (listName == index) ? targeted : {} ]"
                  v-on:click="selectScriptListName(index)"
                >
                  <div class="sm-text"> {{index}} Event </div>
                </button>
              </span>
            </div>
        </div>
        <section class="cool-scroll" style="height: 80vh;">
        <div class="" v-if="showOption == 'ATTRIBUTE'">
          <div v-for="(row , index) in selectedEntity" :key="index">
            <div v-if="templateInfo[index]">
              <div v-if="templateInfo[index].type == 'list_current_and_max'">
                <div v-if="false">
                  <StatList v-bind:title="index" v-model="selectedEntity[index]" v-bind:reference="'stat'"/>
                </div>
                <hr>
              </div>
              <div v-else-if="templateInfo[index].type == 'list_custom'">
                <ListCustom
                  v-bind:title="index"
                  v-model="selectedEntity[index]"
                  v-bind:reference="templateInfo[index]"/>
                <hr>
              </div>
              <!--
              <div v-else-if="templateInfo[index].type == 'list_multi_select'">
                <ListMultiSelect v-bind:title="index" v-model="selectedEntity[index]" v-bind:reference="'item'"/>
                <hr>
              </div>
              <div v-else-if="templateInfo[index].type == 'list_with_amount'">
                <ListAmount v-bind:title="index" v-model="selectedEntity[index]" v-bind:reference="'item'"/>
                <hr>
              </div>
              -->
              <div v-else-if="(templateInfo[index].type == 'script_list') || (templateInfo[index].type == 'condition_list') || index == 'name'"> </div>
              <div v-else>
                <label>
                  {{index}} <input class="borderless-gray" placeholder="name..."
                    v-model="selectedEntity[index]" type="text" style=" height: 25px; width: 50%;" />
                </label>
                <hr>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="showOption == 'CONDITION'" class="">
          <Condition
            v-model="selectedEntity"
            v-bind:scriptList="selectedEntity[listName]"
            v-bind:entity="selectedAction"
          />
        </div>
        <div v-else-if="showOption == 'SCRIPT_LIST'" class="">
          <ScriptList
            v-bind:scriptList="selectedEntity[listName]"
            v-bind:entity="selectedEntity"
            v-bind:listName="listName"
            v-bind:show="showOption"
            v-model="selectedAction"
          />
        </div>
        </section>
      </div>
    </div>

    <div class="pure-u-1-24"></div>
    <div class="pure-u-5-24 margin2">
      <section class="">
        <div class="" v-if="showOption == 'SCRIPT_LIST'">
          <ScriptAction
            v-model="selectedAction"
            v-bind:scriptList="selectedEntity[listName]"
            v-bind:entity="selectedAction"
          />
        </div>
      </section>
    </div>
  </div>
  </template>

<script>

import ScriptList from '@/components/ScriptList.vue'
import ScriptAction from '@/components/ScriptAction.vue'
import Condition from '@/components/Condition.vue'
import StatList from '@/components/attribute/ListCurrentAndMax.vue'

//import ListMultiSelect from '@/components/attribute/ListMultiSelect.vue'

//import ListAmount from '@/components/attribute/ListWithAmount.vue'
import ListCustom from '@/components/attribute/ListCustom.vue'
import JustList from '@/components/list/JustList.vue'

export default {
  name: 'Character',
  components: {
    ScriptList,
    ScriptAction,
    StatList,
    //ListMultiSelect,
    //ListAmount,
    ListCustom,
    JustList,
    Condition,
  },
  data: function() {
    return {
      //groupEntity: 'character',
      name: "Character",

      selectedAction: {empty: true},
      selectedInteraction: {},
      selectedEntity: {empty: true},

      selectedScriptList: [],
      listName: "",

      targeted: { 'background-color': 'lightblue' },
      showOption: 'ATTRIBUTE',
      refresh: 0,
    };
  },
  props: {
    groupEntity: String,
    title: String
  },
  computed: {
    thisMap: function(){
      return this.$root.world.group[this.groupEntity]
    },
    thisMapList: function(){
      return this.$root.world.group[this.groupEntity].list
    },
    templateInfo: function(){
      if(!this.$root.world.group[this.groupEntity].templateInfo) return {};
      return this.$root.world.group[this.groupEntity].templateInfo;
    }
  },
  methods:{
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
    selectCondition: function(){
      this.showOption = 'CONDITION';
    },
    deselectAction(){
      this.selectedAction = {empty:true};
    },
    copyEntity(){
      console.log("COPY");
      let index = Object.keys(this.thisMapList).length + 1;
      index;
      let newEntity = JSON.parse(JSON.stringify(this.selectedEntity));
      this.thisMapList[index] = newEntity;
      this.selectedEntity = this.thisMapList[index];
      this.refresh+=1;
      this.$forceUpdate();
    },
    removeEntity(){
    },
    refreshArea(){
      this.showOption = 'ATTRIBUTE';
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

.b-yellow{
  background-color: #F0E68C;
}
.b-red{
  background-color: #FF7F7F;
}

</style>
