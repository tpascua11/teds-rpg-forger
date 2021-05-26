<template>
  <div class="creator">
    <div class="row">
      <div class="col">
        {{editMode}}
      </div>
    </div>
    <div class="row fit1">
      <div class="col-12 col">
        <v-select
          v-model="selectedName"
          as="name::id"
          :from="flagMap"
          @create="test"
        />
      </div>
    </div>
    <div class="row fit1">
      <div class="col-12 col">
        <button v-on:click="switchType" class="btn-warning-outline btn-small
          smallfit btn-block">
          {{flag}}
        </button>
      </div>
    </div>
    <div class="row fit2">
      <div class="col-4 col">
        <button v-on:click="cancelAction" class="btn-danger btn-small btn-block ">
          X
        </button>
      </div>
      <div class="col-8 col">
        <button v-on:click="completeAction" class="btn-success-outline btn-small btn-block smallfit">
          Toggle Flag
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToggleFlag',
  data: function(){
    return {
      description: "",
      selectedItem: {},
      selectedName: '',
      type: 'IS',
      flag: true,
      mode: '',
    }
  },
  props: {
    name: String,
    templateA: Object,
    editMode: String,
    selectDescription: String,
  },
  watch: {
    templateA: function(oldv, newv){
      console.log("replace!");

      this.selectedName = newv.name;
    }
  },
  mounted(){
    this.list = Object.keys(this.$root.world.flagMap);
    this.getTemplateA();

  },
  methods:{
    test(){
    },
    switchType(){
      this.flag = !this.flag;
    },
    show (){
      this.$modal.show('add-description-modal');
    },
    hide () {
      this.$modal.hide('add-description-modal');
    },
    completeAction(){
      console.log("what type is it", this.flag);
      console.log("FLAG", this.selectedName);

      let template = {
        eventName: "toggleFlag",
        name: this.selectedName,
        flag: this.flag,
      }
      this.$parent.forgeAction(template);
      this.$parent.cancel();
    },
    cancelAction(){
      console.log("canceling action");
      this.$parent.cancel();
    },
    getTemplateA(){
      if(this.templateA.name) this.selectedName  = this.templateA.name;

      if(this.templateA.name){
        this.mode = 'EDIT';
      }
      else{
        this.mode = '';
      }

    }
  },
  computed: {
    flagMap(){
      return Object.keys(this.$root.world.flagMap);
    }
  }
}

</script>

<style scoped>
.v-select {
  font-size: 15px;
  width: 100%;
}
.referenceList{
  /* width: 200px; */
  width: 100%;
  height: 40px;
}
.smallInput{
  width: 100%;
}

.fit1{
  margin-top: -50px;
}
.fit2{
  margin-top: -40px;
}
.creator{
  border: 1px solid black;
  min-width: 250px;
}
.big{
  width: 200px;
}

</style>
