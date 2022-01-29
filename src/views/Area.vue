<template>
  <div>
    <div class="pure-u-1-24" >
    </div>

    <div class="pure-u-3-24">
      <div class="dt-border-x2">
        <JustList
          v-model="selectedEntity"
          v-bind:map="areaMap"
          v-bind:title="'Area List'"
          v-bind:set_height="'150px'"
          v-bind:template="area.template"
          @selected="refreshArea"
          @created="refreshInteractionList"
        />
      </div>
      <br>
      <div class="dt-border-x2">
        <JustList
          v-model="selectedEntity"
          v-bind:map="selectedArea.interaction_list"
          v-bind:title="'Interactions'"
          v-bind:template="interactionTemplate"
          v-bind:set_height="'350px'"
          @selected="showInteractionInterface"
        />
      </div>
    </div>

    <div class="pure-u-1-24"></div>

    <div class="pure-u-12-24">
      <div>
        <div class="border-down-x3">
          <div class="pure-u-1-24" >
            <i class="ra  ra-quill-ink ra-2x"
              style="position: relative; top: 5px; left: 5px;">
            </i>
          </div>
          <div class="pure-u-23-24"
               style="height: 50px; position:relative; top: 5px;
                      positon: relative; left: 12px;">
            <div class="" style="height: 25px; overflow: hidden; ">
              <input
                class="borderless-gray" placeholder="name..."
                v-model="selectedEntity.name"
                type="text" style="font-weight: 900; font-size: 25px; height:
                25px; width: 95%; text-decoration: underline; "
              />
            </div>
            <div class="pure-u-20-24" style="font-weight: 900;">
              Type: {{showInterface}}
            </div>
          </div>
        </div>
        <div class="">
          <ScriptListBuilder
            v-bind:scriptList="selectedEntity.script_list"
            v-bind:entity="selectedEntity"
            v-bind:selectedAction="selectedAction"
            v-model="selectedAction"
          />
        </div>
      </div>
    </div>

    <div class="pure-u-1-24"></div>

    <div class="pure-u-5-24 margin2" v-if="true">
      <section class="">
        <div class="">
        <ScriptAction v-model="selectedAction"
                      v-bind:scriptList="selectedEntity.script_list"
                      v-bind:entity="selectedAction"
        />
      </div>
      <div class="margin2" v-if="selectedAction.eventName != '' ">
        <div class="pure-u-3-5">
          <button class="button-warning pure-button full-width"
            v-on:click="deselectAction()"       > Back </button>
        </div>
        <div class="pure-u-2-5">
          <button class="button-error pure-button full-width"
              v-on:click="removeAction()"       > Remove </button>
        </div>
      </div>
      </section>
    </div>

  </div>
</template>

<script>

import JustList from '@/components/list/JustList.vue'
import ScriptListBuilder from '@/components/ScriptListBuilder.vue'
import ScriptAction from '@/components/ScriptAction.vue'

