<template>
  <!-- Main -->
  <section>
    <div v-if="false" class="row"> {{value}} </div>
    <!-- Script: Menu 1 -->
    <div class="row default-thin-border" v-if="value.empty">
      <div class="col col-6 debugblue">
        <div class="row">
          <section class="default-title-sm2"> Actions </section>
        </div>
        <div class="row">
          <button v-on:click="newDescription()" class="btn-success-outline btn-small btn-block smallfit"> Description </button>
          <button v-on:click="test()" class="btn-success-outline btn-small btn-block smallfit"> Stat </button>
          <button v-on:click="test()" class="btn-success-outline btn-small btn-block smallfit"> Item </button>
          <button v-on:click="test()" class="btn-success-outline btn-small btn-block smallfit"> Time </button>
          <button v-on:click="test()" class="btn-success-outline btn-small btn-block smallfit"> Move </button>
          <button v-on:click="test()" class="btn-success-outline btn-small btn-block smallfit"> Toggle Flag </button>
          <button v-on:click="test()" class="btn-success-outline btn-small btn-block smallfit"> Script Flag </button>
          <button v-on:click="test()" class="btn-success-outline btn-small btn-block smallfit"> Set Index At </button>
        </div>
      </div>
      <div class="col col-6 debugpink">
        <div class="row">
          <section class="default-title-sm2"> Conditions </section>
        </div>
        <div class="row">
          <button v-on:click="test()" class="btn-danger-outline btn-small btn-block smallfit">  If Condition</button>
          <button v-on:click="simpleScriptFlag()" class="btn-danger-outline btn-small btn-block smallfit">  If Script Flag </button>
          <button v-on:click="simpleAreaFlag()" class="btn-danger-outline btn-small btn-block smallfit">  If Area Flag</button>
          <button v-on:click="simpleFlag()" class="btn-danger-outline btn-small btn-block smallfit">  If World Flag</button>
          <button v-on:click="showModal('flagStat')" class="btn-danger-outline btn-small btn-block smallfit">  If Stat </button>
          <button v-on:click="test()" class="btn-danger-outline btn-small btn-block smallfit">  If Item </button>
          <button v-on:click="test()" class="btn-danger-outline btn-small btn-block smallfit">  If Time </button>
          <section class="default-title-sm2"> Tools </section>
          <button v-on:click="test()" class="btn-danger-outline btn-small btn-block smallfit">  ELSE </button>
          <button v-on:click="test()" class="btn-danger-outline btn-small btn-block smallfit">  ELSE IF </button>
          <button v-on:click="test()" class="btn-danger-outline btn-small btn-block smallfit">  END</button>
        </div>
      </div>
    </div>
    <!-- Script: If Condition -->
    <div class="row" v-if="value.ifCondition">
      <div class="col col-6 debugpink">
        <button v-on:click="showModal('flagStat')" class="btn-danger-outline btn-small btn-block smallfit">
          Stat Condition
        </button>
        <br><br>
      </div>
    </div>
    <!-- Back -->
    <div class="row">
      <button v-on:click="deselect()" class="btn-danger-outline btn-small btn-block ">  Back </button>
    </div>
    <br><br>
      <!-- Script Imports Additions -->
    <section>
      <Description v-model="value"/>
      <WorldFlag v-model="value"/>
      <AreaFlag v-model="value"/>
      <ScriptFlag v-model="value"/>
      <FlagStat v-model="value"/>
    </section>

  </section>
</template>

<script>
import Description from '@/components/scriptInput/Description.vue'
import WorldFlag   from '@/components/scriptInput/WorldFlag.vue'
import AreaFlag    from '@/components/scriptInput/AreaFlag.vue'
import ScriptFlag  from '@/components/scriptInput/ScriptFlag.vue'
import FlagStat    from '@/components/scriptInput/FlagStat.vue'


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
    WorldFlag,
    AreaFlag,
    ScriptFlag,
    FlagStat,
  },
  props: ['value'],
  mounted(){
  },
  methods:{
    test(){ console.log("------");},
    newAction(){},
    newDescription(){
      let template = {eventName: "addDescription"};
      this.$parent.addToScriptList(template);
    },
    deselect(){ this.$parent.deselectAction(); },
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

</style>
