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
            <button :disabled="lock" v-on:click="selectMode('')"
              class="btn-success btn-small btn-block">
              Info
            </button>
            <button :disabled="lock" v-on:click="selectMode('')"
              class="btn-secondary btn-small btn-block">
              Connected
            </button>
            <button :disabled="lock" v-on:click="selectMode('TEST')"
              class="btn-default btn-small btn-block lightorange">
              Info
            </button>
            <button :disabled="lock" v-on:click="selectMode('')"
              class="btn-danger btn-small btn-block">
              Testing
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
                    >
                      <tr class="thin-table-row" v-for="(item, index) in
                        areaInteractionList" :key="index"
                        v-on:click="selectInteraction(item)"
                        v-bind:style="[ item == selectedInteraction ?
                        styleSelected : {}]"
                      >
                        <td class="thin-table-row"> {{item.name}}</td>
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
                          v-model="selectedInteraction.name" placeholder="write interaction name...">
                      </div>
                    </div>
                  </div>
                  <div class="col-6 col">
                  </div>
                </div>
                <div class="row match-2 move50up">
                  <ScriptListBuilder
                    v-bind:scriptList="selectedInteraction.scriptList"
                  />
                </div>
                </section>
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
      selectedInteraction: {},
      selectedItem: {},

      areaMap: Object.keys(this.$root.world.areaMap),

      styleSelected: {
        'background-color': 'pink'
      },
    };
  },
  components: {
    ScriptListBuilder,
    draggable,
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
      console.log("SEE SELCTED INTERACTION", this.selectedInteraction);
    },
    addToScriptList(){},
    checkMove(){console.log("CHECKING!");},
    convergeScriptList(scriptList){
      this.refreshList(scriptList);
      this.selectedInteraction.scriptList = scriptList;
      console.log("SEE SELCTED INTERACTION", this.selectedInteraction);
      return this.selectedItem.scriptList;
    },
    refreshList(scriptList){
      scriptList.forEach(function(script){
        delete script.isMoved;
      });
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
  height: 20%;
  width: 100%;
  font-size: 14px;
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
  height: 10px;
  border: 1px solid black;
}

.match-2{
  margin-top: -35px;
  /*background-color: grey;*/
}
.interaction-list-scroll{
  overflow: scroll;
  height: 70vh;
}




</style>