export default {
  name: 'Area',
  components: {
    JustList,
    ScriptListBuilder,
    ScriptAction,
  },
  data: function() {
    return {
      mode: 'INFO',
      key: -1,
      selectedArea: {interaction_list: {1: {test: 1}}},
      selectedInteraction: {script_list: []},
      selectedEntity: {},

      selectedAction: {eventName: ""},
      selectedIndex: -1,

      selected: '',
      isSelectingArea: false,
      selectedAreaName: '',
      selectedName: "Test",
      selectedAreaInteractionList: [],

      targetConditionList: [],

      showCondition: true,
      selectedCondition: {},

      //areaMap: this.$root.world.area_list,
      area:    this.$root.world.group.area,
      areaMap: this.$root.world.group.area.list,
      areaMapKeys: Object.keys(this.$root.world.area_list),
      styleSelected: {
        'background-color': 'pink'
      },
      map: {},
      name: 'empty',
      showInterface: '',
    };
  },
  props: {
    //world: Object,
  },
  methods:{
    refreshArea(){
      this.selectedArea = this.selectedEntity;
      this.showInterface = 'AREA';
    },
    refreshInteractionList(){
      console.log("check before", this.selectedInteraction);
      this.selectedInteraction = {empty: true};
      console.log("check after", this.selectedInteraction);
    },
    showAreaInterface(){
      this.showInterface = 'AREA';
    },
    showInteractionInterface(){
      this.showInterface = 'INTERACTION';
    },
    selectItem(){
      return 'empty';
    },
    addNewItem(){
      return 'empty';
    },
    test(){console.log("test");},
    selectMode(mode){
      this.mode = mode;
      this.referenceAreaInteractionList();
    },
    refreshKeys(){
      //this.areaMap = Object.keys(this.$root.world.areaMap);
      this.$forceUpdate();
      console.log("SEE AREA MAP", this.areaMap);
    },
    selectNewArea({value}){
      console.log('%c Selected Area ! ', 'background: #222; color: #bada55', value);
      this.isSelectingArea = false;
      this.selectedAreaName = value;

      this.selectedInteraction = {};
      this.referenceAreaInteractionList();

      this.selectedArea = this.$root.world.areaMap[this.selectedAreaName];
      this.$root.selectedArea = this.selectedArea;
      this.$forceUpdate();
    },
    createNewArea({value}){
      console.log('%c Creating New Area ! ', 'background: #222; color: #orange', value);
      this.isSelectingArea = false;
      //this.selected = value.name;
      this.selectedAreaName = value.name;

      this.$root.world.areaMap[value.name] = {
        interactionList: [],
        flagMap: {},
        onVisitEventList: [],
        onTriggerEventList: [],
      };
      this.refreshKeys();

      this.selectedArea = this.$root.world.areaMap[this.selectedAreaName];
      this.$root.selectedArea = this.selectedArea;
      this.referenceAreaInteractionList();
    },
    addNewTriggerEvent(){
      let newInteraction = {
        name: "",
        scriptList: [],
        conditionList:[]
      };
      this.selectedInteraction = newInteraction;

      this.$root.world.areaMap[this.selectedAreaName].triggerEventList.push(newInteraction);
    },
    addNewOnVisitEvent(){
      let newInteraction = {
        name: "",
        scriptList: [],
        conditionList:[]
      };
      this.selectedInteraction = newInteraction;

      this.$root.world.areaMap[this.selectedAreaName].onVisitEventList.push(newInteraction);
    },
    addNewInteraction(){
      let newInteraction = {
        name: "",
        scriptList: [],
        conditionList:[]
      };
      this.selectedInteraction = newInteraction;

      this.$root.world.areaMap[this.selectedAreaName].interactionList.push(newInteraction);
    },
    selectInteraction(targetInteraction){
      console.log(targetInteraction);
      this.selectedInteraction = targetInteraction;
      //console.log("SEE SELCTED INTERACTION", this.selectedInteraction);
    },
    deleteInteraction(targetInteraction){
      if(!confirm("Do You Wish to Delete Interaction!")) return;
      this.selectedAreaInteractionList =
        this.selectedAreaInteractionList.filter(
          item => item !== targetInteraction);
      this.saveAreaInteractionListPosition();
      this.selectedInteraction = {};
    },
    copyInteraction(targetInteraction){
      if(!confirm("Copy Interaction?"));
      this.selectedAreaInteractionList.push(
        JSON.parse(JSON.stringify(targetInteraction))
      );
    },
    addToScriptList(){},
    checkMove(){console.log("CHECKING!");},

    refreshList(scriptList){
      if(!scriptList) return;
      scriptList.forEach(function(script){
        delete script.isMoved;
      });
    },
    referenceAreaInteractionList(){
      if(this.mode == "ON_VISIT"){
        this.selectedAreaInteractionList = this.$root.world.areaMap[this.selectedAreaName].onVisitEventList;
      }
      else if(this.mode == "ON_TRIGGER_EVENT"){
        this.selectedAreaInteractionList = this.$root.world.areaMap[this.selectedAreaName].triggerEventList;
      }
      else{
        this.selectedAreaInteractionList = this.$root.world.areaMap[this.selectedAreaName].interactionList;
      }
    },
    saveAreaInteractionListPosition(){
      this.$root.world.areaMap[this.selectedAreaName].interactionList
        = this.selectedAreaInteractionList;
    },
    popShowCondition(){
      this.showCondition = !this.showCondition;
    },
    selectCondition(item){
      console.log("select condition", item);
      this.selectedCondition = item;
    },
    deselectAction(){
      //console.log("ACTION DESELECTED!");
      this.selectedAction = {empty:true};
    },

  },
  computed: {
    interactionBox:{
      get: function(){
        return {
          select: this.selectedInteraction,
          map: this.selectedArea.interactionList
        }
      },
      set: function(value){
        this.selectedInteraction = value;


        if(!this.selectedArea.interaction_list){
          this.selectedArea.interaction_list = {};
        }
        console.log("1");
        let index = Object.keys(this.selectedArea.interaction_list).length+1;
        console.log("2");
        this.selectedArea.interaction_list[index] = this.selectedInteraction;
        console.log("3");
      }
    },
    areaList (){
      return this.$root.world.areaList;
    },
    interactionTemplate (){
      return this.$root.world.template.interaction;
    },
    /*
    areaMapKeys(){
      console.log(this.selectedArea);
      console.log('area map',
        Object.keys(this.$root.world.areaMap)
      );
      return Object.keys(this.$root.world.areaMap);
    },
     */
    areaMap2(){
      return this.$root.world.areaMap;
    },
    lock(){
      if(!this.selectedAreaName) return true;
      else return false;
    },
    areaInteractionList(){
      return this.$root.world.areaMap[this.selectedAreaName].interactionList;
    },
    selectedInteractionEmpty(){
      return Object.keys(this.selectedInteraction).length;
    },
  },

  mounted(){
  }
}
</script>


