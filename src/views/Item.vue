<template>
  <div class="Items container container-lg paper">
    <div class="row">
      <div class="col-4 col">
        <ItemList
          v-bind:name="'Item List'"
          v-bind:selectedItem="selectedItem"
          v-bind:method="{addNewItem, selectItem}"
        />
      </div>
      <div class="col-8 col">
        <div class="row">
          <input v-model="name" placeholder="item name" :disabled="nameLock">

          <textarea v-model="selectedItem.description" placeholder="area description"></textarea>
        </div>

        <div class="row">
        </div>


        <div class="row">
          <button v-on:click="convergeToItemList()" class="btn-success-outline btn-small btn-block">
            Converge
          </button>
        </div>
      </div>
    </div>
    <div v-if="false">
    </div>
  </div>
</template>

<script>

import ItemList from '@/components/list/ItemList.vue'

export default {
  name: 'Items',
  data: function() {
    return {
      name: "",
      selectedItem: {},
      nameLock: true,
		};
  },
  components: {
		ItemList,
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
      this.selectedItem = {name: '', description: '', scriptList: []};
    },
    addNewItem: function(){
      this.selectedItem = {limit: 10, description: ""};
      console.log("see item", this.selectedItem);
      this.name = "";
      this.nameLock = false;

      //this.itemMap['template'] = {};
      //console.log("----?", this.rworld);
    },
    selectItem: function(item, name){
      console.log("what is item", item);

      this.name = name;
      this.nameLock = true;
      this.selectedItem = {};
      Object.assign(this.selectedItem, item);
    },
    convergeToItemList(){
      this.$root.world.itemMap[this.name] = this.selectedItem;
      console.log("update", this.$root.world);

      //this.selectedItem = {};
      //this.name = "";
      this.$forceUpdate();
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

p{
  font-size: 16px;
}

</style>
