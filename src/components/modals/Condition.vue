<!--
This is a div box that contains a button to create condition for object 
     it will show conditions added to objects
-->
<template>
  <div>
    <table class="default-thin-border">
      <tbody>
        <tr class="thin-table-row" v-for="(item, index) in conditionList" :key="index">
          <td class="default-based-font"
            colspan="2" v-on:click="editCondition(item);"
            style="cursor: context-menu"
            v-bind:style="[ item == selectedCondition ? styleSelected : {}]"
          >
            {{item}}
          </td>
          <td>
            <button v-on:click="removeCondition(index)" class="btn-danger thin">
              x
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <button v-on:click="makeNewConditionSet()" class="btn-warning btn-block thin">
      Add Condition
    </button>

    <modal name="conditionModal"
      :width="550"
      :height="700"
      :shiftY="0.1"
      :styles="'border: 2px solid black'"
    >
      <ConditionSet
        v-model="conditionSet"
        :world="referenceWorld"
        @confirm="updateConditionSet()"
      />
    </modal>
  </div>
</template>

<script>

import ConditionSet from '@/components/inputs/ConditionSet.vue'
export default {
  name: 'Conddition',
  components: {
    ConditionSet
  },
  data: function(){
    return {
      name: "OK",
      mode: "NEW",
      conditionSet: {
				isList: [],
				notList: [],
				hasItem: [],
				hasStat: [],
				time: {},
			},

      selectedCondition: {},
    }
  },
  props: ['value'],
  mounted(){},
  methods:{
    test(){},
    show () {
      this.mode = "NEW";
      this.conditionSet = {
				isList: [],
				notList: [],
				hasItem: [],
				hasStat: [],
				time: {},
			};
      this.$modal.show('conditionModal');
    },
    hide () {
      this.$modal.hide('conditionModal');
    },
    makeNewConditionSet (){
      this.conditionSet = {
				name: '',
				isList: [],
				notList: [],
				hasItem: [],
				hasStat: [],
				time: {},
      };
      this.referenceConditionList.push(this.conditionSet);
      this.$modal.show('conditionModal');
    },
    updateConditionSet(){
      this.hide();
    },
    confirmNewConditionSet (){
      console.log("WHAT IS THE NEW CONDOTION SET", this.conditionSet);
      if(this.mode === "NEW") this.referenceConditionList.push(this.conditionSet);
      this.hide();
    },
    editCondition(conditionSet){
      this.mode = "EDIT";
      this.conditionSet = conditionSet;
      this.$modal.show('conditionModal');
    },
    removeCondition(index){
      this.value.splice(index, 1);
    },
    arrayRemove(arr, value) {
        return arr.filter(function(ele){
            return ele != value;
        });
    }
  },
  computed: {
    conditionList(){
      return this.value;
    },
    referenceConditionList(){
      return this.value;
    },
    referenceWorld: function(){
      return this.$parent.referenceWorld;
    },
  }
}

</script>

<style scoped>
.thin{
  height: 30px;
  font-size: 14px;
  padding:0.5em;
}
.nice-border{
	border: 3px solid black;
}

</style>

