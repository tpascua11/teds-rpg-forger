<template>
  <div class="row">
    <div class="col-10 col">
      <div class="row">
        <section v-for="(item, index) in interactionList" :key="index">
          <button v-on:click="selectInteraction(item)" class="btn-default btn-small fixedButton">
            {{item.name}}
          </button>
        </section>
      </div>
    </div>

    <div class="col-2 col">
      <button v-on:click="createInteraction" class="btn-small btn-danger fixedButton">
        Add New Interaction
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InteractionList',
  data: function(){
    return {
      isActive: true,
    }
  },
  props: {
    selectedInteraction: Object,
    interactionList: Array,
  },
  mounted(){
  },
  methods:{
    createInteraction(){
      this.interactionList.push({
        name: 'New Interaaction',
        scriptList: []
      });
    },
    selectInteraction(interaction){
      console.log("selected interaction", interaction);
      this.$parent.selectInteraction(interaction);
    },
  },
  computed: {}
}

</script>

<style>
.fixedButton{
  width: 125px;
}
</style>
