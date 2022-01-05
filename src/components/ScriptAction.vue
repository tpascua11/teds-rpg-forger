<template>
  <!-- Main -->
  <section>
    <div v-if="false" class="row"> {{value}} </div>
    <!-- Script: Menu 1 -->
    <div v-if="value.empty">

      <div v-if="false" class="pure-u-1-1 border-down" style="height: 20px;">
        <div class="center this-title"> Actions </div>
      </div>

      <div>
        <br>
        <div class="pure-u-1-2">
            <button class="action-button" v-on:click="newDescription()"       > Description </button>
            <button class="action-button" v-on:click="newStat()"              > Stat </button>
            <button class="action-button" v-on:click="newStatWithInfluence()" > Stat Influence</button>
            <button class="action-button" v-on:click="newItem()"              > Item </button>
            <button class="action-button" v-on:click="newTime()"              > Time </button>
            <button class="action-button" v-on:click="newMove()"              > Move </button>
            <button class="action-button" v-on:click="toggleWorldFlag()"      > Toggle Flag </button>
            <button class="action-button" v-on:click="toggleAreaFlag()"       >  Area Flag </button>
            <button class="action-button" v-on:click="toggleScriptFlag()"     > Script Flag </button>
            <button class="action-button" v-on:click="newMoveIndex()"         > Set Index At </button>
            <button class="action-button" v-on:click="newChoiceList()"        > Choice List </button>
        </div>
        <div class="pure-u-1-2">
            <!--
            <button v-on:click="test()" class="btn-danger-outline btn-small btn-block smallfit">  If Condition</button>
            <button v-on:click="simpleScriptFlag()" class="btn-danger-outline btn-small btn-block smallfit">  If Script Flag </button>
            <button v-on:click="simpleAreaFlag()" class="btn-danger-outline btn-small btn-block smallfit">  If Area Flag</button>
            <button v-on:click="simpleFlag()" class="btn-danger-outline btn-small btn-block smallfit">  If World Flag</button>
            <button v-on:click="showModal('flagStat')" class="btn-danger-outline btn-small btn-block smallfit">  If Stat </button>
            <button v-on:click="test()" class="btn-danger-outline btn-small btn-block smallfit">  If Item </button>
            <button v-on:click="test()" class="btn-danger-outline btn-small btn-block smallfit">  If Time </button>
            <section class="default-title-sm2"> Tools </section>
            -->
            <button class="action-button" v-on:click="addIf()"      >  IF      </button>
            <button class="action-button" v-on:click="addElse()"    >  ELSE    </button>
            <button class="action-button" v-on:click="addElseIf()"  >  ELSE IF </button>
            <button class="action-button" v-on:click="addEnd()"     >  END     </button>
          </div>
        </div>
    </div>
    <!-- Script: If Condition -->
    <div class="row" v-if="value.ifCondition || value.elseIfCondition">
      <div class="col col-6">
        <button v-on:click="showModal('FlagStat')" class="btn-danger-outline btn-small btn-block smallfit">
          Stat Flags
        </button>
        <button v-on:click="showModal('FlagChanceOnStat')" class="btn-danger-outline btn-small btn-block smallfit">
          Chance Flags
        </button>
        <button v-on:click="showModal('ItemFlag')" class="btn-danger-outline btn-small btn-block smallfit">
          Item Flags
        </button>
        <button v-on:click="showModal('WorldFlag')" class="btn-danger-outline btn-small btn-block smallfit">
         World Flags
        </button>
        <button v-on:click="showModal('AreaFlag')" class="btn-danger-outline btn-small btn-block smallfit">
          Area Flags
        </button>
        <button v-on:click="showModal('ScriptFlag')" class="btn-danger-outline btn-small btn-block smallfit">
          Script Flags
        </button>
        <button v-on:click="showModal('TimeFlag')" class="btn-danger-outline btn-small btn-block smallfit">
          Time Flags
        </button>

        <button v-on:click="addIf()" class="btn-danger-outline btn-small btn-block smallfit">    	IF      </button>
        <button v-on:click="addElse()" class="btn-danger-outline btn-small btn-block smallfit">  	ELSE    </button>
        <button v-on:click="addElseIf()" class="btn-danger-outline btn-small btn-block smallfit"> ELSE IF </button>
        <button v-on:click="addEnd()" class="btn-danger-outline btn-small btn-block smallfit">  	END     </button>
        <br><br>
      </div>
    </div>
    <!-- Back -->
    <!-- Script Imports Additions -->
    <section>
      <Description v-model="value"/>
      <ToggleWorldFlag v-model="value"/>
      <ToggleScriptFlag v-model="value"/>
      <ToggleAreaFlag v-model="value"/>
      <MoveIndex v-model="value"/>

      <ModifierItem v-model="value"/>
      <ModifierStat v-model="value"/>
      <ModifierStatWithInfluence v-model="value"/>
      <Time v-model="value"/>
      <MoveToArea v-model="value"/>
      <ChoiceList v-model="value"/>

      <WorldFlag v-model="value"/>
      <AreaFlag v-model="value"/>
      <ScriptFlag v-model="value"/>
      <FlagStat v-model="value"/>
      <FlagChanceOnStat v-model="value"/>
      <ItemFlag v-model="value"/>
      <TimeFlag v-model="value"/>
    </section>

  </section>
</template>

<script>
import Description from '@/components/scriptModifier/Description.vue'
import ToggleWorldFlag from '@/components/scriptModifier/ToggleWorldFlag.vue'
import ToggleAreaFlag from '@/components/scriptModifier/ToggleAreaFlag.vue'
import ToggleScriptFlag from '@/components/scriptModifier/ToggleScriptFlag.vue'
import MoveIndex from '@/components/scriptModifier/MoveIndex.vue'

