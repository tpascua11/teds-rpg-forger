<template>
  <section class="">
   <modal name="flagStat"
      :width="650"
      :height="'auto'"
      :shiftY="0.1"
      :styles="'border: 2px solid black'"
      :scrollable="true"
    >
    <section class="">
      <div class="row this-title">
        Stat Condition
      </div>
      <section class="default-thin-border" v-for="(item1, index) in
        value.conditionList" :key="index">
        <div class="row">
          <div class="list-title col col-4">
            List {{index}}
          </div>
          <div class="col col-5 smallc">
            <button v-on:click="additionalAnd(item1)"
              class="btn-secondary btn-small smallt btn-block">
              <section class="smalltin"> And...</section>
            </button>
          </div>
          <div class="col col-3 smallc">
            <button v-on:click="cutConfirm(value.conditionList, index)"
              class="btn-danger btn-small smallt btn-block">
              <section class="smalltin"> X </section>
            </button>
          </div>
        </div>
        <section class="" v-for="(item2, index2) in item1.hasStat" :key="index2">
          <div class="closer row">
            <div class="col-3">
              <v-select @input="updateNow" v-model="item2.stat" :from="flagList" class="adaptable-width" placeholder="Add Flag"> </v-select> 
            </div>
            <div class="col-3">
              <button
                class="btn-secondary btn-small smallx smallc btn-block">
                <section class="smallxtext"> {{item2.stat}} </section>
              </button>
            </div>
            <div class="col-1">
              <button
                class="btn-default btn-small smallx smallc btn-block">
                <section class="smallxtext"> Total </section>
              </button>
            </div>
            <div class="col-1">
              <Dropdown
                v-model="item2.operator"
                v-bind:options="operatorList" />
            </div>
            <div class="col-2">
              <input class="smallc" type="number" v-model="item2.value" placeholder="num..">
            </div>
            <div class="col-1">
              <button v-on:click="cut(item1.hasStat, index2)"
                class="btn--outline btn-secondary btn-small smallx smallc btn-block">
                <section class="smallxtext"> X </section>
              </button>
            </div>
          </div>
        </section>
      </section>

      <div class="row">
        <button v-on:click="additionalOr()" class="btn--outline
          btn-success btn-small smallx btn-block">
          <section class="smallxtext"> Or... </section>
        </button>
      </div>
    </section>
  </modal>
  </section>
</template>

<script>
import Dropdown from '@/components/list/Dropdown.vue'

export default {
  name: 'FlagStat',
  components: {
    Dropdown,
  },
  data: function(){
    return {
      operatorList: [">", ">=", "==", "<=", "<"],
      templateObj : [
        {hasStat: [{operator: ">"}] }
      ],
      template: {operator: ">"},
      flagList: Object.keys(this.$root.world.flagMap),
    }
  },
  props: ['value'],
  watch: {},
  mounted(){},
  methods:{
    additionalAnd(list){
      if(!list.hasStat){
        list.hasStat = [];
      }
      list.hasStat.push({operator: ">"});
      this.$forceUpdate();
    },
    additionalOr(){
      this.value.conditionList.push({hasStat: [{operator: ">"}]});
    },
    additionalList(){
      this.value.conditionList.push({operator: ">"});
    },
    cut(list, index){
      list.splice(index, 1);
      this.$forceUpdate();
    },
    cutConfirm(list, index){
      if(!confirm("DELETE" + JSON.stringify(list))) return true;
      list.splice(index, 1);
    },
    closeModal(){
      this.$modal.hide('flagStatModal');
    },
    updateNow(){
      this.$forceUpdate();
    }
  },
  computed: {
  }
}

</script>

<style scoped>
.this-title{
  font-size: 20px;
  text-decoration: underline;
  font-weight: bold;
}
.smallc{
  height: 35px;
  width: 100%;
}
.smallt{
  height: 20px;
}
.smalltin{
  position:relative;
  top: -6px;
  font-weight: bold;
}
.list-title{
  font-size: 18px;
  font-weight: bold;
}
.smallxtext{
  font-size: 16px;
  position:relative;
  top: -2px;
  left: 5%;
  font-weight: bold;
}
.v-select {
  font-size: 12px;
  font-weight: bold;
  width: 100%;
}
.small{
  font-size: 15px;
  font-weight: bold;
}
.referenceList{
  /* width: 200px; */
  width: 100%;
  height: 40px;
}
.small{
  height: 10px;
}
.closer{
  position:relative;
  top: 0px;
  margin-top: -20px;
  /*margin-bottom: 10px;*/
}

</style>
