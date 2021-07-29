<template>
  <section class="">
   <modal name="FlagChanceOnStat"
      :width="650"
      :height="'auto'"
      :shiftY="0.1"
      :styles="'border: 2px solid black'"
      :scrollable="true"
    >
    <section class="modal-total-height">
      <div class="row this-title">
        Stat Chance Condition
      </div>
      <div class="row">
          Percentage + ( (Stat - Minimal Stat) / (Stat Per Increase) ) * Multiplier
      </div>
      <section class="modal-body-height">
        <section class="default-thin-border" v-for="(item1, index) in value.conditionList" :key="index">
          <div class="row">
            <div class="list-title col col-4">
              List {{index}}
            </div>
            <div class="col col-5 smallc">
              <button v-on:click="additionalAnd(index)"
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
          <section class="" v-for="(item2, index2) in item1.hasChanceStat" :key="index2">
            <div class="closer row">
              <div class="col-1"></div>
              <div class="col-3">
              </div>
            </div>
            <div class="closer row">
              <div class="col-1"> </div>
              <div class="col-3">
                Stat <v-select @input="updateNow" v-model="item2.name" :from="flagList" class="adaptable-width" placeholder="Add Flag"> </v-select>
              </div>
              <div class="col-1"> </div>
              <div class="col-2"> Start Stat    <input class="shorten-input" type="number" v-model="item2.stat_base" 			 		placeholder="default value..."> </div>
              <div class="col-2"> Stat/Inc.     <input class="shorten-input" type="number" v-model="item2.stat_per_increase" 	placeholder="default value..."> </div>
              <div class="col-2"> Multiplier    <input class="shorten-input" type="number" v-model="item2.multiplier" 				placeholder="default value..."> </div>
            </div>
            <div class="closer row">
              <div class="col-5"> </div>
              <div class="col-2"> Start %       <input class="shorten-input" type="number" v-model="item2.start_percentage" 	placeholder="default value..."> </div>
              <div class="col-2"> Max%          <input class="shorten-input" type="number" v-model="item2.max" 							placeholder="default value..."> </div>
              <div class="col-2"> Min %         <input class="shorten-input" type="number" v-model="item2.min" 							placeholder="default value..."> </div>
            </div>
            <div class="closer row">
              <div class="col-1"> </div>
              <div class="col-2"> Test Stat <input class="shorten-input" type="number" v-model="testStat" placeholder="default value..."> </div>
              <div class="col-5">
                <p>
                  Formula: {{item2.start_percentage}} + (({{testStat}} - {{item2.stat_base}})/ {{item2.stat_per_increase}}) x {{item2.multiplier}}
                </p>
              </div>
              <div class="col-2">
                <p>
                  Chance: {{Number(item2.start_percentage) + (((Number(testStat) - Number(item2.stat_base))/item2.stat_per_increase) * item2.multiplier)}} %
                </p>
							</div>
              <div class="col-2">
                <br>
                <button v-on:click="cut(item1.hasChanceStat, index2)"
                  class="btn-outline btn-danger btn-small smallx smallc btn-block">
                  <section class="smallxtext"> Delete </section>
                </button>
              </div>
            </div>
          </section>
        </section>
        <section style="height: 100px"> </section>
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

export default {
  name: 'FlagChanceOnStat',
  components: {
  },
  data: function(){
    return {
      operatorList: [">", ">=", "==", "<=", "<"],
      templateObj : [
        {hasChanceStat: [{
          start_percentage: 10,
          stat_per_increase: 1,
          multiplier: 1,
          stat_base: 10,
          max: 100,
          min: 0,
        }]}
      ],
      template: {operator: ">"},
      flagList: Object.keys(this.$root.world.statMap),
      testStat: 10,
    }
  },
  props: ['value'],
  watch: {},
  mounted(){},
  methods:{
		additionalAnd(index){
			console.log("CHECK!");
			if(!this.value.conditionList[index].hasChanceStat){
				this.$set(this.value.conditionList[index], 'hasChanceStat', []);
			}
      this.value.conditionList[index].hasChanceStat.push(
        {
        stat_base: 10,
        stat_per_increase: 1,
        multiplier: 1,
        start_percentage: 10,
        max: 100,
        min: 0,
        }
      );
		},
    additionalOr(){
      this.value.conditionList.push({hasChanceStat: [
        {
          stat_base: 10,
          stat_per_increase: 1,
          multiplier: 1,
          start_percentage: 10,
          max: 100,
          min: 0,
        }
      ]});
    },
    additionalList(){
      this.value.conditionList.push({operator: ">"});
    },
    cut(list, index){
      list.splice(index, 1);
    },
    cutConfirm(list, index){
      console.log(list);
      if(!confirm("DELETE" + JSON.stringify(list))) return true;
      list[index].hasChanceStat = [];
    },
    closeModal(){
      this.$modal.hide('flagStatModal');
    },
    updateNow(){
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
.modal-total-height{
  max-height: 750px;
}
.modal-body-height{
  max-height: 650px;
  overflow: scroll;
}
.modal-bottom-height{
  height: 100px;
}

.shorten-input{
  width: 90%;
  height: 35px;
}


</style>
