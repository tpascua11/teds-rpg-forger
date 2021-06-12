<template>
  <section class="">
      <div class="row this-title">
          Stat Condition
      </div>
      <section v-for="(item1, index) in templateObj" :key="index">
        <div class="row">
          <div class="col col-6">
            List {{index}}
          </div>
          <div class="col col-6">
            <button v-on:click="additionalAnd(item1.hasStat)" class="btn--outline btn-secondary btn-small smallx btn-block">
              <section class="smallxtext"> And...</section>
            </button>
          </div>
        </div>
        <section v-for="(item2, index2) in item1.hasStat" :key="index2">
          <div class="row">
            <div class="col-12">
              <v-select v-model="item2.stat" :from="flagList" class="adaptable-width" placeholder="Add Flag"> </v-select> 
            </div>
          </div>
          <div class="row">
            <div class="col-4 smallxtext">
              Current Amount
            </div>
            <div class="col-4">
              <Dropdown
                v-model="item2.operator"
                v-bind:options="operatorList" />
            </div>
            <div class="col-4">
              <input class="smallc" type="number" v-model="item2.value" placeholder="num..">
            </div>
          </div>
        </section>
        <hr> <hr>
      </section>

    <div class="row">
        <button v-on:click="additionalOr()" class="btn--outline
          btn-success btn-small smallx btn-block">
          <section class="smallxtext"> Or... </section>
        </button>
    </div>
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
  mounted(){
  },
  methods:{
    additionalAnd(list){
      console.log('test', list);
      list.push({operator: ">"});
    },
    additionalOr(){
      this.templateObj.push({hasStat: [{operator: ">"}]});
    },

    additionalList(){
      this.templateObj.push({operator: ">"});
    },
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
.smallxtext{
  font-size: 16px;
  position:relative;
  top: -2px;
  left: 5%;
  font-weight: bold;
}
.v-select {
  font-size: 14px;
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
.smallInput{
  width: 100%;
}
.sq{
  height: 50px;
  width: 50px;
}
.flagname{
  font-size: 17px;
  position:relative;
  top: -10px;
  left: -10px;
}

.fit1{
  margin-top: -50px;
}
.fit2{
  margin-top: -40px;
}
.creator{
  border: 1px solid black;
  min-width: 250px;
}
.big{
  width: 200px;
}
.title2{
  font-size: 12px;
  font-weight: bold;
}
.small{
  height: 10px;
}
.mini{
  height: 30px;
  width: 100%;
}
.mini-down{
  position:relative;
  font-size:14px;
  top: -17px;
  right: 5px;
  font-weight: bold;
}
.closer{
  position:relative;
  top: 30px;
}
.topcloser{
  font-size: 15px;
  height: 20px;
  position:relative;
  background-color: lightblue;
}

.thin{
  position:relative;
  top: -40px;
}


</style>
