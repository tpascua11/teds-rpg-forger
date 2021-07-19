<template>
  <section
    v-if="    (value.eventName == 'statModifierWithInfluence')"
    class="default-thin-border ">
    <div class="row default-title-sm2">
      <div class="col col-12">
        <i class="ra ra-player-lift ra-1x"></i>
        Stat With Influence
      </div>
    </div>
    <div class="row closer">
      <div class="col col-4">
       Set_Stat
      </div>
      <div class="col col-8">
        <v-select
          v-model="value.stat" :from="flagList"
          class="adaptable-width" placeholder="Add Flag"
          @create="createFlag($event)">
        </v-select>
      </div>
    </div>
    <div class="row closer">
      <div class="col col-4">
        Influence
      </div>
      <div class="col col-8">
        <v-select
          v-model="value.influence_stat" :from="flagList"
          class="adaptable-width" placeholder="Add Flag"
          @create="createFlag($event)">
        </v-select>
      </div>
		</div>
		<div class="row closer2">
			<div class="col col-12">
				<p class="supersmall"> Value + ( (Stat - Minimal Stat) / (Stat Per Increase) ) * Multiplier </p>
			</div>
		</div>
		<div class="row closer2">
      <div class="col col-10">
				<div class="row mox"> Default           <input class="time-fit" type="number" v-model="value.default_value" 			placeholder="default value..."> <br> </div>
				<div class="row mox"> Min Stat 		  		<input class="time-fit" type="number" v-model="value.min_stat"           	placeholder="min stat.."> <br> </div>
				<div class="row mox"> Stat Per Increase <input class="time-fit" type="number" v-model="value.stat_per_influence" 	placeholder="per influence"> <br> </div>
				<div class="row mox"> Multiplier    		<input class="time-fit" type="number" v-model="value.multiplier" 					placeholder="multiplier"> <br> </div>
        <div class="row mox"> Min Total 				<input class="time-fit" type="number" v-model="value.min_total" 					placeholder="min total"> <br> </div>
        <div class="row mox"> Max Total 				<input class="time-fit" type="number" v-model="value.max_total" 					placeholder="max total"> <br> </div>
			</div>
		</div>
    <div class="row closer2">
      <div class="col col-12 default-title-sm2">
        Test Result
      </div>
    </div>
    <div class="row closer">
      <div class="col col-12">
        <div class="row mox"> Stat <input class="time-fit" type="number" v-model="testStat" placeholder="default value..."> <br> 
        </div>
      </div>
    </div>
    <div class="row closer">
      <div class="col col-12 supersmall">
        <p> stat: {{testStat - value.min_stat}} = ({{testStat}} - {{value.min_stat}}) </p>
        <p> influnece: {{(testStat - value.min_stat)/value.stat_per_influence}}
          = {{testStat- value.min_stat}} / {{value.stat_per_influence}}
        </p>
        <p> multiplier: {{value.multiplier}} </p>

        Total {{(value.default_value -  -( (testStat - value.min_stat) /
        value.stat_per_influence) * value.multiplier)}}
      </div>

    </div>
  </section>
</template>

<script>
export default {
  name: 'Basic',
  data: function(){
    return {
      template: {name: '', flag: true},
      flagList: Object.keys(this.$root.world.statMap),
      testStat: 10,
			t2: {
				value: 0,
				statMin: 10,
				statDivideInfluence: 1,
				multiplier: 1,
				minValue: 0,
				maxValue: 20,
				/*
					let totalValue = value + ( (stat - statMin) / statDivideInfluence ) * multiplier;
					if(totalValue < minValue) Heal = minValue;
					if(totalValue > maxValue) Heal = maxValue;
				 */
			},
    }
  },
  props: ['value'],
  mounted(){},
  methods:{
    test(){},
    toggleFlag(){
      this.value.flag = !this.value.flag;
    },
    createFlag({value}){
      console.log("test", this.$root.world.statMap);
      //this.$root.world.flapMap[value] = this.value.flag;
      this.$root.world.statMap[value] = false;
      this.flagList = Object.keys(this.$root.world.statMap);
      this.value.name = value;
    }
  },
  computed: {
    classObject: function () {
      return { active: this.isActive && !this.error, 'text-danger': this.error && this.error.type === 'fatal'}
    }
  }
}

</script>

<style scoped>
.v-select {
  font-size: 13px;
  width: 100%;
}

  textarea {
    box-sizing:border-box;
    height: 100%;
    width: 100%;
  }

  .smallfit{
    height: 23px;
    display: table-cell;
    min-width: 120%;
    left: -10%;
    position: relative;
    padding:0.1em;
  }

  .descriptionTextArea{
    font-size: 14px;
  }

  .smallt{
    height: 38px;
    width: 50px;
    position:relative;
    left: -10px;
  }

  .smalltin{
    position:relative;
    font-weight: bold;
  }

  .closer{
    position:relative;
    top: 0px;
    margin-top: -40px;
    /*margin-bottom: 10px;*/
	}

  .mox{
    position:relative;
    top: 0px;
    margin-top: -20px;
    /*margin-bottom: 10px;*/
  }
  .closer2{
    position:relative;
    top: 0px;
    margin-top: -50px;
    /*margin-bottom: 10px;*/
  }

  .closer3{
    position:relative;
    top: 0px;
    margin-top: 0px;
    /*margin-bottom: 10px;*/
  }

	.time-fit{
		width: 100%;
		height: 30px;
	}

	.supersmall{
		font-size: 13px;
		font-color: green;
	}



</style>
