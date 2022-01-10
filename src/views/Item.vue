<template>
  <div class="container container-lg">
    <div class="pure-u-1-24" > </div>

    <div class="pure-u-3-24" style="right: 10">
      <ItemList
        v-bind:name="'Item List'"
        v-bind:list="world.itemList"
        v-bind:selectedItem="selectedItem"
        v-bind:selectedName="selectedName"
        v-bind:method="{addNewItem, selectItem}"
      />
    </div>

    <div class="pure-u-1-24" >
    </div>

    <div class="pure-u-12-24" v-if="selectedIndex < 0">
      <h3> Select or Add New Item... </h3>
    </div>
    <div class="pure-u-12-24" v-if="selectedIndex >= 0">
      <div class="dt-border">
        <div class="">
          <div class="pure-u-1-24" >
            <i class="ra  ra-barrier  ra-2x"
               style="position: relative; top: 5px; left: 5px;"></i> 
          </div>
          <div class="pure-u-23-24"
            style="height: 50px; position:relative; top: 5px;
            positon: relative; left: 12px;">
            <div>
              <div class="" style="height: 25px; overflow: hidden; ">
                <!-- <input v-model="name" placeholder="edit me"> -->
                <input
                  class="borderless-gray" placeholder="name..."
                  v-model="selectedItem.name"
                  type="text" style="font-weight: 900; font-size: 25px; height:
                  25px; width: 95%; text-decoration: underline; ">
              </div>
            </div>
            <div class="pure-u-20-24" style="font-weight: 900;">
              Type: Item
            </div>
          </div>
        </div>
      </div>
      <div class="" v-if="true">
        <ScriptListBuilder
          v-bind:scriptList="selectedItem.scriptList"
          v-bind:name="selectedName"
          v-bind:script="selectedItem"
          v-bind:selectedAction="selectedAction"
        />
      </div>
    </div>

    <div class="pure-u-1-24"></div>
    <div class="pure-u-5-24 dt-border" v-if="selectedIndex >= 0">
      <section class="margin1">
      <div class="">
        <ScriptAction v-model="selectedAction" v-bind:index="selectedIndex"/> 
      </div>
      <div v-if="!selectedAction.empty">
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

import ItemList from '@/components/list/ItemList.vue'
import ScriptListBuilder from '@/components/ScriptListBuilder.vue'
import ScriptAction from '@/components/ScriptAction.vue'

export default {
  name: 'Items',
  data: function() {
    return {
      name: "",
      selectedAction: {empty: true},
      selectedIndex: -1,
      selectedInteraction: {},
      selectedItem: {scriptList: []},
      selectedName: "",
      nameLock: true,
    };
  },
  components: {
    ItemList,
    ScriptListBuilder,
    ScriptAction,
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
    setNewItem: function(){
      this.selectedItem = {
        name: '',
        description: '',
        limit: 10,
        scriptList: []
      };
    },
    addNewItem: function(){
      this.selectedName = "-----------";
      this.selectedItem = {
        limit: 10,
        description: "",
        scriptList: []
      };
      this.world.itemList.push(this.selectedItem);
      console.log("see item", this.selectedItem);
      this.name = "";
      this.nameLock = false;
      this.selectedIndex = 0;
      this.selectedAction = {empty:true};

      //this.itemMap['template'] = {};
      //console.log("----?", this.rworld);
    },
    selectItem: function(item){
      this.selectedItem = item;
      this.selectedIndex = 0;
      this.selectedAction = {empty:true};
    },
    convergeToItemList(){
      console.log("SELCETED ITEM", this.selectedItem);
      if(!this.name) return;
      this.$root.world.itemMap[this.name] = this.selectedItem;
      console.log("update", this.$root.world);
      this.selectedName = this.name;

      this.$forceUpdate();
    },
    addToScriptList(script){
      console.log('add new script', script);
      this.selectedItem.scriptList.push(script);
      console.log("the selected script list",
        this.selectedItem.scriptList.length);
    },
    convergeScriptList(scriptList){
      this.refreshList(scriptList);
      this.selectedItem.scriptList = scriptList;
      this.convergeToItemList();
      return this.selectedItem.scriptList;
    },
    refreshList(scriptList){
      scriptList.forEach(function(script){
        delete script.isMoved;
      });
    },
    deselectAction(){
      //console.log("ACTION DESELECTED!");
      this.selectedAction = {empty:true};
    },
    removeAction(){
      this.selectedItem.scriptList.splice(this.selectedIndex, 1);
      this.selectedAction = {empty:true};
    }
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

input:focus {
  outline: none;
  background: #e5e4e2;
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


</style>