import MoveToArea from '@/components/scriptModifier/MoveToArea.vue'
import ModifierItem from '@/components/scriptModifier/Item.vue'
import ModifierStat from '@/components/scriptModifier/Stat.vue'
import ModifierStatWithInfluence from '@/components/scriptModifier/StatWithInfluence.vue'
import Time from '@/components/scriptModifier/Time.vue'

import ChoiceList from '@/components/scriptModifier/Choice.vue'

import AreaFlag    from '@/components/scriptCondition/AreaFlag.vue'
import WorldFlag   from '@/components/scriptCondition/WorldFlag.vue'
import ScriptFlag  from '@/components/scriptCondition/ScriptFlag.vue'
import ItemFlag    from '@/components/scriptCondition/ItemFlag.vue'
import FlagStat    from '@/components/scriptCondition/FlagStat.vue'
import TimeFlag    from '@/components/scriptCondition/TimeFlag.vue'

import FlagChanceOnStat from '@/components/scriptCondition/FlagChanceOnStat.vue'

export default {
  name: 'AreaList',
  data: function(){
    return {
      dog: "good",
      isActive: true,
      error: null,
      styleObject: { color: 'red', fontSize: '13px' },
      stuff: {},
    }
  },
  components: {
    Description,
    ToggleWorldFlag,
    ToggleAreaFlag,
    ToggleScriptFlag,
    MoveIndex,

    MoveToArea,
    ModifierItem,
    ModifierStat,
    ModifierStatWithInfluence,
    Time,
    ChoiceList,

    WorldFlag,
    AreaFlag,
    ScriptFlag,
    FlagStat,
    FlagChanceOnStat,
    ItemFlag,
    TimeFlag,
  },
  props: ['value'],
  mounted(){
  },
  methods:{
    test(){ console.log("------");},
    newAction(){},
    deselect(){ this.$parent.deselectAction(); },

    newDescription(){
      let template = {eventName: "addDescription"};
      this.$parent.addToScriptList(template);
    },
    toggleWorldFlag(){
      let template = {eventName: "toggleFlag", flag: true, name: ''};
      this.$parent.addToScriptList(template);
    },
    toggleAreaFlag(){
      let template = {eventName: "toggleAreaFlag", flag: true, name: ''};
      this.$parent.addToScriptList(template);
    },
    toggleScriptFlag(){
      let template = {eventName: "toggleScriptFlag", flag: true, name: ''};
      this.$parent.addToScriptList(template);
    },
    newMoveIndex(){
      let template = {eventName: "moveIndex",  name: ''};
      this.$parent.addToScriptList(template);
    },
    newItem(){
      let template = {eventName: "itemModifier",  name: '', amount: 0};
      this.$parent.addToScriptList(template);
    },
    newStat(){
      let template = {eventName: "statModifier",  name: '', number: 0};
      this.$parent.addToScriptList(template);
    },
    newStatWithInfluence(){
      let template = {
        eventName: "statModifierWithInfluence",
        stat: '', influence_stat: 0,
        default_value: 0, min_stat: 10, stat_per_influence: 1, multiplier: 1,
        min_total: 0, max_total: 100,
      };
      this.$parent.addToScriptList(template);
    },
    newTime(){
      let template = {eventName: "timePass", time: {years: 0, months: 0, days: 0, hours: 0, minutes: 0 }};
      this.$parent.addToScriptList(template);
      },
    newMove(){
      let template = {eventName: "moveToArea",  name: ''};
      this.$parent.addToScriptList(template);
    },
    newChoiceList(){
      let template = {eventName: "choiceList",  choiceList: []};
      this.$parent.addToScriptList(template);
    },
    //-----------------------------------------------------------------
    // Conditions
    //-----------------------------------------------------------------
    simpleFlag(){
      let template = {ifCondition: "WORLD", conditionList: [{isList: [], notList: []}]};
      this.$parent.addToScriptList(template);
    },
    simpleAreaFlag(){
      let template = {ifCondition: "AREA", conditionList: [{areaIsList: [], areaNotList: []}]};
      this.$parent.addToScriptList(template);
    },
    simpleScriptFlag(){
      let template = {ifCondition: "SCRIPT", conditionList: [{scriptIsList: []}]};
      this.$parent.addToScriptList(template);
    },
    addIf(){
      this.$parent.addToScriptList({ifCondition: "ADVANCED", conditionList: []});
      this.$parent.addToScriptList({endCondition: "ADVANCED"});
    },
    addElse(){
      this.$parent.addToScriptList({elseCondition: "ADVANCED"});
    },
    addElseIf(){
      this.$parent.addToScriptList({elseIfCondition: "ADVANCED", conditionList: []});
    },
    addEnd(){
      this.$parent.addToScriptList({endCondition: "ADVANCED"});
    },
    //-----------------------------------------------------------------

    //-----------------------------------------------------------------
    // Modal Conditions
    //-----------------------------------------------------------------
    showModal(name){
      this.$modal.show(name);
    },

    //-----------------------------------------------------------------
  },
  computed: {
    classObject: function () {
      return { active: this.isActive && !this.error, 'text-danger': this.error && this.error.type === 'fatal'}
    }
  }
}

</script>

<style scoped>
textarea {
  box-sizing:border-box;
  height: 100%;
}

.smallfit{
  height: 23px;
  display: table-cell;
  min-width: 120%;
  left: -10%;
  position: relative;
  padding:0.1em;
}

.input-type-name{
  font-size: 17px;
}

.action-button{
  width: 100%;
}


.this-title{
  font-size: 20px;
  font-weight: bold;
}

.border-down{
	border-bottom-style: solid;
  /*
  border-right-style: solid;
  border-left-style: solid;
   */
  border-width: 1px;
}


</style>
