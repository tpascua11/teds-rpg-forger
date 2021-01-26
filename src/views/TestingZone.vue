<template>
  <div class="TestingZone">
    <div class="row"></div>
    <div class="row simple-border">
      <div class="col-2 col"> </div>
      <div class="col-2 col"> </div>
      <div class="col-2 col"> Testing Zone </div>
      <div class="col-2 col"> </div>
      <div class="col-2 col"> </div>
    </div>
    <div class="row">
      <div class="col-2 col"> --- </div>
      <div class="col-2 col"> --- </div>
      <div class="col-6 col nice-border">
        {{conditionTemplate.flagList}}
      </div>
    </div>

    <div class="row">
      <div class="col-2 col"> --- </div>
      <div class="col-2 col"> --- </div>
      <div class="col-6 col nice-border">
        <FlagInput v-model="conditionTemplate.flagList"/>
      </div>
    </div>
    <div class="row">
      <div class="col-2 col"> --- </div>
      <div class="col-2 col"> --- </div>
      <div class="col-6 col nice-border">
        <ItemInput />
      </div>
    </div>
    <div class="row">
      <div class="col-2 col"> --- </div>
      <div class="col-2 col"> --- </div>
      <div class="col-6 col nice-border">
        <StatInput />
      </div>
    </div>



  </div>
</template>

<script>

import FlagInput from '@/components/inputs/FlagInput.vue'
import ItemInput from '@/components/inputs/ItemInput.vue'
import StatInput from '@/components/inputs/StatInput.vue'

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

      conditionTemplate: {
        list: [[],[]],
        flagList: ['debug1'],
      },
		};
  },
  components: {
    FlagInput,
    ItemInput,
    StatInput,
  },
  props: {
    world: Object
  },
	computed: {
		referenceWorld: function(){
			return this.world;
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
.nice-border{
	border: 1px solid black;
}

.simple-border{
	border: 1px solid black;
}

.hidden-border{
	border-style: none;
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



</style>
