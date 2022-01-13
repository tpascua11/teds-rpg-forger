<template>
  <div class="World">
    <div class="container container-md paper">
      <div class="row">
        <div class="col-md-6">
          <h4> World: {{world.name}} </h4>
        </div>
        <div>
        </div>
        <!--
        <div class="col-md-2">-</div>
        <div class="col-md-3">
          <br><br>
            <input  class="btn-default nice-small-fit"
              type="string"
              v-model="worldName"
              placeholder="Item...">
              <button class="btn-info nice-small-fit" v-on:click="saveName">
                Change Name
              </button>
            </div>
            -->

      </div>
      <div class="row">
        <div class="col-6">
          <h4> Save World As Json </h4>
          <input class="btn-default btn-block nice-small-fit" type="string"
            v-model="name" placeholder="Item...">
          <button class="btn-success nice-small-fit" v-on:click="saveName">
            <vue-blob-json-csv
              file-type="json"
              :file-name="name"
              :data=[referenceWorld]
            >
              Download World As JSON
            </vue-blob-json-csv>
          </button>
        </div>
        <div class="col-6">
          <h4> Load World Json </h4>
          <div class="row">
            <div class="col-md-6">
              <label class="text-reader">
                <input type="file" @change="loadTextFromFile"
                  class="nice-small-fit">
              </label>
            </div>

            <div class="col-md-6">
              <div class="row" v-if="isValidWorld">
                <button class="btn-default btn-block nice-small-fit btn-warning"
                  v-on:click="loadWorld">
                  Load World In
                </button>
              </div>
            </div>
        </div>
      </div>
    </div>
    <div class="container container-md paper simpleScrollable">
      {{fileInfo}}
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
      worldName: "",
      isValidWorld: false,
      fileInfo: {},
    };
  },
  components: {},
  props: { world: Object },
	computed: {
		referenceWorld: function(){
			return this.$root.world;
		}
  },
  methods:{
    downloadWorld(){

    },
    saveName(){
      this.$parent.changeWorldName(this.name);
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
      this.$root.world = newWorld[0];
      //this.$parent.worldLoad(newWorld[0]);
      //this.world = newWorld;
    }
  },
  mounted(){}
}
</script>


<style>
.simpleScrollable{
  overflow: scroll;
  display:block;
  width:100%;
  height:500px;
}
</style>
