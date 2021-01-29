<template>
  <div class="simple-border">
    <div class="row ">
      <div class="col-3 col">
          <button v-on:click="selectConditionType('FLAG')" class="btn-default btn-block nice-small-fit"> Flag             </button>
          <button v-on:click="selectConditionType('ITEM')" class="btn-default btn-block nice-small-fit"> Player Item  </button>
          <button v-on:click="selectConditionType('STAT')" class="btn-default btn-block nice-small-fit"> Player Stat </button>
          <button v-on:click="selectConditionType()" class="btn-default btn-block nice-small-fit"> Time </button>
          <button v-on:click="selectConditionType()" class="btn-default btn-block nice-small-fit"> Complex </button>
      </div>
      <div class="col-9 col">
        <table class='simple-border'>
          <thead>
          </thead>
          <tbody>
            <tr class="short-row" v-on:click="selectConditionType('FLAG')"> 
              <td style="width: 20%">
                IsFlag
              </td>
              <td>
                {{conditionTemplate.flagSet.isList}}
              </td>
            </tr>
            <tr v-on:click="selectConditionType('FLAG')"> 
              <td style="width: 20%">
                NotFlag
              </td>
              <td>
                {{conditionTemplate.flagSet.notList}}
              </td>
            </tr>
            <tr>
              <td style="width: 20%">
                <p> Has Item: </p>
              </td>
              <td>
                <p class="" v-for="(item, index) in conditionTemplate.itemSet" :key="index">
                  "{{item.name}}" {{item.operator}} {{item.value}}
                </p>
              </td>
            </tr>
            <tr>
              <td style="width: 20%">
                <p> Has Stat: </p>
              </td>
              <td>
                <p class="" v-for="(item, index) in conditionTemplate.statSet" :key="index">
                  "{{item.name}}" {{item.operator}} {{item.value}}
                </p>
              </td>
            </tr>

          </tbody>
        </table>
        <div class="row">
      </div>
      </div>
    </div>
    <div class="row"></div>
    <div class="row"></div>

    <div class="row" v-if="menuConditionType == 'FLAG'">
      <div class="col-12 col">
        <FlagInput
          v-model="conditionTemplate.flagSet"
          :referenceList="referenceWorld.flagList"
        />
      </div>
    </div>
    <div class="row" v-if="menuConditionType == 'ITEM'">
      <div class="col-12 col">
        <ItemInput
          v-model="conditionTemplate.itemSet"
          :referenceList="referenceWorld.worldItemList"
        />
      </div>
    </div>
    <div class="row" v-if="menuConditionType == 'STAT'">
      <div class="col-12 col">
        <StatInput
          v-model="conditionTemplate.statSet"
          :referenceList="referenceWorld.worldItemList"
        />
      </div>
    </div>
    <div class="row"></div>
    <div class="row"></div>
    <div class="row">
      <div class="col-9 col"></div>
      <div class="col-3 col">
        <button v-on:click="selectConditionType('FLAG')" class="btn-success
          btn-block "> Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import FlagInput from '@/components/inputs/FlagInput.vue'
import ItemInput from '@/components/inputs/ItemInput.vue'
import StatInput from '@/components/inputs/StatInput.vue'


export default {
  name: 'ConditionSet',
  data: function(){
    return {
      menuConditionType: "FLAG",
      conditionTemplate: {
        flagSet: {isList: [], notList: []},
        itemSet: [],
        statSet: [],
      },
    }
  },
  components: {
    FlagInput,
    ItemInput,
    StatInput,
  },
  props: {
    name: String,
    //description: String
    area: Object,
  },
  mounted(){
    console.log("SEE THE AreaList", this.areaList);
  },
  methods:{
    selectConditionType(type){
      this.menuConditionType = type;
    }
  },
  computed: {
    classObject: function () {
      return {
        active: this.isActive && !this.error,
        'text-danger': this.error && this.error.type === 'fatal'
      }
    },
    referenceWorld: function(){
      return this.$parent.referenceWorld;
    },
  }
}

</script>

<style scoped>
  textarea {
    box-sizing:border-box;
    height: 100%;
    width: 100%;
  }
.nice-small-fit{
  font-family: Neucha;
  font-size: 17px;
  height: 25px;
  padding:0.2em
}

.nice-mid-fit{
  font-family: Neucha;
  font-size: 21px;
  height: 30px;
  padding:0.2em
}

/* The Small Row For Condition */
.condition-short-row{
  min-height: 100px;
  font-size: 20px;
}

.new-line{
  white-space: pre;
}

.short-row{
  height: 25px;
  margin:0px;
}




</style>
