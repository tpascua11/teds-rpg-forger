<template>
  <div class="row big">
    <div class="col-12">
      <div class="row">
        <!-- Area Selection Main Menu -->
        <div class="col-2 col paper">
          <div class="col-11">
          <div class="row title">
            <section v-if="lock"> Select Area  </section>
            <section v-else> {{selectedAreaName}} </section>
          </div>
          <div class="row">
            <v-select v-model="selected" as="name::name" :from="areaMap" tagging
              @clearable="false"
              @select="selectNewArea"
              @create="createNewArea" class="v-spec">
            </v-select>

            <button :disabled="lock" v-on:click="selectMode('INTERACTION_BUILDER')"
              class="btn-warning btn-small btn-block">
              Interactions
            </button>
            <button :disabled="lock" v-on:click="selectMode('AREA_CONFIGURE')"
              class="btn-success btn-small btn-block">
              Configure Area
            </button>
            <button :disabled="lock" v-on:click="selectMode('AREA_NETWORK')"
              class="btn-secondary btn-small btn-block">
              Area Network
            </button>
            <button :disabled="true" v-on:click="selectMode('TEST')"
              class="btn-default btn-small btn-block lightorange">
              On Visit Events
            </button>
            <button :disabled="true" v-on:click="selectMode('')"
              class="btn-danger btn-small btn-block">
              Hard Modify
            </button>
            </div>
          </div>
        </div>

        <div class="col-10 col paper">
          <section v-if="mode === 'INTERACTION_BUILDER'">
            <div class="row match-2">
              <!-- Area's Interaction List -->
              <div class="col-2 col">
                <p class="title2"> Interactions </p>
                      <button v-on:click="addNewInteraction()"
                        class="btn-warning btn-small btn-block">
                        Add Interaction
                      </button>
                      <hr>
                <section class="interaction-list-scroll">
                  <table class="table " style="width: 100%; table-layout: fixed;">
                    <draggable
                      tag="tbody"
                      v-model="selectedAreaInteractionList"
                      @end="saveAreaInteractionListPosition"
                    >
                      <tr class="thin-table-row" v-for="(item, index) in
                        selectedAreaInteractionList" :key="index"
                        v-on:click="selectInteraction(item)"
                        v-bind:style="[ item == selectedInteraction ?
                        styleSelected : {}]"
                      >
                        <td class="thin-table-row moveable"> {{item.name}}</td>
                      </tr>

                    </draggable>
                  </table>
                </section>
                <hr>
              </div>
              <!-- Area's Selected Interaction -->
              <div class="col-10 col paper">
                <section v-if="selectedInteractionEmpty">
                  <div class="row">
                    <div class="col-4 col">
                      <div class="row title3">
                        <div class="col-1 col">
                          <i class="ra ra-quill-ink ra-lg"></i>
                        </div>
                        <div class="col-6 col">
                          <input class="smallInput input3" type="string"
                            v-model="selectedInteraction.name" placeholder="write interaction name..."
                            ref="set_interaction_name"
                          >
                        </div>
                        <div class="col-1 col">
                          <button v-on:click="popShowCondition"
                            class="btn-default btn-small open-condition">
                            <i v-if="!showCondition" class="ra ra-key-basic ra-lg"></i>
                            <i v-else class="ra ra-key ra-lg"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div v-if="!showCondition" class="col-5 col small3">
                      <!--
                      IF {{selectedInteraction.conditionList[0].isList}}
                      AND IF NOT {{selectedInteraction.conditionList[0].isList}}

                      <table class="nice-border">
                        <tbody>
                          <tr class="thin-table-row" v-for="(item, index) in selectedInteraction.conditionList" :key="index">
                            <td>
                              OR {{item.isList}}
                            </td>
                          </tr>
                          <tr class="thin-table-row">
                            <td>
                              <Condition v-model="selectedInteraction.conditionList"/>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      -->
                    </div>
                    <div v-else class="col-5 col">
                    </div>
                    <div class="col-1 col small4">
                      <button v-on:click="deleteInteraction(selectedInteraction)"
                        class="btn-danger btn-small open-condition">
                        <i class="ra ra-crossed-bones ra-lg"></i>
                      </button>
                    </div>
                  </div>
                  <transition name="slide">
                    <div class="row move75up" v-if="showCondition">
                      <div class="col col-6 pink">
                        <textarea class="area-nice" v-model="selectedInteraction.description"
                          placeholder="interaction description"></textarea>
                      </div>
                      <div class="col col-6">
                          <Condition v-model="selectedInteraction.conditionList" />
                      </div>
                    </div>
                  </transition>
                  <div class="row move100up"
                  >
                    <ScriptListBuilder
                    v-bind:scriptList="selectedInteraction.scriptList"
                    v-bind:conditionList="selectedInteraction.conditionList"
                  />
                </div>
              </section>
            </div>
            </div>
          </section>
          <section v-if="mode === 'AREA_CONFIGURE'">
            <div class="row title2">
              Area Configure!
            </div>
            <div class="row">
              <div class="col-6 col">
              <textarea class="area-nice heightexpansion" v-model="selectedArea.description"
                    placeholder="area description">
                  </textarea>
              </div>
            </div>
          </section>
          <section v-if="mode === 'AREA_NETWORK'">
            <div class="row title2">
              Connected Areas
            </div>
            <div class="row">
              <div class="col col-6">
              <v-select v-model="selectedArea.connectedAreaList"
                as="name::name" :from="areaMap" tagging
                class="v-spec">
              </v-select>
              </div>
              <div class="col col-6">
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import ScriptListBuilder from '@/components/ScriptListBuilder.vue'
import draggable from 'vuedraggable'

