<template>
  <div>
    <button v-on:click="show()" class="btn-success btn-block btn-small">
      MoveArea
    </button>

   <modal name="modal"
      :width="400"
      :height="300"
      :shiftY="0.1">
      <div>
        <select v-model="selectedArea" class="smalldir areaName">
          <option v-for="(option, index) in referenceAreaList" v-bind:value="option" :key="index">
            {{option.a}}
          </option>
        </select>


        <button v-on:click="completeAction()" class="btn-success btn-block btn-small">
          Complete Action
        </button>

      </div>
    </modal>
  </div>
</template>

<script>
export default {
  name: 'MoveToArea',
  data: function(){
    return {
      selectedArea: {},
      referenceAreaList: [{a:1}, {a:2}, {a:3}]
    }
  },
  props: {
    name: String,
    areaList: Array,
    referenceList: Array,
    selectedChoice: Object,
    topo: Object,
    addScript: Object,
  },
  mounted(){},
  methods:{
    show () {
      this.$modal.show('modal');
    },
    hide () {
      this.$modal.hide('modal');
    },
    completeAction(){
      this.addScript.activate({test: "test", selectedArea: this.selectedArea});
    }

  },
  computed: {
  }
}

</script>

<style scoped>
</style>
