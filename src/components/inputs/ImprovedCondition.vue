<template>
  <section>
    <div v-if="false" class="row">
					<button v-on:click="selectConditionType('FLAG')" class="btn-default btn-block nice-small-fit"> Flag             </button>
					<button v-on:click="selectConditionType('ITEM')" class="btn-default btn-block nice-small-fit"> Player Item  </button>
					<button v-on:click="selectConditionType('STAT')" class="btn-default btn-block nice-small-fit"> Player Stat </button>
					<button v-on:click="selectConditionType()" class="btn-default btn-block nice-small-fit"> Time </button>
					<button v-on:click="selectConditionType()" class="btn-default btn-block nice-small-fit"> Complex </button>
    </div>
    <!-- Add Flag Condition -->
    <div class="row border-bottom">
      <div class="col-2 small-s title-s">
        Flag
      </div>
      <div class="col-1">
        <button v-if="flagType == 'IS'"  v-on:click="flagType = 'NOT'"
          class="btn-success small-s"> IS </button>
        <button v-if="flagType == 'NOT'" v-on:click="flagType = 'IS'"
          class="btn-danger small-s"> NOT </button>
      </div>
      <div class="col-6">
        <v-select v-model="flagList" :from="dlist"
          class="f-size adaptable-width" placeholder="Add Flag">
          <template v-slot:selected="{option}">
            <div class="f-size">
              <p> {{option.raw}}</p>
            </div>
          </template>

          <template v-slot:option="{option}">
            <div class="f-size">
              {{option.raw}}
            </div>
          </template>
        </v-select>
      </div>
      <div class="col-1"></div>
      <div class="col-2">
        <button v-on:click="updateFlagSet()"
          class="small-s-width btn-secondary"> Add
        </button>
      </div>
    </div>

    <!-- Add Item Condition -->
    <div class="row border-bottom">
      <div class="col-2 small-s title-s">
        Item
      </div>

      <div class="col-4">
        <v-select v-model="inputItem.name" :from="itemList"
          class="f-size adaptable-width" placeholder="Add Item" />
      </div>

      <div class="col-1">
        <Dropdown
          v-model="inputItem.operator"
          v-bind:options="operatorList" />
      </div>

      <div class="col-2">
        <input class="small-s-width adaptable-width" type="number" v-model="inputItem.value" placeholder="Value">
      </div>

      <div class="col-1">
      </div>

      <div class="col-2">
        <button v-on:click="updateItemSet()"
          class="btn-secondary small-s-width"> Add
        </button>
      </div>
    </div>

    <!-- Add Stat Condition -->
    <div class="row border-bottom">
      <div class="col-2 small-s title-s">
        Stat
      </div>


      <div class="col-4">
        <v-select v-model="inputStat.name" :from="statList"
          class="f-size adaptable-width" placeholder="Add Item" />
      </div>

      <div class="col-1">
        <Dropdown
          v-model="inputStat.operator"
          v-bind:options="operatorList" />

      </div>

      <div class="col-2">
        <input class="small-s-width adaptable-width" type="number"
          v-model="inputStat.value" placeholder="Value">

        </div>

        <div class="col-1">
        </div>

        <div class="col-2">
          <button v-on:click="updateStatSet()"
            class="btn-secondary small-s-width"> Add
          </button>
        </div>

      </div>

    <!-- Add Stat Condition -->
    <div class="row">
			<div class="col-2 small-s title-s">
				<button v-on:click="showTime = !showTime" class="small-s-width title-s">
					Time
				</button>
			</div>
		</div>
    <div class="row" v-if="showTime">
      <div class="col-12">
        <table class=''>
          <thead>
            <tr>
              <th> Op..</th>
              <th> Year </th>
              <th> Months </th>
              <th> Day </th>
              <th> Hour </th>
              <th> Minute </th>
            </tr>
            <tr>
              <td> Greater </td>
              <td> <input class="small-s-width adaptable-width" type="number" v-model="inputDate.before.year" placeholder="Value"> </td>
							<td>Month</td>
              <td> <input class="small-s-width adaptable-width" type="number" v-model="inputDate.before.day" placeholder="Value"> </td>
              <td> <input class="small-s-width adaptable-width" type="number" v-model="inputDate.before.hour" placeholder="Value"> </td>
              <td> <input class="small-s-width adaptable-width" type="number" v-model="inputDate.before.minute" placeholder="Value"> </td>
            </tr>
            <tr>
              <td> Less </td>
              <td>
                <!--
                <select v-model="selectedArea" class="smalldir areaName">
                  <option v-for="(option, index) in referenceAreaList" v-bind:value="option" :key="index">
                    {{option.name}}
                  </option>
                </select>
                -->
                <input class="small-s-width adaptable-width" type="number" v-model="inputDate.after.year" placeholder="Value">
              </td>
							<td>Month</td>
              <td> <input class="small-s-width adaptable-width" type="number" v-model="inputDate.after.day" placeholder="Value"> </td>
              <td> <input class="small-s-width adaptable-width" type="number" v-model="inputDate.after.hour" placeholder="Value"> </td>
              <td> <input class="small-s-width adaptable-width" type="number" v-model="inputDate.after.minute" placeholder="Value"> </td>
            </tr>
          </thead>
        </table>
      </div>
    </div>
    <div class="row">
      <div class="col-10"></div>
      <div class="col-2">
        <button v-on:click="updateDateSet()"
          class="btn-secondary small-s-width"> Add
        </button>
      </div>
    </div>

  </section>
