<template>
  <section class="">
   <modal name="FlagStat"
      :width="525"
      :height="'auto'"
      :shiftY="0.1"
      :styles="'border: 3px solid black'"
      :scrollable="true"
    >
    <section class="modal-total-height margin3">
      <div class="this-title">
        Stat Condition
			</div>
			<br>
			<div v-for="(item1, index) in value.conditionList" :key="index" class="">
				<section class="">
					<div style="height: 32px;" class="">
						<div class="pure-u-7-24 list-title">
							Case {{index+1}}
						</div>
						<div class="pure-u-14-24">
						</div>
						<div class="pure-u-3-24 right">
							<button v-on:click="cutConfirm(value.conditionList, index)"
								class="pure-button full-width button-white"
								style="height: 25px;">
								<div class="b-font"> Clear </div>
							</button>
						</div>
					</div>

					<div class="">
						<section class="" v-for="(item2, index2) in item1.hasStat" :key="index2">
								<div class="pure-u-2-24">
									<button v-on:click="type(item2)" class="pure-button full-width" style="height: 32px; font-size: 14px;">
										{{item2.type}}
									</button>
								</div>
								<div class="pure-u-10-24">
									<v-select v-model="item2.id" :options="flagList" label="id" @input="updateNow" :clearable="false">
										<template #selected-option="{}">
											<div class="v-font">
												{{list[item2.id].name}}
											</div>
										</template>
										<template #option="{id}">
											<div class="v-font">
												{{list[id].name}}
											</div>
										</template>
									</v-select>
								</div>

								<div class="pure-u-3-24">
									<v-select v-model="item2.operator" :options="operatorList" @input="updateNow" :clearable="false">
										<template #selected-option="{}">
											<div class="v-font">
												{{item2.operator}}
											</div>
										</template>
										<template #option="{label}">
											<div class="v-font">
												{{label}}
											</div>
										</template>
										<template #open-indicator="{ attributes }">
											<span v-bind="attributes"></span>
										</template>
									</v-select>
								</div>

								<div class="pure-u-4-24">
									<input class="full-width" type="number" v-model="item2.value" placeholder="num.." style="font-size: 13px; height: 27px;">
								</div>
								<div class="pure-u-1-24"></div>
								<div class="pure-u-1-24"></div>
								<div class="pure-u-3-24">
									<button v-on:click="cut(item1.hasStat, index2)" class="pure-button full-width" style="height: 30px;">
										X
									</button>
								</div>

							</section>
							<section v-if="true" class="">
								<div class="pure-u-8-24">
									<button v-on:click="additionalAnd(index)"
										class="pure-button full-width button-white"
										style="height: 30px;">
										<div class="left b-font-2"> + </div>
									</button>
								</div>
								<div class="pure-u-11-24"></div>
							</section>
						</div>
						<br>

				</section>
			</div>
			<div class="">
				<div class="pure-u-6-24">
					<button v-on:click="additionalOr()" class="pure-button full-width">
						Or... 
					</button>
				</div>
			</div>
    </section>
  </modal>
  </section>
</template>


<script>

export default {
  name: 'FlagStat',
  components: {
  },
  data: function(){
    return {
      operatorList: [">", ">=", "==", "<=", "<"],
      templateObj : [
        {hasStat: [{operator: ">"}] }
      ],
      template: {operator: ">"},
			flagList: Object.keys(this.$root.world.group.stat.list),
			list: this.$root.world.group.stat.list,
      keyList : Object.keys(this.$root.world.group.stat.list),
    }
  },
  props: ['value'],
  watch: {},
  mounted(){},
  methods:{
		additionalAnd(index){
			console.log("CHECK!");
			if(!this.value.conditionList[index].hasStat){
				this.$set(this.value.conditionList[index], 'hasStat', []);
			}
			this.value.conditionList[index].hasStat.push({operator: ">"});
		},
    additionalOr(){
      this.value.conditionList.push({hasStat: [{operator: ">"}], type: "#"});
    },
    additionalList(){
      this.value.conditionList.push({operator: ">"});
    },
    cut(list, index){
      list.splice(index, 1);
		},
		type(item){
			if(item.type != "%") item.type = "%";
			else item.type = "#";
			this.$forceUpdate();
		},
    cutConfirm(list, index){
      console.log(list);
      if(!confirm("DELETE" + JSON.stringify(list))) return true;
      list[index].hasStat = [];
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
.v-font{
  font-weight: bold;
	font-size: 13px;
	height: 22px;
	width: 100%;
}
.list-title{
  font-size: 17px;
	font-weight: bold;
	position:relative;
}
.v-select {
  font-size: 12px;
  font-weight: bold;
  width: 100%;
}
.referenceList{
  /* width: 200px; */
  width: 100%;
  height: 40px;
}
.modal-total-height{
	max-height: 750px;
	overflow: scroll;
}
.b-font{
	color: darkred;
	position: relative;
	top: -5px;
}
.button-green{
	background-color: lightgreen;
}

.button-red {
	background-color: #ff6666;
}
.button-pink {
	background-color: pink;
}
.button-white{
	background-color: white;
	border: 1px;
}
.b-font-2{
	font-size: 20px;
}






</style>
