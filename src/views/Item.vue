<template>
  <div class="container container-lg">
    <div class="pure-u-1-24" > </div>
    <div class="pure-u-3-24" style="right: 10">
      <ItemList
        v-bind:name="'Item List'"
        v-bind:selectedItem="selectedItem"
        v-bind:selectedName="selectedName"
        v-bind:method="{addNewItem, selectItem}"
      />
    </div>
    <div class="pure-u-1-24" > </div>

    <div v-if="true" class="pure-u-18-24">
        <ScriptListBuilder
            v-bind:scriptList="selectedItem.scriptList"
            v-bind:name="selectedName"
          />
            <button v-if="false" v-on:click="convergeToItemList()" class="btn-success btn-small btn-block">
              Converge
            </button>
    </div>

    <div v-if="false" class="pure-u-18-24 default-thin-border">
      <div>
        <div class="pure-u-1-24"> </div>
        <div class="pure-u-9-24">
          <div class="form-group">
            <label for="paperInputs1"> Name: </label>
            <input class="" v-model="name" type="text"
              placeholder="name of item..." id="paperInputs1"
              style="width: 80%;"
              :disabled="nameLock"
            >
          </div>
        </div>
        <div class="pure-u-5-24">
          <label for="paperInputs1"> Carry Limit</label>
          <input
            v-model="selectedItem.limit" type="number" placeholder="Limit" id="paperInputs1"
            style="width: 50%;"
          >
        </div>

        <div class="pure-u-8-24" style=" ">
          <button class=".button-success pure-button save-button default-thin-border" 
                  style="width: 100%" v-on:click="convergeToItemList()">
            Save Changes
          </button>
        </div>
      </div>
      <div>
        <br>
      </div>
    </div>


    <div class="row" v-if="false">
      <div class="pure-u-1-24" > </div>
      <div class="pure-u-22-24"> </div>
      <div class="pure-u-1-3"> </div>
      <div class="col-9 col paper">
        <div class="row">
          <div class="col sm-5">
            <div class="form-group">
              <label for="paperInputs1"> Name </label>
              <input class="input-block" v-model="name" type="text"
                placeholder="name of item..." id="paperInputs1"
                :disabled="nameLock">
            </div>
          </div>

          <div class="col sm-3">
            <div class="form-group">
              <label for="paperInputs1"> Limit </label>
              <input
                class="input-block"
                v-model="selectedItem.limit" type="number" placeholder="Limit" id="paperInputs1">
            </div>
          </div>

          <div class="col sm-4">
            <div class="form-group">
            <label for="paperInputs1"> ---  </label>
            <button v-on:click="convergeToItemList()" class="btn-success btn-small btn-block">
              Converge
            </button>
          </div>
          </div>
        </div>

        <div class="row description-row">
          <div class="col sm-12">
            <div class="form-group">
              <label for="large-input">Description</label>
              <textarea v-model="selectedItem.description" id="large-input"
                placeholder="describe item usage"></textarea>
            </div>
          </div>
        </div>

        <div class="row description-row">
          <div class="col sm-12">
          </div>
        </div>

        <div class="row script-row">
            <ScriptListBuilder v-bind:scriptList="selectedItem.scriptList"/>
        </div>

      </div>

    </div>
  </div>
</template>

<script>

import ItemList from '@/components/list/ItemList.vue'
import ScriptListBuilder from '@/components/ScriptListBuilder.vue'

export default {
  name: 'Items',
  data: function() {
    return {
      name: "",
      selectedInteraction: {},
      selectedItem: {scriptList: []},
      selectedName: "",
      nameLock: true,
    };
  },
  components: {
    ItemList,
    ScriptListBuilder,
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
      console.log("see item", this.selectedItem);
      this.name = "";
      this.nameLock = false;

      //this.itemMap['template'] = {};
      //console.log("----?", this.rworld);
    },
    selectItem: function(item, name){
      console.log("what is item", item);
      this.selectedName = name;
      this.name = name;
      this.nameLock = true;

      this.selectedItem = {};
      Object.assign(this.selectedItem, item);
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
      this.selectedItem.scriptList.push(script);
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

.save-button {
  padding:0.3em;
  height: 25px;
  background-color: palegreen;
  border: 1px solid black;
}

</style>
