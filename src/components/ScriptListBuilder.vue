<template>
	<div>
		<div v-if="true" class="default-thin-border">
			<div>
				<div class="script-row" v-if="error" style="font-size: 20px; background-color: pink;">
					{{error}}
				</div>

				<div style="height: 75vh; overflow:auto;">
					<draggable v-model="selectedScriptList" tag="div" :move="checkMove" @end="saveScript">
						<div class="script-row" v-for="(item, index) in selectedScriptList" :key="index" v-bind:style="[ item.isMoved ? moved : {}]">
							<div class="pure-u-1-24 script-row-index center"> {{index}}: </div>
							<div class="pure-u-23-24" v-bind:style=[indexPush(index)]>
								<div class="script-row-text" v-on:click="selectAction(item, index)"
									v-bind:style="[ selectedAction == item ? selected : {},]">
									{{item}}
								</div>
							</div>
						</div>
					</draggable>
				</div>
			</div>

		</div>


  <section v-if="false" class="basedHeight">
    <div class="row">
			{{error}}
    </div>
    <div class="row">
      <div class="col-8 col tablescroll script-match-height-left">
				<table class="table" style="width: 100%; table-layout: fixed; overflow: scroll;">
          <thead>
            <tr>
              <th style="width: 5%;"> ID </th>
              <th scope="col" style="width: 80%;"> - Script List - </th>
              <th scope="col" colspan="2" style="width: 15%;"> Edit </th>
            </tr>
          </thead>
          <draggable v-model="selectedScriptList" tag="tbody" :move="checkMove" @end="saveScript">
						<tr v-for="(item, index) in selectedScriptList" :key="index" v-bind:style="[ item.isMoved ? moved : {}]"
						>

              <td v-on:click="targetIndex(index);" v-bind:style="[ atIndex == index ? targeted : {}]">
                {{index}}
              </td>
              <td v-on:click="selectAction(item)" style="cursor: move;" v-bind:style="[ selectedAction == item ? selected : {},]">
                <div v-bind:style=[indexPush(index)]>
                  {{item}}
                </div>
              </td>
              <td>
                <button v-on:click="removeAction(index)" class="btn-danger btn-small btn-block smalltext">
                  X
                </button>
              </td>
              <td>
                <button v-on:click="selectAction(item)" class="btn-secondary btn-small btn-block smalltext">
                  EDIT
                </button>
              </td>
            </tr>
          </draggable>
          <tr>
            <td colspan=3 v-on:click="targetIndex(-1)" v-bind:style="[ atIndex == -1 ? targeted : {}]" style="height: 25px;" >
              <hr>
            </td>
					</tr>
        </table>
			</div>
			<div class="col-4 col script-match-height tablescroll default-thin-border script-list-height">
				<section v-if="false"> <Script v-bind:method="{addToScriptList, hardModifyScript}" v-bind:editedAction="selectedAction" /> </section>
				<ScriptAction v-model="selectedAction" />
				<div class="row">
					<button v-on:click="deselectAction()" class="btn-warning btn-small btn-block action-script-back">  Scripts </button>
				</div>
			</div>
    </div>
	</section>
	</div>
</template>

