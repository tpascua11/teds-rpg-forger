<template>
  <div class="Items container container-lg paper">
    <div class="row">
      <div class="col-3 col">
        <ItemList
          v-bind:name="'Item List'"
          v-bind:selectedItem="selectedItem"
          v-bind:selectedName="selectedName"
          v-bind:method="{addNewItem, selectItem}"
        />
      </div>

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
          <ScriptListBuilder
            v-bind:method="{addToScriptList}"
            v-bind:scriptList="selectedItem.scriptList"
          />
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
      selectedItem: {},
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
      this.selectedName = "";
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
      this.$root.world.itemMap[this.name] = this.selectedItem;
      console.log("update", this.$root.world);

      this.selectedName = this.name;
      this.nameLock = true;

      this.$forceUpdate();
    },
    addToScriptList(script){
      this.selectedItem.scriptList.push(script);
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

</style>
