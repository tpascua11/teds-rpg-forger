<template>
    <div class="row big">
    <div class="col-2 paper" >
      <i class="ra ra-round-shield ra-1x"></i>
      Commons
        <br><br>
        <section class="interaction-list-scroll">
          <table class="table " style="width: 100%; table-layout: fixed;">
            <draggable
              tag="tbody"
              v-model="commonEventList"
              @end="savePosition"
            >
              <tr class="thin-table-row" v-for="(item, index) in commonEventList" :key="index"
                v-on:click="selectInteraction(item)"
                v-bind:style="[ eventMatch(item) ? styleSelected : {}]"
              >
                <td v-if="!item.name" class="thin-table-row moveable">
                  Template
                </td>
                <td v-if="item.name" class="thin-table-row moveable">
                  {{item.name}}
                </td>
              </tr>
            </draggable>
          </table>
          <table class="table">
            <tbody>
            <tr class="thin-table-row clickable" v-on:click="createNewGlobalEventEmpty()">
              <td class="thin-table-row"> Create + </td>
            </tr>
            </tbody>
          </table>
        </section>
        <button v-on:click="createNewGlobalEventEmpty()"
          class="btn-success-outline btn-block btn-small ">
          <i class="ra  ra-slash-ring ra-lg"> Create </i>
        </button>

    </div>
    <div class="col-10 paper">
      <section v-if="!selectedGlobalEvent.empty">
        <div class="row">
          <div class="col-4 col">
            <div class="row title3">
              <div class="col-1 col">
                <i class="ra ra-quill-ink ra-lg"></i>
              </div>
              <div class="col-7 col">
                <input class="smallInput input3" type="string"
                  v-model="selectedGlobalEvent.name" placeholder="write global name..."
                >
              </div>
              <div class="col-1 col"></div>
            </div>
          </div>
          <div v-if="!showCondition" class="col-5 col small3">
          </div>
          <div v-else class="col-4 col">
          </div>
          <div class="col-1 col small5">
            <!--
            <button v-on:click="copyInteraction(selectedGlobalEvent)"
              class="btn-success btn-small open-condition">
              <i class="ra ra-mirror ra-lg"></i>
            </button>
            -->
          </div>
          <div class="col-1 col small4">
            <!--
            <button v-on:click="deleteInteraction(selectedGlobalEvent)"
              class="btn-danger btn-small open-condition">
              <i class="ra ra-crossed-bones ra-lg"></i>
            </button>
            -->
          </div>
        </div>
        <transition name="slide">
          <div class="row move75up" v-if="showCondition">
            <div class="col col-6 pink">
              <textarea class="area-nice" v-model="selectedGlobalEvent.description"
                placeholder="interaction description"></textarea>
            </div>
            <div class="col col-6">
              <Condition v-model="selectedGlobalEvent.conditionList" />
            </div>
          </div>
        </transition>
        <div class="row move100up">
          <ScriptListBuilder v-bind:scriptList="selectedGlobalEvent.scriptList" />
        </div>
      </section>
    </div>
  </div>
</template>

<script>

import Condition from '@/components/modals/Condition.vue';
import ScriptListBuilder from '@/components/ScriptListBuilder.vue';
import draggable from 'vuedraggable';

export default {
  name: 'Global',
  data: function() {
    return {
      selected: '',
      templateList: ['Normal'],
      selectedGlobalEvent: {empty: true},

      styleSelected: {
        'background-color': 'pink'
      },
      selectedInteraction: 0,
      commonEventList: this.$root.world.commonEventList,
      showCondition: true,
      selectedArea: {},
      rememberName: '',
    };
  },
  components: {
    ScriptListBuilder,
    Condition,
    draggable,
  },
  props: {
    world: Object,
  },
  computed: {
  },
  methods:{
    test(){
    },
    selectInteraction(targetEvent){
      this.selectedGlobalEvent = targetEvent;
    },
    createNewGlobalEventEmpty(){
      this.selectedGlobalEvent = {
        name: '',
        scriptList: [],
        conditionList: [],
      };
      this.commonEventList.push(this.selectedGlobalEvent);
    },
    eventMatch(target){
      return target == this.selectedGlobalEvent;
    },
    convergeScriptList(scriptList){
      this.refreshList(scriptList);
      this.selectedGlobalEvent.scriptList = scriptList;
      return this.selectedGlobalEvent.scriptList;
    },
    refreshList(scriptList){
      scriptList.forEach(function(script){
        delete script.isMoved;
      });
    },
    savePosition(){
      this.$root.world.commonEventList = this.commonEventList;
    },
    //----------
    popShowCondition(){
      this.showCondition = !this.showCondition;
    },
  },
  mounted(){
  }
}
</script>


<style scoped>
.big{
  width: 190vh;
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
.thin-table-row{
  font-size: 15px;
  line-height: 14px;
  height: 30px;
  border: 1px solid black;
}

.moveable{
  cursor: move;
}

.clickable{
  cursor: pointer;
}

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





</style>


