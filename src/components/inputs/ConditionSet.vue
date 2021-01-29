<template>
  <div class="simple-border max-height">
    <section class="top-section">
    <!-- Condition Sets -->
    <div class="row">
      <div class="col-3 col">
          <button v-on:click="selectConditionType('FLAG')" class="btn-default btn-block nice-small-fit"> Flag             </button>
          <button v-on:click="selectConditionType('ITEM')" class="btn-default btn-block nice-small-fit"> Player Item  </button>
          <button v-on:click="selectConditionType('STAT')" class="btn-default btn-block nice-small-fit"> Player Stat </button>
          <button v-on:click="selectConditionType()" class="btn-default btn-block nice-small-fit"> Time </button>
          <button v-on:click="selectConditionType()" class="btn-default btn-block nice-small-fit"> Complex </button>
        </div>
        <div class="col-9 col">
          <div class="condition-list-table">
          <table class=''>
          <thead>
          </thead>
          <tbody class="condition-list-table">
            <tr v-if="showIsList" class="short-row" v-on:click="selectConditionType('FLAG')">
              <td style="width: 20%">
                IsFlag
              </td>
              <td>
                {{conditionTemplate.flagSet.isList}}
              </td>
            </tr>
            <tr v-if="showNotList" v-on:click="selectConditionType('FLAG')"> 
              <td style="width: 20%">
                NotFlag
              </td>
              <td>
                {{conditionTemplate.flagSet.notList}}
              </td>
            </tr>
            <tr v-if="showItemList" v-on:click="selectConditionType('ITEM')">
              <td style="width: 20%">
                <p> Has Item: </p>
              </td>
              <td>
                <p class="" v-for="(item, index) in conditionTemplate.itemSet" :key="index">
                  "{{item.name}}" {{item.operator}} {{item.value}}
                </p>
              </td>
            </tr>
            <tr v-if="showStatList" v-on:click="selectConditionType('STAT')">
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
        </div>
        <div class="row">
      </div>
      </div>
    </div>
    </section>
    <!-- Input Types -->
    <section class="input-type-section">
      <!-- Flag Inputs  -->
      <div class="row" v-if="menuConditionType == 'FLAG'">
        <div class="col-12 col">
          <FlagInput
            v-model="conditionTemplate.flagSet"
            :referenceList="referenceWorld.flagList"
          />
        </div>
      </div>

      <!-- Item Inputs  -->
      <div class="row" v-if="menuConditionType == 'ITEM'">
        <div class="col-12 col">
          <ItemInput
            v-model="conditionTemplate.itemSet"
            :referenceList="referenceWorld.worldItemList"
          />
        </div>
      </div>
      <!-- Stat Inputs -->
      <div class="row" v-if="menuConditionType == 'STAT'">
        <div class="col-12 col">
          <StatInput
            v-model="conditionTemplate.statSet"
            :referenceList="referenceWorld.worldItemList"
          />
        </div>
      </div>
    </section>
    <section class="confirm-section">
    <!-- Confirms  -->
    <div class="row">
      <div class="col-3 col">
        <button v-on:click="selectConditionType('FLAG')" class="btn-warning
          btn-block "> Set OR
        </button>
      </div>
      <div class="col-6 col"></div>
      <div class="col-3 col">
        <button v-on:click="selectConditionType('FLAG')" class="btn-danger
          btn-block "> Set AND
        </button>
      </div>
    </div>
  </section>

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
  props: ['value', 'world'],
  mounted(){
    console.log("SEE THE AreaList", this.areaList);
  },
  methods:{
    selectConditionType(type){
      this.menuConditionType = type;
    },
    insertConditionAnd(){
      this.referenceConditionList.push(this.conditionTemplate);
      //this.$emit('input', newSet);
    },
    insertConditionOr(){
      //this.$emit('input', newSet);
    },
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
    referenceConditionList: function(){
      return this.value;
    },

    showIsList: function()    { return this.conditionTemplate.flagSet.isList.length > 0},
    showNotList: function()   { return this.conditionTemplate.flagSet.notList.length > 0},
    showItemList: function()  { return this.conditionTemplate.itemSet.length > 0},
    showStatList: function()  { return this.conditionTemplate.statSet.length > 0},

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

.top-section{
  height: 35vh;
}

.condition-list-table{
  height: 30vh;
  overflow: scroll;
}

.input-type-section{
  height: 30vh;
}

.confirm-section{
  height: 10vh;
}

</style>
