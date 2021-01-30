<!--
Condition Set is part of the IS_CONDITION of an objects
ITEM, AREA, INTERACTION[[],[]]

The Condition Set is the inner array [], which represent the AND Statement of
the is_condition.
  Everything in the single array must be true for the inner array to be true
  But if there are more inner arrays [[],[],[],[]], ethier one of them
  can be true for the whole is_condition to be true.
  A Condition Set can also be saved into a Complex so it can be easier to reused
  or be used in a another Condition Set
-->

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
                {{conditionTemplate.isList}}
              </td>
            </tr>
            <tr v-if="showNotList" v-on:click="selectConditionType('FLAG')"> 
              <td style="width: 20%">
                NotFlag
              </td>
              <td>
                {{conditionTemplate.notList}}
              </td>
            </tr>
            <tr v-if="showItemList" v-on:click="selectConditionType('ITEM')">
              <td style="width: 20%">
                <p> Has Item: </p>
              </td>
              <td>
                <p class="" v-for="(item, index) in conditionTemplate.hasItem" :key="index">
                  "{{item.name}}" {{item.operator}} {{item.value}}
                </p>
              </td>
            </tr>
            <tr v-if="showStatList" v-on:click="selectConditionType('STAT')">
              <td style="width: 20%">
                <p> Has Stat: </p>
              </td>
              <td>
                <p class="" v-for="(item, index) in conditionTemplate.hasStat" :key="index">
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
            v-model="conditionTemplate"
            :referenceList="referenceWorld.flagList"
          />
        </div>
      </div>

      <!-- Item Inputs  -->
      <div class="row" v-if="menuConditionType == 'ITEM'">
        <div class="col-12 col">
          <ItemInput
            v-model="conditionTemplate.hasItem"
            :referenceList="referenceWorld.worldItemList"
          />
        </div>
      </div>
      <!-- Stat Inputs -->
      <div class="row" v-if="menuConditionType == 'STAT'">
        <div class="col-12 col">
          <StatInput
            v-model="conditionTemplate.hasStat"
            :referenceList="referenceWorld.worldItemList"
          />
        </div>
      </div>
    </section>
    <section class="confirm-section">
    <!-- Confirms  -->
    <div class="row">
      <div class="col-3 col">
        <button v-on:click="insertConditionOr()" class="btn-warning
          btn-block "> Set OR
        </button>
      </div>
      <div class="col-6 col">
        <button v-on:click="selectConditionType('FLAG')" class="btn-secondary
          btn-block "> Convert as Complex
        </button>
      </div>
      <div class="col-3 col">
        <button v-on:click="insertConditionAnd()" class="btn-danger
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
        isList: [],
        notList: [],
        hasItem: [],
        hasStat: [],
      },
    }
  },
  components: {
    FlagInput,
    ItemInput,
    StatInput,
  },
  props: ['value', 'world', 'confirm'],
  mounted(){
    console.log("SEE THE Reference World", this.world);
  },
  methods:{
    selectConditionType(type){
      this.menuConditionType = type;
    },
    insertConditionAnd(){
      this.$emit('input', this.conditionTemplate);
      this.$emit('confirm');
      //this.referenceConditionList.push(this.conditionTemplate);
      //this.$emit('input', newSet);
    },
    insertConditionOr(){
      this.$emit('confirm');
      //this.convert();
      //this.$emit('input', newSet);
    },
    convert(){
      let newConditionTemplate = {
        isList: [],
        notList: [],
        hasItem: [],
        hasStat: [],
      };
      //let template = Object.assign({}, newConditionTemplate);

      this.conditionTemplate.isList.forEach(function(item){
        let template = JSON.parse(JSON.stringify(newConditionTemplate));
        template.isList.push(item);
        console.log("template added", template);
      });

      this.conditionTemplate.notList.forEach(function(item){
        let template = JSON.parse(JSON.stringify(newConditionTemplate));
        template.notList.push(item);
        console.log("template added", template);
      });

      this.conditionTemplate.hasItem.forEach(function(item){
        let template = JSON.parse(JSON.stringify(newConditionTemplate));
        template.hasItem.push(item);
        console.log("template added", template);
      });

      this.conditionTemplate.hasStat.forEach(function(item){
        let template = JSON.parse(JSON.stringify(newConditionTemplate));
        template.hasStat.push(item);
        console.log("template added", template);
      });
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
      //return this.$parent.referenceWorld;
      return this.world;
    },
    referenceConditionList: function(){
      return this.value;
    },

    showIsList: function()    { return this.conditionTemplate.isList.length > 0},
    showNotList: function()   { return this.conditionTemplate.notList.length > 0},
    showItemList: function()  { return this.conditionTemplate.hasItem.length > 0},
    showStatList: function()  { return this.conditionTemplate.hasStat.length > 0},

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
