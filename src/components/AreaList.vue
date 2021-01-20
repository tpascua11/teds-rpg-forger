<template>
  <div class="areaList card" style="width: 10rem;">
    <div class="card-body">
      <table>
        <thead>
          <tr>
            <th>{{name}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in areaList" :key="item.name">
            <div v-bind:style="[ item == selectedArea ? styleObject : {}]">
              <td
                v-on:click="selectNewArea(item)"
                v-bind:class="classObject"
               >
                {{item.name}}
              </td>
            </div>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AreaList',
  data: function(){
    return {
      isActive: true,
      error: null,
      styleObject: {
        color: 'red',
        fontSize: '13px'
      }
    }
  },
  props: {
    name: String,
    areaList: Array,
    selectedArea: Object
  },
  mounted(){
			console.log("SEE THE AreaList", this.areaList);
  },
  methods:{
    selectNewArea(newArea){
      console.log(newArea);
      //this.selectedArea.name = newArea.name;
      this.$parent.selectNewArea(newArea);
    },
    isSelectedWorld(area){
      return this.selectedArea == area;
    }
  },
  computed: {
    classObject: function () {
      return {
        active: this.isActive && !this.error,
        'text-danger': this.error && this.error.type === 'fatal'
      }
    }
  }
}
</script>

<style scoped>
tr {
  padding: 50px;
}
tr {
}
td{
  font-size:12px;
}
th {
  font-size: 14px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
p {
  font-size: 15px;
}


</style>
