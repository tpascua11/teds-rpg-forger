<!--
Condition Set is part of the IS_CONDITION of an objects
ITEM, AREA, INTERACTION[[],[]]

The Condition Set is the inner array [], which represent the AND Statement of
the is_condition.
	Everything in the single array must be true for the inner array to be true
But if there are more inner arrays [[],[],[],[]], ethier one of them
can be true for the whole is_condition to be true.
	A Condition Set can also be saved into a Complex so it can be easier to reused
or be used in a another Condition Set
-->

<template>
	<div class="simple-border max-height">
		<div class="row title"> Conditions </div>
		<!-- Input Types -->
		<section class="input-type-section">
			<!-- Flag Inputs  -->
			<div class="row">
				<div class="col-12 col">
					<ImprovedCondition
						v-model="value"
						:referenceList="referenceWorld.flagList"
					/>
				</div>
			</div>
		</section>

		<section class="top-section" v-if="true">
			<!-- Condition Sets -->
			<div class="row">
				<div v-if="false" class="col-3 col">
				</div>
				<div class="col-9 col">
					<div class="condition-list-table">
						<table class=''>
							<thead>
							</thead>
							<tbody class="condition-list-table">
								<tr v-if="showIsList" class="short-row" v-on:click="selectConditionType('FLAG')">
									<td>
										Is Flag
									</td>
									<td>
										{{conditionSet.isList}}
									</td>
									<td style="width: 10%">
										<button v-on:click="conditionSet.isList = []" class="btn-danger nice-small-fit btn-block ">
											X
										</button>
									</td>
								</tr>
								<tr v-if="showNotList" v-on:click="selectConditionType('FLAG')">
									<td style="width: 20%">
										NotFlag
									</td>
									<td>
										{{conditionSet.notList}}
									</td>
									<td>
										<button v-on:click="conditionSet.notList = []" class="btn-danger nice-small-fit btn-block ">
											X
										</button>
									</td>
								</tr>
								<tr v-if="showItemList" v-on:click="selectConditionType('ITEM')">
									<td style="width: 20%">
										<p> Has Item: </p>
									</td>
									<td>
										<p class="" v-for="(item, index) in conditionSet.hasItem" :key="index">
											"{{item.name}}" {{item.operator}} {{item.value}}
										</p>
									</td>
									<td>
										<button v-on:click="conditionSet.hasItem = []" class="btn-danger nice-small-fit btn-block ">
											X
										</button>
									</td>
								</tr>
								<tr v-if="showStatList" v-on:click="selectConditionType('STAT')">
									<td style="width: 20%">
										<p> Has Stat: </p>
									</td>
									<td>
										<p class="" v-for="(item, index) in conditionSet.hasStat" :key="index">
											"{{item.name}}" {{item.operator}} {{item.value}}
										</p>
									</td>
									<td>
										<button v-on:click="conditionSet.hasStat = []" class="btn-danger nice-small-fit btn-block ">
											X
										</button>
									</td>
								</tr>
								<tr v-if="conditionSet.time">
									<td style="width: 20%">
										<p> Time : </p>
									</td>
									<td>
										{{conditionSet.time}}
									</td>
									<td>
										<button v-on:click="conditionSet.time = null" class="btn-danger nice-small-fit btn-block ">
											X
										</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</section>
		<section class="confirm-section">
			<!-- Confirms  -->
			<div class="row">
				<!--
				<div class="col-3 col">
					<button v-on:click="insertConditionOr()" class="btn-warning nice-small-fit
						btn-block "> Set OR
					</button>
				</div>
				-->
				<div class="col-5 col">
					<input
						class="" type="string"
						v-model="name" placeholder="Value"
					>
				</div>
				<div class="col-4 col">
					<button v-on:click="saveComplex" class="btn-secondary nice-small-fit
						btn-block "> Save As Complex
					</button>
				</div>
				<div class="col-3 col" v-if="false">
					<button v-on:click="insertConditionAnd()" class="btn-danger nice-small-fit
						btn-block "> Set AND
					</button>
				</div>
			</div>
		</section>

	</div>
</template>

<script>
import ImprovedCondition from '@/components/inputs/ImprovedCondition.vue'



export default {
	name: 'ConditionSet',
	data: function(){
		return {
			menuConditionType: "FLAG",
			name: '',
			conditionTemplate: {
				isList: [],
				notList: [],
				hasItem: [],
				hasStat: [],
				time: {},
			},
		}
	},
	components: {
		ImprovedCondition,
	},
	props: ['value', 'world', 'confirm'],
	mounted(){
		console.log("SEE THE Reference World", this.$root.world);
	},
	methods:{
		selectConditionType(type){
			this.menuConditionType = type;
		},
		insertConditionAnd(){
			this.$emit('input', this.conditionSet);
			this.$emit('confirm');
			//this.referenceConditionList.push(this.conditionTemplate);
			//this.$emit('input', newSet);
		},
		insertConditionOr(){
			this.$emit('confirm');
			//this.convert();
			//this.$emit('input', newSet);
		},
		convert(){
			let newConditionTemplate = {
				isList: [],
				notList: [],
				hasItem: [],
				hasStat: [],
			};
			//let template = Object.assign({}, newConditionTemplate);

			this.conditionTemplate.isList.forEach(function(item){
				let template = JSON.parse(JSON.stringify(newConditionTemplate));
				template.isList.push(item);
				console.log("template added", template);
			});

			this.conditionTemplate.notList.forEach(function(item){
				let template = JSON.parse(JSON.stringify(newConditionTemplate));
				template.notList.push(item);
				console.log("template added", template);
			});

			this.conditionTemplate.hasItem.forEach(function(item){
				let template = JSON.parse(JSON.stringify(newConditionTemplate));
				template.hasItem.push(item);
				console.log("template added", template);
			});

			this.conditionTemplate.hasStat.forEach(function(item){
				let template = JSON.parse(JSON.stringify(newConditionTemplate));
				template.hasStat.push(item);
				console.log("template added", template);
			});
		},
		saveComplex(){
			if(this.$root.world.complexConditionMap[this.name]){
				if(!confirm("Complex Name Is Used \n do you wish to override")) return;
			}

			this.$root.world.complexConditionMap[this.name] =
				this.conditionSet;
			console.log("SEE THE COMPLEX MAP", this.$root.world.complexConditionMap);
		}

	},
	computed: {
		classObject: function () {
			return {
				active: this.isActive && !this.error,
				'text-danger': this.error && this.error.type === 'fatal'
			}
		},
		conditionSet: function(){
			return this.value;
		},
		referenceWorld: function(){
			//return this.$parent.referenceWorld;
			return this.$root.world;
		},
		referenceConditionList: function(){
			return this.value;
		},
		referenceFlagList: function(){
			return 10;
		},
		showIsList: function()    { return this.value.isList.length > 0},
		showNotList: function()   { return this.value.notList.length > 0},
		showItemList: function()  { return this.value.hasItem.length > 0},
		showStatList: function()  { return this.value.hasStat.length > 0},

	}
}

</script>

<style scoped>
textarea {
	box-sizing:border-box;
	height: 100%;
	width: 100%;
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

/* The Small Row For Condition */
.condition-short-row{
	min-height: 100px;
	font-size: 20px;
}

.new-line{
	white-space: pre;
}

.short-row{
	height: 25px;
	margin:0px;
}

.top-section{
}

.condition-list-table{
	height: 25vh;
	overflow: scroll;
}

.input-type-section{
  border: 2px solid black;
	height: 300px;
  overflow: scroll;
}

.confirm-section{
}
.title{
  font-size: 20px;
}

</style>
