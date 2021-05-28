<template>
  <div class="row big">
    <div class="col-12">
      <div class="row">
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
            <div class="row">
              <div class="col-2 col ">
                <p class="title2"> Interactions </p>
                <table class="table " style="width: 100%; table-layout: fixed;">
                  <draggable v-model="selectedScriptList" tag="tbody" :move="checkMove">
                    <tr class="thin-table-row" v-for="(item, index) in selectedScriptList" :key="index">
                      <td class="thin-table-row"> {{item.name}}</td>
                    </tr>

                  </draggable>
                  <tr> <hr> </tr>
                </table>
              </div>
              <div class="col-10 col">
                  <ScriptListBuilder
                    v-bind:method="{addToScriptList, convergeScriptList}"
                    v-bind:scriptList="selectedItem.scriptList"
                    v-bind:name="selectedName"
                  />
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
      isSelectingArea: false,
      selected: '',
      selectedAreaName: '',
      selectedName: "Test",
      selectedArea: {},
      areaMap: Object.keys(this.$root.world.areaMap),
      selectedScriptList: [
        {name: 'test'},
        {name: 'test'},
        {name: 'test'},
        {name: 'test'},
        {name: 'test'},
        {name: 'test'}
      ],
      selectedItem: {},
      mode: 'INFO',
    };
  },
  components: {
    ScriptListBuilder,
    draggable,
  },
  props: {
    //world: Object,
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
    }
  },
  methods:{
    test(){
      console.log("test");
    },
    selectMode(mode){
      this.mode = mode;
    },
    refreshKeys(){
      this.areaMap = Object.keys(this.$root.world.areaMap);
      this.$forceUpdate();
      console.log("SEE AREA MAP", this.areaMap);
    },
    selectNewArea({value}){
      console.log('%c Selected Area ! ', 'background: #222; color: #bada55', value);
      this.isSelectingArea = false;
      this.selectedAreaName = value;
      this.$forceUpdate();
    },
    createNewArea({value}){
      console.log('%c Creating New Area ! ', 'background: #222; color: #orange', value);
      this.isSelectingArea = false;
      //this.selected = value.name;
      this.selectedAreaName = value.name;

      this.$root.world.areaMap[value.name] = {};
      this.refreshKeys();
    },
    addToScriptList(){},
    convergeScriptList(){}
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
  line-height: 14px;
  height: 10px;
}

</style>
