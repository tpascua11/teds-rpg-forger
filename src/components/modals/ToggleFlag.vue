
<template>
  <div>
    <button v-on:click="show()" class="btn-success btn-block btn-small">
      Toggle Flags
    </button>

    <modal name="flag-modal"
      :width="250"
      :height="219"
      :shiftY="0.1"
    >
      <div class="double-simple-border">
        <div class="row">
          <div class="col-12 col">
            <v-select
              v-model="selectedFlag.name"
              as="name::id"
              :from="testList"
              @create="newFlag"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-6 col">
            <button v-on:click="completeAction(false)" class="btn-danger-outline btn-small"
                    v-bind:disabled="!selectedFlag.name">
              Toggle False
            </button>
          </div>
          <div class="col-6 col">
            <button v-on:click="completeAction(true)" class="btn-success-outline btn-small"
                    v-bind:disabled="!selectedFlag.name">
              Toggle True
            </button>
          </div>
        </div>
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
      selectedFlag: {},
      testList: [{name: "cool", flag: true}],
    }
  },
  props: {
    name: String,
    selectDescription: String,
    referenceList: Array,
    addScript: Object,
  },
  mounted(){},
  methods:{
    show () {
      console.log("give me reference list", this.referenceList);
      this.$modal.show('flag-modal');
    },
    hide () {
      this.$modal.hide('flag-modal');
    },
    newFlag({value}){
      console.log("new flag", value.name);

      this.selectedFlag = {name: value.name, flag:true};
      this.testList.push({name: value.name, flag: true});

      //this.$root.world.flagList.push({name: value.name, flag: true});
      this.$root.world.flagMap[value.name] = true;

      //this.$root.world.flagList.push({name: flag.value, flag: true});
      //console.log("see new world", this.$root.world);
    },
    completeAction(toggle){
      this.addScript.activate(
        {
          eventName: "toggleflag",
          name: this.selectedFlag.name,
          flag: toggle
        }
      );
      this.selectedFlag = {};
      this.$modal.hide('flag-modal');
    }

  },
  computed: {
  }
}

</script>

<style scoped>
.referenceList{
  width: 200px;
  height: 40px;
}
</style>
