<template>
	<div class="areabuilder">
		<div class="row areabuilderNav">
			<button class="btn-default  smalldir titleNav">
				Area Builder
			</button>
			<button class="btn-default space"/>
			<select v-model="selectedArea" class="smalldir areaName">
				<option v-for="(option, index) in world.areaList" v-bind:value="option" :key="index">
					{{option.name}}
				</option>
			</select>
			<button v-on:click="show()" class="btn-success smalldir smallNo">
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

				<AreaList
					v-bind:name="'Area List'"
					v-bind:areaList="world.areaList"
					v-bind:selectedArea="selectedArea"
				/>

				<AreaList
					v-bind:name="'Connected Areas'"
					v-bind:areaList="selectedArea.connectedAreaList"
					v-bind:selectedArea="selectedArea"
				/>
			</div>
			<div class="col-10 col">
				<Description v-bind:area="selectedArea" />
			</div>

		</div>

		<div v-if="tab === 'interactions'">
			<div class="row">
			<!-- The True Template-->
				<div class="col-1 col main-upleft">
					<InteractionList
						v-bind:interactionList="selectedArea.interactionList"
						v-bind:selectedInteraction="selectedInteraction"
						v-bind:name="'Interactions'"
					/>
				</div>
				<div class="col-3 col">
					<AreaInteraction
						v-bind:currentInteraction="selectedInteraction"
						v-bind:tags="world.tags"
					/>
				</div>

				<div class="col-8 col">
					<InteractionBuilder
						v-bind:currentInteraction="selectedInteraction"
					/>


				</div>
			</div>
		</div>

		<modal name="my-first-modal"
			:width="300"
			:height="300"
		>
				<center>
					<h3> New Area </h3>
					<input class="" type="string" v-model="newArea.name" placeholder="name">
					<br>
					<button v-on:click="createNewArea()" class="btn-default btn-small">
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
    worldLook(){
      return "lame";
    }
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
			this.$modal.hide('my-first-modal');
		},
		show () {
			this.newArea = {
				name: "",
				description: "",
				connectedAreaList: [],
				interactionList: [],
			}

			this.$modal.show('my-first-modal');
		},
		hide () {
			this.$modal.hide('my-first-modal');
		}
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
li{
  display: inline;
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
