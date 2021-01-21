<template>
  <div class="row">
    <div class="col-10 col">
      <div class="row">
        Interactions
      </div>
      <div class="row bordero">
        <section v-for="(item, index) in interactionList" :key="index">
          <button v-on:click="selectInteraction(item)" class="btn-default btn-small fixedButton">
              {{item.name}}
          </button>
        </section>
      </div>
    </div>

    <div class="col-2 col">
      <button v-on:click="createInteraction" class="btn-small btn-danger">
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
      if(!this.interactionList){
        console.log('interaction list is bad');
        return;
      }

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
  width: 137px;
  height: 30px;
}
.bordero {
  border-style: solid;
  height:75px;
  top:100px;

  overflow: scroll;
}
</style>
