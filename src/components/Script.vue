<template>
  <div class="row">
		<div class="col-12 col" v-if="(mode === 'MENU')">
				<section v-for="item in actions" :key="item.name">
					<button v-on:click="selectNewAction(item)" class="btn-default btn-small
						btn-block smallfit">
						{{item.eventName}}
					</button>
        </section>

        <section>
          <MoveToArea
            v-bind:selectDescription="'Select Area To Move to'"
            v-bind:addScript="{activate: createAction}"
            v-bind:referenceList="$root.world.areaList"
          />

          <ToggleFlag
            v-bind:selectDescription="'Select Area To Move to'"
            v-bind:addScript="{activate: createAction}"
          />
        </section>
    </div>

    <div class="col-12 col" v-else>
      <table class="table" style="width: 100%;">
        <thead>
          <th style="width: 5%;"> id </th>
          <th colspan=2 style="width: 95%;">
            {{selectedActionName}}
          </th>
        </thead>
        <tbody>
          <tr v-for="(item, propertyName, index) in selectedAction"
            :key="propertyName">
            <td v-if="propertyName != 'description'">
              {{index}}
            </td>
            <td v-if="propertyName != 'description'" style="width: 40%;">
              {{propertyName}}
            </td>

            <td colspan=3 class="description" v-if="propertyName == 'description'">
              <textarea class="descriptionTextArea" rows="4" type="string" v-model="item.value" placeholder="...">
              </textarea>
            </td>
            <td v-else-if="item.type == 'string' && propertyName != 'eventName'" style="width: 60%;"> 
              <input class="smallInput" type="string" v-model="item.value" placeholder="...">
            </td>

            <td v-else-if="item.type == 'number'" style="width: 60%;">
              <input class="smallInput" type="number" v-model="item.value" placeholder="...">
            </td>
            <td v-else-if="item.type == 'boolean'" style="width: 60%;">
              BOOLEAN {{item.value}}
            </td>
            <td v-else-if="propertyName === 'eventName'">
              {{item.value}}
            </td>
          </tr>
          <tr>
            <td colspan=1>
              <button v-on:click="cancel()" class="btn-danger-outline btn-small btn-block">
                X
              </button>
            </td>
            <td colspan=2>
              <button v-on:click="makeAction()" class="btn-success-outline btn-small btn-block">
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
import MoveToArea from '@/components/modals/MoveToArea.vue'
import ToggleFlag from '@/components/modals/ToggleFlag.vue'

export default {
  name: 'ActionBuilder',
  components: {
    MoveToArea,
    ToggleFlag,
  },
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
      selectedAction: {description: ""},
      mode: "MENU",
    }
  },
  props: {
    name: String,
    selectedArea: Object,
    method: Object,
  },
  mouned(){
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
      this.mode = "action";
      console.log("see action", action);
      this.selectedAction = {};
      //this.selectedAction = action;
      //temporary solution TODO: Redo if a chance
      this.selectedActionName = action.eventName;

      for (let property in action) {
        this.selectedAction[property] =
          {type: typeof action[property], value: action.[property]}
      }
      console.log('test action', this.selectedAction);
    },
    cancel(){
      this.mode = "MENU";
    },
    makeAction(){
      this.mode = "MENU";
      //Convert It Back
      console.log("see new selected area", this.selectedAction);
      let script = {};
      for(let i in this.selectedAction){
        console.log(i);
        script[i] = this.selectedAction[i].value;
      }
      console.log("see new script added", script);
      //this.$parent.insertNewAction(script);

      this.method.addToScriptList(script);
    },
    createAction(template){
      console.log("template added", template);
      this.$parent.insertNewAction(template);
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
.smallInput{
  height: 8px;
  font-size: 14px;
  border: 0;
  background-color: #E8E8E8;
}
.description{
  height:250px;
}
.descriptionTextArea{
  font-size: 14px;
}
.smallfit{
  height: 25px;
  padding:0.1em
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

textarea {
  box-sizing:border-box;
  height: 100%;
  width: 100%;
}



</style>
