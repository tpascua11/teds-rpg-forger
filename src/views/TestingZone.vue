<template>
  <div class="TestingZone">
    <div v-if="false" class="row">
      <div class="col-2 col"> --- </div>
      <div class="col-2 col"> --- </div>
      <div class="col-6 col">
        {{take}}
        <SimpleSelect v-model="take"/>
        <select v-model="num"> <option v-bind:value="{ number: 123 }"></option>
        num</select>
      </div>
    <div v-if="false">
      <ConditionSet />

      <Dropdown v-bind:options="testArray"/>
        <!--
        <SelectFromList
          v-bind:targetListName="'flagList'"
          v-bind:type="'String'"
        />
        -->

      </div>
    </div>
  </div>
</template>

<script>

import ConditionSet from '@/components/inputs/ConditionSet.vue'
import Dropdown from '@/components/list/Dropdown.vue'
import SimpleSelect from '@/components/inputs/SimpleSelect.vue'

export default {
  name: 'areabuilder',
  data: function() {
    return {
      num: 0,
      take: '',
      selected: [],
      open: true,
			selectedArea: {},
			selectedInteraction: {conditionList: []},
			testArray: [1,2,3,4,5],
			buddy: {testArray: []},
			tab: 'interactions',
			newArea: {name: ""},
      newAreaname: "",
      areaMap:  Object.keys(this.$root.world.areaMap),

      conditionTemplate: {
        list: [[],[]],
        flagList: ['debug1'],
      },
		};
  },
  components: {
    ConditionSet,
    Dropdown,
    SimpleSelect,
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

p{
  font-size: 16px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active {
   transition-duration: 0.3s;
   transition-timing-function: ease-in;
}

.slide-leave-active {
   transition-duration: 0.3s;
   transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to, .slide-leave {
   max-height: 100px;
   overflow: hidden;
}

.slide-enter, .slide-leave-to {
   overflow: hidden;
   max-height: 0;
}



</style>
