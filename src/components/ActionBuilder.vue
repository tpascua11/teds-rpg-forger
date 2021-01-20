<template>
  <div class="row">
    <div class="col-4 col">
      <section v-for="item in actions" :key="item.name">
        <button v-on:click="selectNewAction(item)" class="btn-default btn-small btn-block">
          {{item.name}}
        </button>
      </section>
    </div>


    <div class="col-8 col">
    <table>
      <thead>
        <th style="width: 5%;"> id </th>
        <th colspan=2 style="width: 95%;">
          {{selectedActionName}}
        </th>
      </thead>
      <tbody>
        <tr v-for="(item, propertyName, index) in selectedAction"
          :key="propertyName">
          <td> {{index}}</td>
          <td style="width: 40%;"> {{propertyName}}</td>

          <td v-if="item.type == 'string' && propertyName != 'eventName'" style="width: 60%;"> 
            <input type="string" v-model="item.value" placeholder="...">
          </td>
          <td v-if="item.type == 'number'" style="width: 60%;">
            <input type="number" v-model="item.value" placeholder="...">
          </td>
          <td v-if="item.type == 'boolean'" style="width: 60%;">
            BOOLEAN {{item.value}}
          </td>
          <td v-if="propertyName === 'eventName'">
            {{item.value}}
          </td>
        </tr>
        <tr>
          <td colspan=3>
            <button v-on:click="makeAction()" class="btn-default btn-small btn-block">
              Make Action
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    </div>

  </div>

</template>

<script>
import ActionTemplates from '@/js/actionTemplates.js'

export default {
  name: 'ActionBuilder',
  data: function(){
    return {
			actionsTemplates: ActionTemplates,
      isActive: true,
      error: null,
      styleObject: {
        color: 'red',
        fontSize: '13px'
      },
      action: {},
      selectedActionName: '',
      selectedAction: {},
    }
  },
  props: {
    name: String,
    selectedArea: Object
  },
  mounted(){
			console.log("SEE THE AreaList", this.areaList);
  },
  methods:{
    selectNewArea(newArea){
      console.log(newArea);
      //this.$parent.selectNewArea(newArea);
    },
    /*
    isSelectedWorld(area){
      return this.selectedArea == area;
    },*/
    selectNewAction(action){
      this.selectedAction = {};
      //this.selectedAction = action;
      //temporary solution TODO: Redo if a chance
      this.selectedActionName = action.name;
      for (let property in action.template) {
        this.selectedAction[property] =
          {type: typeof action.template[property], value: action.template[property]}
      }
      console.log('test action', this.selectedAction);
    },
    makeAction(){
      //Convert It Back
      console.log("see new selected area", this.selectedAction);
      let script = {};
      for(let i in this.selectedAction){
        console.log(i);
        script[i] = this.selectedAction[i].value;
      }
      console.log("see new script added", script);
      this.$parent.insertNewAction(script);
    }
  },
  computed: {
    actions: function(){
      return ActionTemplates.actions;
    }
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
