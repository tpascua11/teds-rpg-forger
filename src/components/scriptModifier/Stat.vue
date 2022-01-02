<template>
  <section v-if="(value.eventName == 'statModifier')">
    <div class="row script-select-title">
			<i class="ra ra-player-lift ra-1x"></i> Stat
    </div>
    <div class="row">
        <v-select
          v-model="value.name" :from="flagList"
          class="adaptable-width" placeholder="Add Flag"
          @create="createFlag($event)">
        </v-select>
		</div>
    <div class="row">
      <div class="col col-6">
        <button
          class="btn-secondary btn-small btn-block"
          :disabled="false"
        >
          <section class="smalltin"> Value </section>
        </button>
      </div>
      <div class="col col-6">
        <input style="width: 100%" class="" type="string" v-model="value.number" placeholder="..."> 
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
