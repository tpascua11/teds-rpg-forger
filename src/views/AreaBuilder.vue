<template>
  <div class="areabuilder">
    <div class="row">
      <div class="col-2 col">
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
				<div class="row">
					<div class="col-12 col bigbox"> <Description v-bind:area="selectedArea" /> </div>
				</div>
			</div>


			<!--
			<div class="col-2 col"> </div>
			<div class="col-4 col"> </div>
			-->
    </div>
  </div>

</template>

<script>
import AreaList from '@/components/AreaList.vue'
import Description from '@/components/Description.vue'

export default {
  name: 'areabuilder',
  data: function() {
    return {
      selectedArea: {}
    };
  },
  components: {
		AreaList,
		Description,
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
    }
  },
  mounted(){
      this.selectedArea;
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


</style>
