<template>
  <div class="World">
    <div class="container container-md paper">
      <div class="row">
        <h4> World: {{world.name}}</h4>
      </div>
      <div class="row">
        <div class="col-4">
        </div>
        <div class="col-4">
          <input class="btn-default btn-block nice-small-fit" type="string"
            v-model="name" placeholder="Item...">
          <button class="btn-default btn-block nice-small-fit">
            <vue-blob-json-csv
              file-type="json"
              :file-name="name"
              :data=[world]
            >
              Download World As JSON
            </vue-blob-json-csv>
          </button>
        </div>
        <div class="col-4"></div>
      </div>
    </div>
    <div class="container container-md paper">
      <div class="row">
        <div class="col-md-6">
          <label class="text-reader">
            <input type="file" @change="loadTextFromFile">
          </label>
        </div>

        <div class="col-md-6">
          <div class="row" v-if="isValidWorld">
            <button class="btn-default btn-block nice-small-fit"
              v-on:click="loadWorld">
              Load World In
            </button>
          </div>
        </div>
        <!-- {{fileInfo}} -->
      </div>
  </div>

  </div>
</template>

<script>


export default {
  name: 'areabuilder',
  data: function() {
    return {
      name: "alpha",
      isValidWorld: false,
      fileInfo: {},
    };
  },
  components: {},
  props: { world: Object },
	computed: {
		referenceWorld: function(){
			return this.world;
		}
  },
  methods:{
    downloadWorld(){

    },
    loadTextFromFile(ev) {
      const file = ev.target.files[0];
      const reader = new FileReader();
      reader.readAsText(file);

      reader.onload = e => this.fileInfo = e.target.result;
      this.isValidWorld = true;
    },
    loadWorld(){
      let newWorld = JSON.parse(this.fileInfo);
      console.log("new world to be loaded", newWorld);
      this.$parent.worldLoad(newWorld[0]);
      //this.world = newWorld;
    }
  },
  mounted(){}
}
</script>


<style>
</style>
