<template>
  <div class="row">
   <div class="col-6 col">
      <table class="table">
        <thead>
          <tr>
            <th scope="col" style="width: 90%;"> Event </th>
            <th scope="col" style="width: 10%;"> Edit </th>
          </tr>
        </thead>
        <draggable v-model="templateActionList" tag="tbody">
          <tr v-for="(item, index) in templateActionList" :key="index">
            <td>{{item}}</td>
            <td>
              <button v-on:click="removeAction(item)" class="btn-danger btn-small">
                X
              </button>
            </td>
          </tr>
        </draggable>

      </table>

  </div>
  <div class="col-6 col">
    <div>
      <ActionBuilder />
    </div>
  </div>

  </div>
</template>

<script>
import ActionBuilder from '@/components/ActionBuilder.vue'
import draggable from 'vuedraggable'


export default {
  name: 'InteractionBuilder',
  data: function(){
    return {
      isActive: true,
      error: null,
      styleObject: {
        color: 'red',
        fontSize: '13px'
      },
      action: {},
      selectedActionName: '',
      selectedAction: {},
      person: {
        firstName: 'Bo',
        lastName: 'Andersen',
        age: 27
      },
      templateActionList: [],
            list: [
        { id: 1, name: "Abby", sport: "basket" },
        { id: 2, name: "Brooke", sport: "foot" },
        { id: 3, name: "Courtenay", sport: "volley" },
        { id: 4, name: "David", sport: "rugby" }
      ],
    }
  },
  components: {
    ActionBuilder,
    draggable,
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
    },
    selectNewAction(action){
      console.log(action);
    },
    insertNewAction(action){
      this.templateActionList.push(action);
    },
    removeAction(index){
      console.log(index);
      this.templateActionList.splice(index, 1);
    }
  },
  computed: {
    classObject: function () {
      return {
        active: this.isActive && !this.error,
        'text-danger': this.error && this.error.type === 'fatal'
      }
    },
  }
}
</script>

<style scoped>
.creator{
  border: 1px solid black;
  background-color: #E8E8E8;
}
table {
  /* border: 1px solid black; */
  /*  border: none; */
  border: 1px solid black;
}
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