</template>

<script>

import Dropdown from '@/components/list/Dropdown.vue'

export default {
  name: 'FlagInput',
  props: ["value", "referenceList"],
  components: {
    Dropdown,
  },
  data: function(){
    return {
      showTime: true,
      typeList: ["NOT", "IS"],
      flagType: "IS",
      flagList: [],
      putBackList: [],


      operatorList: [">", ">=", "==", "<=", "<"],
      inputString: "",
      inputItem: {
        name: "",
        operator: ">=",
        value: 0
      },
      inputStat: {
        name: "",
        operator: ">=",
        value: 0
      },
      inputDate: {
        after : {year: 0, day: 0, hour: 0, minute: 0},
        before: {year: 0, day: 0, hour: 0, minute: 0}
      },
      clearList: [],
    }
  },
  methods:{
    updateFlagSet(){
      /* Use the selected flags and option to add new flags into one of the
       * flagSet lists */

      let newSet = this.value;
      console.log("-----", newSet);
      if(this.flagType == 'IS'){
        newSet.isList = [...newSet.isList, ...this.flagList]
        this.$emit('input', newSet);
      }
      else if (this.flagType == "NOT"){
        newSet.notList = [...newSet.notList, ...this.flagList]
        this.$emit('input', newSet);
      }
      this.flagList = [];
    },
    updateItemSet(){
      console.log("Item Set", this.inputItem);
      this.value.hasItem.push(this.inputItem);
      this.inputItem = {name:"",operator: ">=", value:0};
    },
    updateStatSet(){
      console.log("Stat Set", this.inputStat);
      this.value.hasStat.push(this.inputStat);
      this.inputStat = {name:"",operator: ">=", value:0};
    },
    updateDateSet(){
      console.log("Date Set", JSON.stringify(this.inputDate));
      if(this.clearDates(this.inputDate.before)) console.log("CLEANED");
      if(this.clearDates(this.inputDate.after)) console.log("CLEANED 2");

      if(this.inputDate) this.value.time = this.inputDate;

      /*
      this.inputDate = {
        after : {year: 0, day: 0, hour: 0, minute: 0},
        before: {year: 0, day: 0, hour: 0, minute: 0}
      };
       */
    },
    clearDates(row){
      if(row.year   <= 0) delete row.year;
      if(row.day    <= 0) delete row.day;
      if(row.hour   <= 0) delete row.hour;
      if(row.minute <= 0) delete row.minute;
      if(Object.keys(row).length === 0) return true;
      else return false;
    },
    setToPutBack(item){
      this.putBackList(item);
    },

    addItemConditionToPacket(){
      console.log("see item input", this.inputItem);
      //let newItemSet = [...this.itemSet, this.inputItem];

      //this.$emit('input', newItemSet);

      /*
      this.inputItem = {
        name: "",
        operator: ">=",
        value: 0
      }
       */
    },
    addStatConditionToPacket(){
      console.log("see item input", this.inputStat);
    }



  },
  computed: {
    flagSet: function(){
      return this.value;
    },
    optionList: function(){
      let tmp = Object.keys(this.$root.world.flagMap);
      console.log(tmp);

      /* Returns A List that is not selected or not already in the flagSet */
      let filtered = this.referenceList.filter(
        function(e) {
          return this.indexOf(e) < 0;
        },
        [...this.value.isList, ...this.value.notList, ...this.putBackList]
      );
      console.log("filtered", filtered);
      return filtered;
    },
    dlist: function(){
      let tmp = Object.keys(this.$root.world.flagMap);
      console.log(tmp);

      let filtered = tmp.filter(
        function(e) {
          return this.indexOf(e) < 0;
        },
        [...this.value.isList, ...this.value.notList, ...this.putBackList]
      );

      console.log("filtered", filtered);
      return filtered;
    },
    itemList: function(){
      return Object.keys(this.$root.world.itemMap);
    },
    statList: function(){
      return ['Health', 'Mana', 'Stamina'];
      //return Object.keys(this.$root.world.statMap);
    },
    itemSet: function(){
      return this.value;
    },
    timeSystem: function(){
      return this.$root.world.timeSystem;
    }
  },
  mounted(){},
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
.f-check-size{
  height:45px;
  font-size: 15px;
}
.small-s{
  font-size: 15px;
  height: 35px;
  width: 35px;
  padding:0.3em;
}
.small-s-width{
  font-size: 15px;
  height: 35px;
  padding:0.3em;
  width: 95%;
}

.title-s{
  font-size: 20px;
}
.border-bottom{
  border-bottom: 2px solid black;
}
.close-up{
  position:relative;
  top: -75px;
}



</style>
