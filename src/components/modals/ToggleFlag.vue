
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
              v-model="selectedFlag"
              :from="$root.world.flagList"
              @create="newFlag"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-6 col">
            <button v-on:click="completeAction(false)" class="btn-danger-outline btn-small">
              Toggle False
            </button>
          </div>
          <div class="col-6 col">
            <button v-on:click="completeAction(true)" class="btn-success-outline btn-small">
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
      selectedFlag: '',
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
    newFlag(flag){
      console.log("new flag", flag.value);
      this.selectedFlag = flag.value;
      this.$root.world.flagList.push(flag.value);
    },
    completeAction(toggle){
      this.addScript.activate(
        {
          eventName: "toggleflag",
          name: this.selectedFlag,
          flag: toggle
        }
      );
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
