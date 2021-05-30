<template>
  <div>
    <button v-on:click="show()" class="btn-warning btn-block thin">
      Add Condition
    </button>

    <modal name="conditionModal"
      :width="700"
      :height="750"
      :shiftY="0.1">

      <ConditionSet
        v-model="conditionSet"
        :world="referenceWorld"
        @confirm="confirmNewConditionSet()"
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
      conditionSet: {},
    }
  },
  props: ['value'],
  mounted(){},
  methods:{
    show () {
      this.$modal.show('conditionModal');
    },
    hide () {
      this.$modal.hide('conditionModal');
    },
    confirmNewConditionSet (){
      console.log("WHAT IS THE NEW CONDOTION SET", this.conditionSet);
      this.referenceConditionList.push(this.conditionSet);
      this.hide();
    }

  },
  computed: {
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

</style>

