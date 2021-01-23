<template>
  <div class="basedHeight">
    <div class="row">
      <div class="col-5 col">
        <div class="row">
          <input class="bigInput" type="string" v-model="selectedInteraction.name" placeholder="...">
        </div>
        <div class="row">
          <table class="table">
            <thead>
             <tr>
                <th scope="col"> Condition </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> </td>
              </tr>
            </tbody>
          </table>
        </div>
       </div>

      <div class="col-5 col">
        <div class="row bordero">
          <section v-for="(item, index) in interactionList" :key="index">
            <button v-on:click="selectInteraction(item)" class="btn-default fixedButton">
              {{item.name}}
            </button>
          </section>
        </div>
      </div>
      <div class="col-1 col addInteraction">
        <button v-on:click="createInteraction" class="btn-small btn-danger">
          Add New Interaction
        </button>
      </div>
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
  height: 25px;
  padding:0.2em;
  font-size: 15px;
}
.bordero {
  top:100px;

  overflow: scroll;
  margin:0px 0px -20px 0px;
}
.addInteraction{
  position: relative;
}
.basedHeight{
  height: 25vh;
  /* border-top: 1px solid; */
}
.bigInput{
  height: 50px;
  width: 250px;
  font-size: 25px;
  border: 0;
  background-color: #E8E8E8;
}
table {
  /* border: 1px solid black; */
  /*  border: none; */
  border: 1px solid black;
}

</style>
