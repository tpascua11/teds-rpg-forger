<template>
        <!--
        <td style="width: 15%" class="nice-small-fit"> Is Flag </td>
        <td style="width: 85%">
          <div class="row f-height">
            <section v-for="(item, index) in conditionTemplate.isFlag" :key="index">
              <button v-on:click="selectConditionType()"
                class="btn-default nice-small-fit"> {{item}}
              </button>
            </section>
              @input="addFlagToTemplate(inputString);"
          </div>
          -->
          <div class="total-height">
            <div class="row f-height">
              <div class="col-2">
                <p> Flag {{value}}</p>
              </div>
              <div class="col-1">
                <v-select v-model="flagType" :from="typeList"
                  class="f-check-size adaptable-width" placeholder="Add Flag" />
              </div>
              <div class="col-1">
              </div>
              <div class="col-6">
                <v-select v-model="flagList" :from="referenceWorldFlag"
                  class="f-size adaptable-width" placeholder="Add Flag">
                  <template v-slot:selected="{option}">
                    <div class="f-size">
                      <p>{{option.label}} </p>
                    </div>
                  </template>

                  <template v-slot:option="{option}">
                    <div class="f-size">
                      {{option.label}}
                    </div>
                  </template>

                </v-select>
              </div>
              <div class="col-2">
                <button v-on:click="addFlagToPacket()"
                  class="btn-success nice-mid-fit adaptable-width"> Confirm
                </button>
                <!--
                <button v-on:click="addFlagToPacket()"
                  class="btn-danger nice-mid-fit adaptable-width"> Cancel
                </button>
                -->
              </div>
            </div>
          </div>
</template>

<script>
export default {
  name: 'FlagInput',
  data: function(){
    return {
      inputString: "",
      typeList: ["NOT", "IS"],
      flagType: "IS",
      flagList: [],
    }
  },
  props: ['value'],
  mounted(){
    console.log("SEE THIS LIST", this.list);
  },
  methods:{
    addFlagToTemplate(flag){
      if(!flag) return;
      console.log('falg update', this.conditionTemplate);
      this.flagList.push(flag);
    },
    addFlagToPacket(){
      console.log("see conditionTemplate", this.flagList);
      this.$emit('input', this.flagList);
    }
  },
  computed: {
    referenceList: function(){
      return this.value;
    },
    referenceWorld: function(){
      return this.$parent.referenceWorld;
    },
    referenceWorldFlag: function(){
      //let oldList = this.referenceWorld.concat(inputFlagList);
      //let filtered = this.referenceWorld.flagList.filter(
      //let oldList = this.referenceWorld.flagList.concat(this.inputFlagList);
      console.log("check", this.list);

      let filtered = this.referenceWorld.flagList.filter(
        function(e) {
          return this.indexOf(e) < 0;
        },
        this.flagList.concat(this.inputFlagList)
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
.total-height{
  height:60px;
}
.f-check-size{
  height:45px;
  font-size: 15px;
}
</style>
