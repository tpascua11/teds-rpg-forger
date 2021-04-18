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
      <input type="file" ref="myFile" @change="selectedFile"><br/>
    </div>

  </div>
</template>

<script>


export default {
  name: 'areabuilder',
  data: function() {
    return {
      name: "alpha",
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
    selectedFile() {
      /*
      console.log('selected a file', e.target.files);
       */
      let file =  this.$refs.myFile.files[0];

      console.log(this.$refs.myFile.files[0]);
      let reader = new FileReader();


      reader.readAsText(file);
      console.log("test", JSON.parse(reader.result));
    },

  },
  mounted(){}
}
</script>


<style>
</style>
