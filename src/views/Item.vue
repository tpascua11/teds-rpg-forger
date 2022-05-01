<template>
  <div class="container container-lg">
    <Entity v-bind:groupEntity="'item'" 
            v-bind:title="'Item'"/>
 </div>
  </template>

<script>

import Entity from '@/components/Entity.vue'

export default {
  name: 'Items',
  data: function() {
    return {
    };
  },
  components: {
    Entity
  },
  props: {
    world: Object,
  },
  computed: {
  },
  methods:{
  },
  mounted(){
  }
}
</script>


<style scoped>
textarea {
  box-sizing:border-box;
  height: 20%;
  width: 100%;
}
.nice-border{
  border: 1px solid black;
}

.simple-border{
  border: 1px solid black;
}

.hidden-border{
  border-style: none;
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

.description-row{
  position:relative;
  top: -50px;
}

.script-row{
  height: 225px;
  position:relative;
  top: -125px;
}

p{
  font-size: 16px;
}

.big{
  width: 190vh;
}

input:focus {
  outline: none;
  background: #e5e4e2;
}

.border-down{
	border-color: black;
	border-bottom-style: solid;
  /*
  border-right-style: solid;
  border-left-style: solid;
   */
  border-width: 1px;
}

.button-error {
	background-color: #E9967A;
}

.button-warning {
  background-color: #f2f28d;
}


</style>
