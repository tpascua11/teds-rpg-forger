<template>
  <section
    v-if="    (value.eventName == 'itemModifier')"
    class="default-thin-border">
    <div class="row default-title-sm2">
      <div class="col col-12">
        <i class="ra ra-ship-emblem ra-1x"></i>
        Item
      </div>
    </div>
    <div class="row closer">
      <div class="col col-12">
        <v-select
          v-model="value.name" :from="flagList"
          class="adaptable-width" placeholder="Add Flag"
          @create="createFlag($event)">
        </v-select>
      </div>
    </div>
    <div class="row closer2">
      <div class="col col-6">
        <button
          class="btn-secondary btn-small btn-block"
          :disabled="true"
        >
          <section class="smalltin"> Modifier </section>
        </button>

      </div>
      <div class="col col-6">
        <input style="width: 100%" class="" type="string" v-model="value.amount" placeholder="..."> 
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Basic',
  data: function(){
    return {
      template: {name: '', flag: true},
      flagList: Object.keys(this.$root.world.itemMap),
    }
  },
  props: ['value'],
  mounted(){},
  methods:{
    test(){},
    toggleFlag(){
      this.value.flag = !this.value.flag;
    },
    createFlag({value}){
      console.log("test", this.$root.world.itemMap);
      //this.$root.world.flapMap[value] = this.value.flag;
      this.$root.world.itemMap[value] = false;
      this.flagList = Object.keys(this.$root.world.itemMap);
      this.value.name = value;
    }
  },
  computed: {
    classObject: function () {
      return { active: this.isActive && !this.error, 'text-danger': this.error && this.error.type === 'fatal'}
    }
  }
}

</script>

<style scoped>
.v-select {
  font-size: 13px;
  width: 100%;
}

  textarea {
    box-sizing:border-box;
    height: 100%;
    width: 100%;
  }

  .smallfit{
    height: 23px;
    display: table-cell;
    min-width: 120%;
    left: -10%;
    position: relative;
    padding:0.1em;
  }

  .descriptionTextArea{
    font-size: 14px;
  }

  .smallt{
    height: 38px;
    width: 50px;
    position:relative;
    left: -10px;
  }

  .smalltin{
    position:relative;
    font-weight: bold;
  }

  .closer{
    position:relative;
    top: 0px;
    margin-top: -40px;
    /*margin-bottom: 10px;*/
  }

  .closer2{
    position:relative;
    top: 0px;
    margin-top: -50px;
    /*margin-bottom: 10px;*/
  }





</style>