<script>
//import ActionBuilder from '@/components/ActionBuilder.vue'
import draggable from 'vuedraggable'
import Script from '@/components/Script.vue'
import ScriptAction from '@/components/ScriptAction.vue'

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
      moved:    { 'background-color': '#FFFFE0'   },
      selected: { 'background-color': 'peachpuff' },
      targeted: { 'background-color': 'lightblue' },
      action: {},
      selectedActionName: '',
			//selectedAction: {empty: true},
      targetedAction: {},
      atIndex: -1,
      person: {
        firstName: 'Bo',
        lastName: 'Andersen',
        age: 27
      },
			selectedScriptList: [1,2,3],
			testList: [{name: 'red'}, {name: 'blue'}, {name: 'gold'}],
      ifConditionIndexList : [],
      endConditionIndexList: [],
			elseConditionIndexList: [],
			currentScriptFlags: [],
			error: '',
    }
  },
  components: {
    //ActionBuilder,
    draggable,
    Script,
    ScriptAction,
  },
  props: {
		name: String,
		script: Object,
    currentInteraction: Object,
    method: Object,
		scriptList: Array,
		properties: Object,
		selectedAction: Object,
  },
  watch: {
    scriptList: function(newv, oldv){
      //console.log("oldv", JSON.stringify(oldv));
      //console.log("newv", JSON.stringify(newv));
      if(oldv != newv){
        this.selectedScriptList = newv;
        this.saveScript();
      }
    }
  },
  mounted(){
    console.log("TRUE TEST!", this.scriptList);
    this.selectedScriptList = this.scriptList;
    this.saveScript();
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
      this.deselectAction();
    },
    targetIndex(index){
      this.atIndex = index;
    },
    selectAction(script, index){
			console.log("CHECK", script);
			this.$parent.selectedAction = script;
			this.$parent.selectedIndex = index;
    },
    convertSelectedAction(script){
      this.selectedAction = script;
      //console.log("see the new selected action", this.selectedAction);
    },
    addToScriptList(script){
      //this.method.addToScriptList(script);

      if(this.atIndex < 0) this.selectedScriptList.push(script);
      else this.selectedScriptList.splice(this.atIndex, 0, script);
      //this.selectAction(script);

      this.validScriptList();
      this.saveScript();
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
      this.saveScript();
    },
    deselectAction(){
      //console.log("ACTION DESELECTED!");
      this.selectedAction = {empty:true};
    },
    saveScript(){
      console.log("Script Overwritten!");
			this.validScriptList();
			console.log("secret...");
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

      let elseConditionList = [];
      let elseIfConditionList = [];

      let error = "";
			let enclosedList = []; let startIf = [];
			this.checkScriptFlags(this.selectedScriptList);

			this.selectedScriptList.forEach(function(script, index){
        if(script.ifCondition) { ifConditionList.push(index); startIf.push(index)}
        if(script.elseCondition) elseConditionList.push(index);
        if(script.elseIfCondition) elseIfConditionList.push(index);

        if(script.endCondition){
          let enclosed = {start: startIf.pop(), end: index, else: [], elseIf: []};
          //CHECK ELSE CONDITION
          let test = (this.betweenList(elseConditionList, enclosed.start, enclosed.end));
          for(let i = 0; i < test ; i++){
            enclosed.else.push(elseConditionList.pop());
          }
          if(!error && enclosed.else.length >= 2)
            error = "EXTRA ELSE STATMENT BEFORE: " + index;

          //CHECK ELSE IF CONDITION
          let test2 = (this.betweenList(elseIfConditionList, enclosed.start, enclosed.end));
          for(let i = 0; i < test2 ; i++){
            enclosed.elseIf.push(elseConditionList.pop());
          }
          if(!error && enclosed.elseIf.length >= 2) error = "EXTRA ELSE IF STATMENT BEFORE: " + index;

          enclosedList.push(enclosed);
          endConditionList.push(index);
        }

        if(ifConditionList.length < endConditionList.length){
          if(!error) error = "If and End Statement Not Closed Correctly at index: " + index;
        }
        if(ifConditionList.length == endConditionList.length){
          if(elseConditionList.length >= 1) error = "ELSE OUTSIDE IF CASE!: " + index;
        }
      }, this);

      if(ifConditionList.length != endConditionList.length){
        if(!error) error = "Missing IF or END conditions to close condition!";
      }
      this.ifConditionIndexList  = ifConditionList ;
      this.endConditionIndexList = endConditionList;

      this.error = error;
      console.log("ENCLOSED!", enclosedList);

      return error;
    },

    betweenList(list, start, end){
      console.log(list);
      let between = [];
      let pop = 0;
      list.forEach(function(val){
        if(val >= start && val <= end){
          between.push(val);
          pop++;
        }
      });
      return pop;
		},

		checkScriptFlags(list){
			console.log("----------------------------------");
			console.log("----------------------------------");
			console.log("LIST", list);
			let flagList = [];
			if(list) list.forEach(function(script){
				console.log("script", script);
				if(script.conditionList){
					script.conditionList.forEach(function(condition){
						if(condition.isScriptList){
							flagList = [...flagList, ...condition.isScriptList];
						}
					});
				}
				if(script.eventName == "toggleScriptList"){
					console.log("SHOUD HAPPEN!!");
					console.log("SHOUD HAPPEN!!");
					console.log("SHOUD HAPPEN!!");
					console.log("SHOUD HAPPEN!!");
					flagList.push(name);
				}
			});
			console.log("SCRIPT FLAGS", flagList);
		},

    syncCondition(){

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

      this.elseConditionIndexList.some(function(elseIndex){
        if(atIndex == elseIndex){
          push--;
          return true;
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
    parentScriptList: function(){
      return true;
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

.tablescroll{
	max-height: 650px;
	overflow: scroll;
	position: relative;
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
  top: 0px;
}
.script-match-height-left{
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

.script-list-height {
	height: 500px;
	resize: both;
}

.action-script-back {
	position: absolute;
	width: 100px;
	bottom: 10px;
}

.this-title{
  font-size: 12px;
	font-weight: 900;
	text-color: gray;
	line-height: 1.6;

	position:relative;
	top:5px;
}

.border-down{
	border-color: black;
	border-bottom-style: solid;
  /*
  border-right-style: solid;
  border-left-style: solid;
   */
  border-width: 1px;
}

.script-row{
	font-size: 13px;
	border-bottom-style: solid;
	border-width: 1px;
	min-height: 18px;
}
.script-row-text{
	position: relative;
	top: 3px;
}
.script-row-index{
	position: relative;
	top: 3px;
  font-weight: bold;
}
.script-row:hover{
	background-color: #ededed;
	cursor: grab;
}
.no-border{
	border-style: hidden;
	overflow: visible;
}

input:focus {
	outline: none;
	background: #e5e4e2;
}




</style>
