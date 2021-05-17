<template>
  <div class="Items">
    <div class="row">
      <div class="col-2 col"> --- </div>
      <div class="col-2 col"> --- </div>
      <div class="col-6 col"> --- </div>
    </div>
    <div v-if="false">
    </div>
  </div>
</template>

<script>


export default {
  name: 'Items',
  data: function() {
    return {
		};
  },
  components: {
  },
  props: {
    world: Object
  },
	computed: {
		referenceWorld: function(){
			return this.$root.world;
		}
  },
  methods:{
	},
  mounted(){
	}
}
</script>


<style>
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

p{
  font-size: 16px;
}

</style>
