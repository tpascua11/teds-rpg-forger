<template>
  <section class="basedHeight">
    <div class="row">
      {{error}}
      <div class="col-8 col">
        <table class="table" style="width: 100%; table-layout: fixed;">
          <thead>
            <tr>
              <th style="width: 5%;"> ID </th>
              <th scope="col" style="width: 85%;">
                Script List
              </th>
              <th scope="col" style="width: 10%;"> Edit </th>
            </tr>
          </thead>

          <draggable v-model="selectedScriptList" tag="tbody" :move="checkMove">
            <tr v-for="(item, index) in selectedScriptList" :key="index"
              v-bind:style="[ item.isMoved ? moved : {}]"
            >

              <td
                v-on:click="targetIndex(index);"
                v-bind:style="[ atIndex == index ? targeted : {}]">
                {{index}}
              </td>
              <td v-on:click="selectAction(item)" style="cursor: move;"
                v-bind:style="[
                  selectedAction == item ? selected : {},
                ]"
              >
                <div v-bind:style=[indexPush(index)]>
                  {{item}}
                </div>
              </td>
              <td>
                <button v-on:click="removeAction(index)" class="btn-danger
                  btn-small smalltext">
                  x
                </button>
              </td>
            </tr>
          </draggable>
          <tr>
            <td colspan=3 v-on:click="targetIndex(-1)"
              v-bind:style="[ atIndex == -1 ? targeted : {}]"
              style="height: 25px;"
            >
              <hr>
            </td>
          </tr>
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
      //error: null,
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
      targeted: {
        'background-color': 'lightblue'
      },
      action: {},
      selectedActionName: '',
      selectedAction: {},
      targetedAction: {},
      atIndex: -1,
      person: {
        firstName: 'Bo',
        lastName: 'Andersen',
        age: 27
      },
      selectedScriptList: [],
      ifConditionIndexList : [],
      endConditionIndexList: [],
      error: '',
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
        this.validScriptList();
      }
    },
    scriptList: function(oldv, newv){
      if(oldv != newv){
        console.log("SAVE POSITION!");
        this.saveScript();
        this.validScriptList();
      }
    }
  },
  mounted(){
  },
  methods:{
    selectNewAction(action){
      console.log(action);
    },
    insertNewAction(action){
      console.log(action);
    },
    removeAction(index){
      //console.log(index);
      this.scriptList.splice(index, 1);

      this.validScriptList();
    },
    targetIndex(index){
      this.atIndex = index;
    },
    selectAction(script){
      this.selectedAction = script;
      //console.log("check script", this.selectedAction);
    },
    convertSelectedAction(script){
      this.selectedAction = script;
      //console.log("see the new selected action", this.selectedAction);
    },
    addToScriptList(script){
      //this.method.addToScriptList(script);
      if(this.atIndex < 0) this.selectedScriptList.push(script);
      else this.selectedScriptList.splice(this.atIndex, 0, script);

      this.validScriptList();
    },
    editScript(script){
      //console.log(script);
      this.selectedAction = script;
      //this.method.addToScriptList(script);
      //this.selectedScriptList.push(script);
    },
    hardModifyScript(script){
      //console.log("HARD MODIFY!");
      Object.assign(this.selectedAction, script);
      this.validScriptList(); 
    },
    deselectAction(){
      //console.log("ACTION DESELECTED!");
      this.selectedAction = {};
    },
    saveScript(){
      console.log("Script Overwritten!");
      this.$parent.convergeScriptList(this.selectedScriptList);
      this.$forceUpdate();
    },
    checkMove(/*{draggedContext}*/){
      //if(draggedContext)
      //console.log("movement at", draggedContext.element);
      //draggedContext.element.isMoved = true;
    },
    test(){
      console.log("----------------------------------------------");
    },

    validScriptList(){
      console.log("CHECK VALIDATION!");
      let ifConditionList = [];
      let endConditionList = [];
      let error = "";

      this.selectedScriptList.forEach(function(script, index){
        if(script.ifCondition) ifConditionList.push(index);
        if(script.endCondition) endConditionList.push(index);
        if(ifConditionList.length < endConditionList.length){
          if(!error){
            error = "If and End Statement Not Closed Correctly at index: " + index;
          }
        }
      });
      if(ifConditionList.length != endConditionList.length){
        error = "Missing IF or END conditions to close condition!";
      }
      this.ifConditionIndexList  = ifConditionList ;
      this.endConditionIndexList = endConditionList;
      this.error = error;

      return error;
    },
    indexPush(atIndex){
      //console.log(index);
      let push = 0;

      //console.log("WTF", this.ifConditionIndexList);
      if(this.ifConditionIndexList.some(function(ifIndex){
        if(atIndex > ifIndex){
          push++;
          return false;
        }
      })) push = this.ifConditionIndexList.length;

      this.endConditionIndexList.some(function(endIndex){
        if(atIndex >= endIndex){
          push--;
        }
      });
      //if(push < 0) push = 0;

      /*
      if(this.endConditionIndexList.some(function(endIndex){
        if(atIndex < endIndex){
          push--;
          return false;
        }
      })) push -= this.endConditionIndexList.length;
      if(push > 0) push = 0;
       */

      /*
      endConditionList.some(function(endIndex){
        if(atIndex > endIndex){
          push -= atIndex;
        }
      });
       */

      return {
        'position': 'relative',
        'left': push*20 + 'px'
      }
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

.test2{
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
