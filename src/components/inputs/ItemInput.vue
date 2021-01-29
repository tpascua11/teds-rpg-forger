<template>
  <div class="total-height">
    <div class="row ">
      <div class="col-2">
        <button
          class="btn-default nice-mid-fit f-size adaptable-width">
        Has Item
        </button>
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
          class="btn-warning nice-mid-fit adaptable-width"> Add
        </button>

      </div>
    </div>

    <div class="row f-height">
      <div class="col-2"><p>Item Condition </p></div>
      <div class="col-10 simple-border">
        <!--
        <span v-for="(item, index) in flagSet.isList" :key="index">
            <button class="btn-default  nice-small-fit"> {{item}}</button>
          </span>
          -->
          <draggable class="list-group" :list="itemSet" group="people">
            <span
              class="list-group-item"
              v-for="(element, index) in itemSet"
              :key="index"
            >
              <button class="btn-default  nice-small-fit">
                "{{element.name}}" {{element.operator}} {{element.value}}
              </button>
            </span>
          </draggable>
      </div>
    </div>

    <div class="row f-height">
      <div class="col-2"><p>Clear </p></div>
      <div class="col-10 simple-border">
          <draggable class="list-group" :list="clearList" group="people">
            <span
              class="list-group-item"
              v-for="(element, index) in clearList"
              :key="index"
            >
              <button class="btn-default  nice-small-fit">
                "{{element.name}}" {{element.operator}} {{element.value}}
              </button>
            </span>
          </draggable>
      </div>
    </div>

  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'ItemInput',
  components: {
    draggable,
  },
  data: function(){
    return {
      operatorList: [">", ">=", "==", "<=", "<"],
      inputString: "",
      inputItem: {
        name: "",
        operator: ">=",
        value: 0
      },
      flagList: [],
      clearList: [],
    }
  },
  props: ['value', 'referenceList'],
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
      let newItemSet = [...this.itemSet, this.inputItem];

      this.$emit('input', newItemSet);

      this.inputItem = {
        name: "",
        operator: ">=",
        value: 0
      }
    }
  },
  computed: {
    itemSet: function(){
      return this.value;
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
  min-height:100px;
}
</style>
