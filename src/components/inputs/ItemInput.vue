<template>
  <div class="total-height">
    <div class="row f-height">
      <div class="col-2">
        <p> Has Item </p>
      </div>

      <div class="col-5">
        <input class="nice-small-fit adaptable-width" type="string"
          v-model="inputItem.name" placeholder="Item...">

        <v-select v-model="inputItem.operator" :from="operatorList"
          class="f-size adaptable-width" placeholder="operator...">
          </v-select>

      </div>

      <div class="col-2">

        <input class="nice-small-fit adaptable-width" type="number" v-model="inputItem.value" placeholder="Value">

      </div>

      <div class="col-1">
      </div>

      <div class="col-2">
        <button v-on:click="addItemConditionToPacket()"
          class="btn-success nice-mid-fit adaptable-width"> Confirm
        </button>

      </div>
    </div>
    <div class="row">
      <div class="col">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemInput',
  data: function(){
    return {
      operatorList: [">", ">=", "==", "<=", "<"],
      inputString: "",
      inputItem: {
        name: "",
        operator: "",
        value: 0
      },
      flagList: [],
    }
  },
  props: {
    name: String,
    area: Object,
    conditionPacket: Object,
  },
  mounted(){
    console.log("SEE THE AreaList", this.areaList);
  },
  methods:{
    addFlagToTemplate(flag){
      if(!flag) return;
      console.log('falg update', this.conditionTemplate);
      this.flagList.push(flag);
    },
    addItemConditionToPacket(){
      console.log("see item input", this.inputItem);
    }
  },
  computed: {
    referenceWorld: function(){
      return this.$parent.referenceWorld;
    },
    referenceWorldFlag: function(){
      let filtered = this.referenceWorld.flagList.filter(
        function(e) {
          return this.indexOf(e) < 0;
        },
        this.flagList
      );
      console.log("filtered", filtered);
      return filtered;
    }

  }
}

</script>

<style scoped>
textarea {
  box-sizing:border-box;
  height: 100%;
  width: 100%;
}
.border-line {
	border: 1px solid black;
	font-size: 25px;
}
.adaptable-width {
  width: 95%;
}
.f-height{
  height:50px;
}
.f-size{
  font-size: 15px;
}
.total-height{
  height:60px;
}
</style>
