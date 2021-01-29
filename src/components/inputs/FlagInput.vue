<!--
  //----------------
    Flag Input
  //----------------
  Takes 2 Props,
    v-model: flagSet,
    referenceList: []

flagSet should be
  flagset = {
    isList: [],  // used to check if flags in list are true in the world.flagList
    notList: [], // used check if flags is NOT true or NOT exist in the world.flagList
  }
  referenceList must be an array of strings.

  Has 2 Inputs Sections and A Confirm Button
  The Second Input lets you select multiple option of flags from a reference list
  The First Input has 2 option 'IS' or 'NOT' and it determines which
  selected options of flags goes into which list in the flagSet.

  The Confirm Button will add to the update the flagSet list with the newest
  option of flags added.

-->


<template>
  <div class="total-height">
    <div class="row f-height">
      <div class="col-2">
        <button
          class="btn-default nice-mid-fit f-size adaptable-width">
        Flag
        </button>
      </div>
      <div class="col-2">
        <v-select v-model="flagType" :from="typeList"
          class="f-size adaptable-width" placeholder="Add Flag" />
      </div>
      <div class="col-6">
        <v-select v-model="flagList" :from="optionList"
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
        <button v-on:click="updateFlagSet()"
          class="btn-warning nice-mid-fit adaptable-width"> Add
        </button>
      </div>
    </div>
    <div class="row f-height">
      <div class="col-2"><p>Is Flags</p></div>
      <div class="col-10 simple-border">
        <!--
        <span v-for="(item, index) in flagSet.isList" :key="index">
            <button class="btn-default  nice-small-fit"> {{item}}</button>
          </span>
          -->
          <draggable class="list-group" :list="flagSet.isList" group="people">
            <span
              class="list-group-item"
              v-for="(element, index) in flagSet.isList"
              :key="index"
            >
              <button class="btn-default  nice-small-fit"> 
              {{ element }}
              </button>
            </span>
          </draggable>
      </div>
    </div>

    <div class="row f-height">
      <div class="col-2"><p>Not Flags</p></div>
      <div class="col-10 simple-border">
        <!--
        <span v-for="(item, index) in flagSet.notList" :key="index">
            <button class="btn-default  nice-small-fit"> {{item}}</button>
          </span>
          -->
          <draggable class="list-group" :list="flagSet.notList" group="people">
            <span
              class="list-group-item"
              v-for="(element, index) in flagSet.notList"
              :key="index"
            >
              <button class="btn-default  nice-small-fit"> 
              {{ element }}
              </button>
            </span>
          </draggable>
      </div>
    </div>

    <div class="row f-height">
      <div class="col-2"><p>Clear </p></div>
      <div class="col-10 simple-border">
          <draggable class="list-group" :list="putBackList" group="people">
            <span
              class="list-group-item"
              v-for="(element, index) in putBackList"
              :key="index"
            >
              <button class="btn-default  nice-small-fit"> 
              {{ element }}
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
  name: 'FlagInput',
  props: ["value", "referenceList"],
  components: {
    draggable,
  },
  data: function(){
    return {
      typeList: ["NOT", "IS"],
      flagType: "IS",
      flagList: [],
      putBackList: [],
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

    setToPutBack(item){
      this.putBackList(item);
    }
  },
  computed: {
    flagSet: function(){
      return this.value;
    },
    optionList: function(){
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
.total-height{
  min-height:100px;
}
.f-check-size{
  height:45px;
  font-size: 15px;
}
</style>
