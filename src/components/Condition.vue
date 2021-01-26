<template>
  <div>
    <button v-on:click="show()" class="btn-success btn-block">
      Add Condition
    </button>


    <modal name="conditionModal"
      :width="700"
      :height="700"
      :shiftY="0.1"
    >
      <div class="row c-tag-in-nice">
        <p class="c-tag-in-nice">
          Test this text;
        </p>
      </div>
      <div class="row">
        <div class="col-3 col">
          <button v-on:click="selectConditionType()" class="btn-default btn-block smallfit"> Flag             </button>
          <button v-on:click="selectConditionType()" class="btn-default btn-block smallfit"> Player Item  </button>
          <button v-on:click="selectConditionType()" class="btn-default btn-block smallfit"> Player Stat </button>
          <button v-on:click="selectConditionType()" class="btn-default btn-block smallfit"> Time </button>
        </div>
        <div class="col-8 col">
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Configs</th>
              </tr>
            </thead>
            <tbody>
              <tr> <!-- Flag -->
                <td class="c-tag-in-nice"> Flag </td>
                <td>
                  <div class="row">
                    <section v-for="(item, index) in conditionTemplate.isFlag" :key="index">
                      <button v-on:click="selectConditionType()"
                        class="btn-default btn-block "> {{item}}
                      </button>
                    </section>
                  </div>
                  <div class="row">
                    <v-select v-model="inputString" :from="referenceWorldFlag"
                      class="hidden-border c-match-font" placeholder="Add Tag"
                      @input="addFlagToTemplate(inputString);"
                    >
                      <template v-slot:option="{option}">
                        <div class="c-tag-in-nice">
                          {{option.label}}
                        </div>
                      </template>

                      <template v-slot:selected="{option}">
                        <div class="c-tag-in-nice">
                          <p>{{option.label}} </p>
                        </div>
                      </template>
                    </v-select>
                  </div>
                </td>
              </tr>
              <tr>
                <td> Item </td>
                <td>
                  <div class="row">
                    <section v-for="(item, index) in operatorList" :key="index">
                      <button v-on:click="changeOperator(item)"
                        class="btn-default midfit" > {{item}}</button>
                    </section>
                  </div>
                  <div class="row">
                    <input class="smallfit smallwidefit" type="string" v-model="inputItem.name" placeholder="Name">
                    <input class="" type="string" v-model="inputItem.value" placeholder="Value">
                  </div>
                  <div class="row">
                    amount {{inputItem.operator}} {{inputItem.value}}
                  </div>
                </td>

              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </modal>
  </div>
</template>

<script>
export default {
  name: 'Conddition',
  data: function(){
    return {
      conditionList: [],
      inputString: "",

      operatorList: [">", ">=", "==", "<=", "<"],
      inputItem: {
        name  : "",
        value : 0,
        operator: 0,
      },

      conditionTemplate: {
        isFlag: [],
        playerHasItem: [{}],
        playerHasStatus: [{}],
        playerStat: [{}],
        complexCondition: [],

        not_Flag: [""],
        not_PlayerHasItem: [{}],
        not_PlayerHasStatus: [{}],
        not_PlayerStat: [{}],
        not_ComplexCondition: [],
        /*
          targetHasItem: [{}],
          targetStat: [{}]

          not_targetHasItem: [{}],
          not_targetStat: [{}]
         */
      }
    }
  },
  props: {
    name: String,
    conditionPacket: Object,
  },
  mounted(){
    console.log("SEE THE AreaList", this.areaList);
    console.log("SEE THE Refrence World ", this.referenceWorld);
  },
  methods:{
    selectConditionType(){
      console.log("nothing yet");
    },
    test(){
      console.log("event change");
    },
    addFlagToTemplate(flag){
      console.log('falg update', this.conditionTemplate);
      this.conditionTemplate.isFlag.push(flag);
    },
    changeOperator(op){
      this.inputItem.operator = op;
    },
    show () {
      this.$modal.show('conditionModal');
    },
    hide () {
      this.$modal.hide('conditionModal');
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
    referenceWorldFlag: function(){
      //conditionTemplate.flagLi
      let filtered = this.referenceWorld.flagList.filter(
        function(e) {
          return this.indexOf(e) < 0;
        },
        this.conditionTemplate.isFlag
      );
      console.log("filtered", filtered);
      return filtered;
    }
  }
}

</script>

<style scoped>
table {
  border-style: none;
}
td {
  font-weight: 20px;
}
p{
  font-weight: 20px;
}
.smallfit{
  padding:0.1em;
  font-size: 15px;
}
.midfit{
  padding:0.1em;
  font-size: 20px;
  width: 35px;
  height: 35px;
}
.smallwidefit{
  font-size: 20px;
  width: 200px;
  height: 50px;
}
.c-match-font{
  font-family: Neucha;
  font-size: 15px;
}
.c-tag-in-nice{
  background: none !important;
}
.c-fit-nice{
  height: 20px;
  font-family: Neucha;
}
.c-fit-height{
  height: 100px;
}



</style>