<style scoped>
textarea {
  box-sizing:border-box;
  height: 100%;
  width: 100%;
  font-size: 16px;
}
.heightexpansion{
  height: 200px;
  border: 3px solid black;
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

.title{
  font-size: 24px;
  font-weight: bold;
  border-bottom: 2px solid #aaa;
}
.title2{
  font-size: 20px;
  font-weight: bold;
  border-bottom: 2px solid #aaa;
}
.title3{
  font-size: 20px;
  font-weight: bold;
  height: 50px;
  width: 40vh;
  border-bottom: 2px solid #aaa;

  position:relative;
  top: -40px;
}
.title3-line{
  display: inline-block;
}
.input3{
  height: 25px;
  width: 33vh;
  position:relative;
  top: 0px;
  right: 0px;
  border: 0px solid black;
}

.lightorange{
  background-color: #FFD580;
}

.big{
  width: 190vh;
}

.v-spec{
  font-size: 15px;
  min-width: 135px;
  font-weight: bold;
}

.the_x{
  text-align: center;
  position: relative;
  left:80px;
  /*top:2px;*/
}

.thin-table-row{
  font-size: 15px;
  line-height: 14px;
  height: 30px;
  border: 1px solid black;
}

.moveable{
  cursor: move;
}

.match-2{
  margin-top: -35px;
  /*background-color: grey;*/
}
.interaction-list-scroll{
  overflow: scroll;
  height: 70vh;
}

.open-condition{
  border: 3px solid black;
  position:relative;
  top: -10px;
  left: 125px;
}

.small3{
  font-size: 13px;
  position:relative;
  left: 100px;
  top: -25px;
  z-index: 10;
}

.small4{
  font-size: 13px;
  position:relative;
  left: 80px;
  top: -25px;
  z-index: 10;
}

.small5{
  font-size: 13px;
  position:relative;
  left: 80px;
  top: -25px;
  z-index: 20;
}

.test-transition{
  opacity: 1;
  height: 30px;
  transition: opacity 0.3s 0.1s, height 0.3s;
}

.slide-enter-active {
  transition-duration: 0.3s;
  transition-timing-function: ease-in;
}
.slide-leave-active {
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}
.slide-enter-to, .slide-leave {
  max-height: 500px;
  overflow: hidden;
}
.slide-enter, .slide-leave-to {
  overflow: hidden;
  max-height: 0;
}


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

.big{
  width: 190vh;
}

input:focus {
  outline: none;
  background: #e5e4e2;
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

.button-error {
  background-color: #E9967A;
}

.button-warning {
  background-color: #f2f28d;
}


</style>
