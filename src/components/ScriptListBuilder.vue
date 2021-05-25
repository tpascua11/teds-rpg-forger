<template>
  <section class="basedHeight">
      <!--
    <div class="row"> <hr> <hr></div>
    <div class="row">
      <div class="col-2 col"> </div>
      <div class="col-8 col">
        <div class="row">
          <button v-on:click="saveScript()" class="btn-warning
            btn-small scriptSave btn-block">
            Save Script Order
          </button>
        </div>
      </div>
      <div class="col-2 col"> </div>
    </div>
    -->
    <div class="row">
      <div class="col-8 col">
        <table class="table" style="width: 100%; table-layout: fixed;">
          <thead>
            <tr>
              <th scope="col" style="width: 90%;">
                Script List
              </th>
              <th scope="col" style="width: 10%;"> Edit </th>
            </tr>
          </thead>


          <draggable v-model="selectedScriptList" tag="tbody" :move="checkMove">
            <tr v-for="(item, index) in selectedScriptList" :key="index"
          v-bind:style="[ item.isMoved ? moved : {}]"
            >
              <td v-on:click="selectAction(item)" style="cursor: move;"
                v-bind:style="[ selectedAction == item ? selected : {}]"
              >
                {{item}}
              </td>
              <td>
                <button v-on:click="removeAction(index)" class="btn-danger
                  btn-small smalltext">
                  x
                </button>
              </td>
            </tr>
          </draggable>
        </table>
      </div>
      <div class="col-4 col script-match-height">
      <Script
        v-bind:method="{addToScriptList, hardModifyScript}"
        v-bind:editedAction="selectedAction"
      />
      </div>
    </div>
  </section>
</template>

<script>
//import ActionBuilder from '@/components/ActionBuilder.vue'
import draggable from 'vuedraggable'
import Script from '@/components/Script.vue'

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
      moved: {
        'background-color': '#FFFFE0'
      },
      selected: {
        'background-color': 'peachpuff'
      },
      action: {},
      selectedActionName: '',
      selectedAction: {},
      person: {
        firstName: 'Bo',
        lastName: 'Andersen',
        age: 27
      },
      selectedScriptList: [],
    }
  },
  components: {
    //ActionBuilder,
    draggable,
    Script,
  },
  props: {
    name: String,
    currentInteraction: Object,
    method: Object,
    scriptList: Array,
  },
  watch: {
    name: function(){
      this.selectedScriptList = this.scriptList;
    },
    selectedScriptList: function(oldv, newv){
      if(oldv != newv){
        this.saveScript();
      }
    },
    scriptList: function(oldv, newv){
      if(oldv != newv){
        console.log("SAVE POSITION!");
        this.saveScript();
      }
      /*
      if(oldv) oldv.every(function(row){
        row.isMoved = false;
      });
      if(newv) newv.every(function(row){
        row.isMoved = false;
      });
      this.selectedScriptList = this.scriptList;
       */
    }
  },
  mounted(){
    console.log("DID IT CHANGED!");
  },
  methods:{
    selectNewAction(action){
      console.log(action);
    },
    insertNewAction(action){
      console.log(action);
    },
    insertNewInteraction(interaction){
      this.$parent.addInteraction(interaction);
    },
    removeAction(index){
      console.log(index);
      this.scriptList.splice(index, 1);
    },
    selectAction(script){
      this.selectedAction = script;
      console.log("check script", this.selectedAction);
    },
    convertSelectedAction(script){
      this.selectedAction = script;
      console.log("see the new selected action", this.selectedAction);
    },
    addToScriptList(script){
      //this.method.addToScriptList(script);
      this.selectedScriptList.push(script);
    },
    editScript(script){
      console.log(script);
      this.selectedAction = script;
      //this.method.addToScriptList(script);
      //this.selectedScriptList.push(script);
    },
    hardModifyScript(script){
      console.log("HARD MODIFY!");
      Object.assign(this.selectedAction, script);
    },
    deselectAction(){
      console.log("ACTION DESELECTED!");
      this.selectedAction = null;
    },
    saveScript(){
      console.log("Script Overwritten!");
      this.method.convergeScriptList(this.selectedScriptList);
      this.$forceUpdate();
    },
    checkMove(/*{draggedContext}*/){
      //if(draggedContext)
      //console.log("movement at", draggedContext.element);
      //draggedContext.element.isMoved = true;
    },
    test(){
      console.log("----------------------------------------------");
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
.smallInput{
  height: 14px;
  font-size: 18px;
  border: 0;
  background-color: #E8E8E8;
}
.smallX{
  font-size: 25px;
}
.smalltext{
  font-size: 15px;
  height: 25px;
  padding:0.1em
}
.scriptSave{
  font-size: 20px;
  height: 30px;
  padding:0.1em
}
.rightside{
  /*background-color: lightgrey;*/
}
.leftside{
  margin-top: -20px;
  /*background-color: grey;*/
}

.basedHeight{
  height:77vh;
}

.bitright{
  margin-left: 20px;
}
.bigInput{
  height: 40px;
  font-size: 22px;
  border: 0;
  background-color: #E8E8E8;
}

.script-match-height{
  position:relative;
  top: -20px;
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
