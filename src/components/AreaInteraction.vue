<template>
  <section class="basedHeight bitright">
    <!-- Interaction Name -->
    <div class="row">
      <input class="bigInput" type="string" v-model="currentInteraction.name" placeholder="Name">
    </div>
    <!-- Description -->
    <div class="row description-row">
      <textarea class="area-nice" v-model="currentInteraction.description"
        placeholder="interaction description"></textarea>
    </div>

    <!-- Tags -->
    <div class="row tag-row">
      <div class="col-2">
        <h5> Tags </h5>
      </div>
      <div class="col-10">
        <v-select v-model="currentInteraction.tags" :from="tags"
          class="hidden-border">
          <template v-slot:option="{option}">
            <div class="tag-in-nice">
              {{option.label}}
            </div>
          </template>

          <template v-slot:selected="{option}">
            <div class="tag-in-nice">
              <p>{{option.label}} </p>
            </div>
          </template>

        </v-select>
      </div>
      <!--<v-select :options="tags" label="tags" index="code"  /> -->
    </div>

    <!-- Conditions -->
    <div class="row condition-row">
      <table>
        <thead class="hidden-border">
          <tr>
            <th> <h5> Condition </h5> </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> Is 'Clean' and 'Cool' </td>
          </tr>

          <tr>
            <td> Is 'Dirty' and 'has 100 gold' </td>
          </tr>

          <tr>
            <td> Is 'Dirty' and 'has 100 gold' </td>
          </tr>
          <tr>
            <td> Is 'Dirty' and 'has 100 gold' </td>
          </tr>
          <tr v-for="(item, index) in currentInteraction.conditionList" :key="index">
            {{item}}
          </tr>
        </tbody>
     </table>
    </div>

  </section>
</template>

<script>

export default {
  name: 'AreaInteraction',
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
      templateActionList: [],
    }
  },
  components: {
  },
  props: {
    name: String,
    currentInteraction: Object,
    tags: Array,
  },
  mounted(){
  },
  methods:{
    selectNewAction(action){
      console.log(action);
    },
    insertNewAction(action){
      if(!this.currentInteraction) return;
      if(!this.currentInteraction.scriptList) return;

      this.currentInteraction.scriptList.push(action);
    },
    insertNewInteraction(interaction){
      this.$parent.addInteraction(interaction);
    },
    removeAction(index){
      console.log(index);
      this.currentInteraction.scriptList.splice(index, 1);
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
  margin-top: 20px;
}

.bitright{
  margin-left: 20px;
}
.bigInput{
  height: 40px;
  min-width: 400px;
  font-size: 22px;
  background-color: #E8E8E8;
}
.area-nice{
  min-width: 400px;
  min-height: 200px;
  font-size: 17px;

}

.tag-nice{
  min-width: 400px;
  font-size: 20px;
  text-align: left;
}

.tag-in-nice{
  background: none !important;
  font-weight: 25px;
  font-family: Neucha;
}
.white-tag{
  background-color: white;
}

.tag-row{
  height: 5vh;
}
.condition-row{
  height: 50vh;
}
.description-row{
  height: 20vh;
}

table {
  /* border: 1px solid black; */
  /*  border: none; */
  /* border: 1px solid black; */
	border-style: none;
}
tr {
  padding: 15px;
}
td{
  font-size:13px;
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