import Condition from '@/components/modals/Condition.vue'

export default {
  name: 'Items',
  data: function() {
    return {
      mode: 'INFO',

      selected: '',
      isSelectingArea: false,
      selectedAreaName: '',
      selectedName: "Test",
      selectedArea: {},
      selectedAreaInteractionList: [],
      selectedInteraction: {},
      selectedItem: {},

      targetConditionList: [],

      showCondition: true,
      selectedCondition: {},

      areaMap: Object.keys(this.$root.world.areaMap),

      styleSelected: {
        'background-color': 'pink'
      },
    };
  },
  components: {
    ScriptListBuilder,
    draggable,
    Condition,
  },
  props: {
    //world: Object,
  },
  methods:{
    test(){console.log("test");},
    selectMode(mode){this.mode = mode;},
    refreshKeys(){
      this.areaMap = Object.keys(this.$root.world.areaMap);
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
      this.$forceUpdate();
    },
    createNewArea({value}){
      console.log('%c Creating New Area ! ', 'background: #222; color: #orange', value);
      this.isSelectingArea = false;
      //this.selected = value.name;
      this.selectedAreaName = value.name;

      this.$root.world.areaMap[value.name] = {
        interactionList: [],
      };
      this.refreshKeys();

      this.selectedArea = this.$root.world.areaMap[this.selectedAreaName];
      this.referenceAreaInteractionList();
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
      if(!confirm("Do You Wish to Delete Interaction!"));
      this.selectedAreaInteractionList =
        this.selectedAreaInteractionList.filter(
          item => item !== targetInteraction);
      this.saveAreaInteractionListPosition();
      this.selectedInteraction = {};
    },
    addToScriptList(){},
    checkMove(){console.log("CHECKING!");},
    convergeScriptList(scriptList){
      this.refreshList(scriptList);
      this.selectedInteraction.scriptList = scriptList;
      return this.selectedItem.scriptList;
    },
    refreshList(scriptList){
      scriptList.forEach(function(script){
        delete script.isMoved;
      });
    },
    referenceAreaInteractionList(){
      this.selectedAreaInteractionList =
        this.$root.world.areaMap[this.selectedAreaName].interactionList;
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
    }
  },
  computed: {
    areaList (){
      return this.$root.world.areaList;
    },
    areaMapKeys(){
      console.log(this.selectedArea);
      console.log('area map',
          Object.keys(this.$root.world.areaMap)
      );
      return Object.keys(this.$root.world.areaMap);
    },
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



</style>
