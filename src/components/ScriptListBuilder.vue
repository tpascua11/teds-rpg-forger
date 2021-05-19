<template>
  <section class="basedHeight">
    <div class="row">
      <div class="col-8 col">
        <table class="table" style="width: 100%; table-layout: fixed;">
          <thead>
            <tr>
              <th scope="col" style="width: 90%;"> Script List</th>
              <th scope="col" style="width: 10%;"> Edit </th>
            </tr>
          </thead>
          <draggable v-model="scriptList" tag="tbody">
            <tr v-for="(item, index) in scriptList" :key="index">
              <td>{{item}}</td>
              <td>
                <button v-on:click="removeAction(index)" class="btn-danger
                  btn-small smalltext">
                  x
                </button>
              </td>
            </tr>
          </draggable>
        </table>
      </div>
      <div class="col-4 col script-match-height">
      <Script
        v-bind:method="{addToScriptList}"
      />
      </div>
    </div>
  </section>
</template>

<script>
//import ActionBuilder from '@/components/ActionBuilder.vue'
import draggable from 'vuedraggable'
import Script from '@/components/Script.vue'

export default {
  name: 'InteractionBuilder',
  data: function(){
    return {
      isActive: true,
      error: null,
      styleObject: {
        color: 'red',
        fontSize: '13px'
      },
      action: {},
      selectedActionName: '',
      selectedAction: {},
      person: {
        firstName: 'Bo',
        lastName: 'Andersen',
        age: 27
      },
    }
  },
  components: {
    //ActionBuilder,
    draggable,
    Script,
  },
  props: {
    name: String,
    currentInteraction: Object,
    method: Object,
    scriptList: Array,
  },
  mounted(){
  },
  methods:{
    selectNewAction(action){
      console.log(action);
    },
    insertNewAction(action){
      console.log(action);
    },
    insertNewInteraction(interaction){
      this.$parent.addInteraction(interaction);
    },
    removeAction(index){
      console.log(index);
      this.scriptList.splice(index, 1);
    },
    addToScriptList(script){
      this.method.addToScriptList(script);
      //this.scriptList.push(script);
    }
  },
  computed: {
    classObject: function () {
      return {
        active: this.isActive && !this.error,
        'text-danger': this.error && this.error.type === 'fatal'
      }
    },
  }
}
</script>

<style scoped>
.creator{
  border: 1px solid black;
  background-color: #E8E8E8;
}
.smallInput{
  height: 14px;
  font-size: 18px;
  border: 0;
  background-color: #E8E8E8;
}
.smallX{
  font-size: 25px;
}
.smalltext{
  font-size: 15px;
  height: 25px;
  padding:0.1em
}

.rightside{
  /*background-color: lightgrey;*/
}
.leftside{
  margin-top: -20px;
  /*background-color: grey;*/
}

.basedHeight{
  height:77vh;
}

.bitright{
  margin-left: 20px;
}
.bigInput{
  height: 40px;
  font-size: 22px;
  border: 0;
  background-color: #E8E8E8;
}

.script-match-height{
  position:relative;
  top: -20px;
}

table {
  /* border: 1px solid black; */
  /*  border: none; */
  border: 1px solid black;
}
tr {
  padding: 50px;
}
tr {
}
td{
  font-size:12px;
}
th {
  font-size: 14px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
p {
  font-size: 15px;
}



</style>
