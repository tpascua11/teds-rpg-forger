<template>
	<div class="areabuilder">
		<div class="row">
			<select v-model="selectedArea">
				<option v-for="(option, index) in world.areaList" v-bind:value="option" :key="index">
					{{option.name}}
				</option>
			</select>

			<button v-on:click="selectTab('area')" class="btn-default btn-small">
				Area
			</button>
			<button v-on:click="selectTab('interactions')" class="btn-default btn-small">
				Interactions
			</button>
			<button v-on:click="selectTab('npcs')" class="btn-default btn-small">
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

		<div v-if="tab === 'interactions'" class="row">
				<div class="col-12 col">
				<div class="row">
				</div>

				<InteractionList
					v-bind:interactionList="selectedArea.interactionList"
				/>

				<InteractionBuilder v-bind:currentInteraction="selectedInteraction"/>
			</div>
    </div>
  </div>

</template>

<script>
import AreaList from '@/components/AreaList.vue'
import Description from '@/components/Description.vue'
import WorldLoadAndSave from '@/components/WorldLoadAndSave.vue'
import InteractionBuilder from '@/components/InteractionBuilder.vue'
import InteractionList from '@/components/InteractionList.vue'


export default {
  name: 'areabuilder',
  data: function() {
    return {
			selectedArea: {},
			selectedInteraction: {},
			testArray: [],
			buddy: {testArray: []},
			tab: 'interactions',
		};
  },
  components: {
		AreaList,
		Description,
		WorldLoadAndSave,
		InteractionBuilder,
		InteractionList,
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
    selectNewArea(newArea){
			this.selectedArea = newArea;
			console.log("see selected", this.selectedArea);
		},
		createNewArea(){
		},
		addInteraction(interaction){
			this.selectedArea.interactionList.push(interaction);
		},
		selectInteraction(interaction){
			this.selectedInteraction = interaction;
		},
		selectTab(tab){
			this.tab = tab;
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


</style>
