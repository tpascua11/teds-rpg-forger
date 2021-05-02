<template>
	<div class="areabuilder">
		<div class="row areabuilderNav">
			<button class="btn-default  smalldir titleNav">
				Area Builder
			</button>
			<button class="btn-default space"/>
			<select v-model="selectedArea" class="smalldir areaName">
				<option v-for="(option, index) in referenceAreaList" v-bind:value="option" :key="index">
					{{option.name}}
				</option>
			</select>
			<button v-on:click="addAreaModal()" class="btn-success smalldir smallNo">
				Add
			</button>
			<button class="btn-default space"/>
			<button v-on:click="selectTab('area')" class="btn-default smalldir">
				Area
			</button>
			<button v-on:click="selectTab('interactions')" class="btn-default smalldir">
				Interactions
			</button>
			<button v-on:click="selectTab('npcs')" class="btn-default smalldir">
				NPCs
			</button>
		</div>


		<div v-if="tab === 'area'" class="row">
			<div class="col-2 col">
				<WorldLoadAndSave v-bind="world"/>
				<br>

				<AreaList
					v-bind:name="'Area List'"
					v-bind:areaList="world.areaList"
					v-bind:selectedArea="selectedArea"
					v-bind:method="{addList: addAreaModal}"
				/>

			</div>
			<div class="col-10 col">
				<Description v-bind:area="selectedArea" />

				<button v-on:click="deleteArea(selectedArea)" class="btn-default btn-small">
					Delete This Area
					</button>
			</div>

		</div>

		<div v-if="tab === 'interactions'">
			<div class="row">
			<!-- The True Template-->
				<div class="col-1 col main-upleft">
					<InteractionList
						v-bind:interactionList="referenceAreaInteractionList"
						v-bind:selectedInteraction="selectedInteraction"
						v-bind:name="'Interactions'"
					/>
				</div>
				<div class="col-3 col" v-if="selectedInteraction">
					<AreaInteraction
						v-bind:currentInteraction="selectedInteraction"
						v-bind:tags="world.tags"
					/>
				</div>

				<div class="col-8 col" v-if="selectedInteraction">
					<InteractionBuilder
						v-bind:currentInteraction="selectedInteraction"
					/>
				</div>

			</div>
		</div>

		<modal name="add-area-modal"
			:width="300"
			:height="300"
			:shiftY="0.1"
		>
				<center>
					<h3> New Area </h3>
					<input class="" type="string" v-model="newArea.name" placeholder="name">
					<br>
					<button v-on:click="createNewArea()" class="btn-default btn-small" :disabled="!checkIfAreaNameExist(newArea.name)">
						Create New Area
					</button>
				</center>
    </modal>
  </div>

</template>

<script>
import AreaList from '@/components/AreaList.vue'
import Description from '@/components/Description.vue'
import WorldLoadAndSave from '@/components/WorldLoadAndSave.vue'
import InteractionBuilder from '@/components/InteractionBuilder.vue'
import InteractionList from '@/components/InteractionList.vue'

import AreaInteraction from '@/components/AreaInteraction.vue'


export default {
  name: 'areabuilder',
  data: function() {
    return {
			selectedArea: {},
			selectedInteraction: {conditionList: []},
			testArray: [],
			buddy: {testArray: []},
			tab: 'interactions',
			newArea: {name: ""},
			newAreaname: "",
		};
  },
  components: {
		AreaList,
		Description,
		WorldLoadAndSave,
		InteractionBuilder,
		InteractionList,
		AreaInteraction,
  },
  props: {
    world: Object
  },
	computed: {
		referenceWorld: function(){
			return this.world;
		},
		referenceAreaList: function(){
			//if(!this.world || this.world.arealist) return [];
			if(this.world && this.world.areaList) return this.world.areaList;
			else return [];
		},
		referenceAreaInteractionList: function(){
			if(this.selectedArea && this.selectedArea.interactionList){
				return this.selectedArea.interactionList;
			}
			else return [];
		},
		referenceConnectedList: function(){
			return this.selectedArea.connectedAreaList;
		},
  },
  methods:{
    test(){
      console.log("Parent CAlling");
		},
		selectTab(tab){
			this.tab = tab;
		},
    selectNewArea(newArea){
			this.selectedArea = newArea;
			console.log("see selected", this.selectedArea);

			this.selectedInteraction = null;
		},
		addInteraction(interaction){
			this.selectedArea.interactionList.push(interaction);
		},
		selectInteraction(interaction){
			this.selectedInteraction = interaction;
		},
		createNewArea(){
			this.selectedArea = this.newArea;
			this.world.areaList.push(this.newArea);
			this.$modal.hide('add-area-modal');

			this.selectedInteraction = null;
		},
		addAreaModal() {
			this.newArea = {
				name: "",
				description: "",
				connectedAreaList: [],
				interactionList: [],
			}

			this.$modal.show('add-area-modal');
		},
		hide(){
			this.$modal.hide('add-area-modal');
		},
		deleteArea(selectedArea){
			if(!window.confirm("Are You Sure")) return ;

			this.world.areaList = this.world.areaList.filter((x) => x != selectedArea);

			if(this.selectedArea == selectedArea){
				this.selectedArea = {};
			}
		},
		checkIfAreaNameExist(name){
			if(!name) return false;

			let check = true;
			this.world.areaList.forEach(function(area){
				if(area.name == name) check = false;
			});
			return check;
		},
	},
  mounted(){
      this.selectedArea = this.world.areaList[0];
			console.log("SEE THE WORLD", this.world);
	}
}
</script>


<style>
textarea {
	box-sizing:border-box;
	height: 100%;
	width: 100%;
}

.bigbox {
	width:  650px;
	height: 250px;
}
.fixedo {
	position: absolute;
	top:1;
}

.round{
  border-radius: 25px;
  padding: 20px;
  width: 200px;
  height: 150px;
}
.smalldir{
	pointer-events: auto;
	font-color: red;
	height: 30px;
	font-size: 14px;
	width: 100px;
  padding:0.2em
}
.smallNo{
	width: 40px;
}
.titleNav{
	border: none;
	font-size: 20px;
}
.areaName{
	width: 150px;
}
.space{
	width: 30px;
	border: none;
}
.areabuilderNav{
	top: 5px;
	left: 200px;
	position: fixed;
	width: 100%;
	z-index: 100;
	pointer-events: none;
}

.main-upleft{
  margin-top: 35px;
}

.rowA{
  margin-top: -15px;
}

.nice-border{
	border: 1px solid black;
	font-size: 25px;
}

.simple-border{
	border: 1px solid black;
}

.hidden-border{
	border-style: none;
}

</style>
