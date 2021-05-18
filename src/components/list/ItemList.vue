<template>
  <div class="areaList card" style="width: 10rem; height: 650px">
    <div class="card-body">
      {{name}}
      <br>
      <br>

      <div style="overflow: scroll; height: 500px;">
        <table>
          <!--
          <thead>
            <tr style="height: 10px;">
              <th> <h5>{{name}}</h5> </th>
            </tr>
          </thead>
          -->
          <tbody>
            <tr v-for="(value, name) in itemMap" :key="name">
              <div v-bind:style="[ value == selectedItem ? styleObject : {}]">
                <td
                  v-on:click="method.selectItem(value, name)"
                  v-bind:class="classObject"
                 >
                   {{name}}
                </td>
              </div>
            </tr>
          </tbody>
        </table>
      </div>
      <button v-on:click="method.addNewItem()" class="btn-success-outline btn-small btn-block">
        Add Item
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AreaList',
  data: function(){
    return {
      itemMap: this.$root.world.itemMap,
      isActive: true,
      error: null,
      styleObject: {
        'text-decoration': 'underline',
        'font-weight': 'bold',
        //color: 'red',
        //fontSize: '13px'
      }
    }
  },
  props: {
    name: String,
    areaList: Array,
    selectedItem: Object,
    method: Object,
  },
  mounted(){
			console.log("SEE THE AreaList", this.areaList);
  },
  methods:{
    selectNewArea(newArea){
      console.log(newArea);
      //this.selectedItem.name = newArea.name;
      this.$parent.selectNewArea(newArea);
    },
    isSelectedWorld(area){
      return this.selectedItem == area;
    },
    addNewItem: function(){
      //this.itemMap['template'] = {};
      //this.selectedItem = {};
      this.$forceUpdate();
    }
  },
  computed: {
    classObject: function () {
      return {
        active: this.isActive && !this.error,
        'text-danger': this.error && this.error.type === 'fatal'
      }
    },
		rworld: function(){
			return this.$root.world;
    },
		ritemMap: function(){
			return this.$root.world.itemMap;
		}
  }
}
</script>

<style scoped>

</style>
