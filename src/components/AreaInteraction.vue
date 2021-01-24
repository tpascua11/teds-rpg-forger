<template>
  <section class="basedHeight bitright">
      <div class="row">
        <input class="bigInput" type="string" v-model="currentInteraction.name" placeholder="Name">
        <ol> test </ol>

        <ol> test </ol>
        <ol> test </ol>
        <ol> test </ol>

        <!--<v-select :options="tags" label="tags" index="code"  /> -->

      </div>

      <div class="row simple-border tag-nice">

        <div class="col-10 col">
          Tags
        </div>
        <div class="col-2 col">
          +
        </div>
      </div>

      <div class="row">
        <table>
          <thead>
            <tr>
              <th> Condition </th>
            </tr>
          </thead>
          <tbody>
            <tr>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="row">
        <textarea class="area-nice" v-model="currentInteraction.description"
          placeholder="interaction description"></textarea>
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
}

.tag-nice{
  min-width: 400px;
  font-size: 20px;
  text-align: left;
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
