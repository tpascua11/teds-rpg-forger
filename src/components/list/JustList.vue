<template>
  <div class="container">
    <section class="">
      <div v-if="title" class="border-down-x3" style="height: 30px;">
        <div class="pure-u-4-24">
          <i class="ra  ra-book   ra-lg"
            style="position: relative; top: 5px; left: 2px;
                   font-size: 24px;"></i>
          </div>
          <div class="pure-u-16-24 this-title left">
            {{title}}
        </div>
      </div>

      <div id="the-list" class="cool-scroll" v-bind:style="{height: box_height}">
        <div v-for="(row, index) in map" :key="index"
          class="border-down row clickable"
          v-bind:style="[ row == value ? styleObject : {}]"
          v-on:click="selectRow(row)"
        >
          <div class="pure-u-3-24 index-position left"> {{index}}.  </div>
          <div class="pure-u-1-24 text-position "> </div>
          <div class="pure-u-20-24 text-position" v-bind:class="classObject">
            {{row.name}}
          </div>
        </div>
      </div>

      <button v-on:click="addNewRow();" class="pure-button full-width">
        Create
      </button>

    </section>
  </div>
</template>

<script>

export default {
  name: 'ITEM_List',
  components: {},
  watch: {
    refresh: function(){
      console.log("?");
      this.$forceUpdate();
    }
  },
  props: ['value', 'title', 'map', 'set_height', 'area', 'template', 'templateInfo', 'refresh'],
  data: function(){
    return {
      hi: {},
      isActive: true,
      error: null,
      styleObject: {
        'font-weight': 'bold',
        'background-color': 'pink',
      },
      selectedItem: {},
      refTitle: this.title,
      selected: {},
    }
  },
  mounted(){
  },
  methods:{
    nameFormat: function(name){
      let newStr = name.replace(/_/g, " ");
      let nameX = newStr.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
      return nameX;
    },
    selectRow: function(row){
      this.selected = row;
      this.$emit('input', row);
      this.$emit("selected");
    },
    addNewRow: function(){
      console.log("TEST REF MAP", this.refMap);
      let index = Object.keys(this.refMap).length + 1;
      index;
      let newEntity

      console.log("template", this.template);
      if(this.templateInfo) newEntity = this.copyFromTemplateInfo();
      else if(this.template) newEntity = JSON.parse(JSON.stringify(this.template));
      else newEntity = {id: index};

      console.log("NEW ENTITY", newEntity);
      this.refMap[index] = newEntity;

      this.selected = newEntity;
      this.$emit('input', newEntity);
      this.$emit("selected");
      this.$emit('created');

      this.$forceUpdate();
    },
    copyFromTemplateInfo: function(){
      console.log("Can i see if this exist", JSON.stringify(this.templateInfo));
      let newEntity = {};
      Object.keys(this.templateInfo).forEach(key => {
        if(!this.templateInfo[key]) return;
        if(this.templateInfo[key].default_set){
          newEntity[key] = JSON.parse(JSON.stringify(this.templateInfo[key].default_set));
        }
        else if(this.templateInfo[key].type == 'string'){
          newEntity[key] = '';
        }
        else if( this.templateInfo[key].type == 'number') newEntity[key] = 0;
        else if( this.templateInfo[key].type == 'condition_list') newEntity[key] = [];
        else if( this.templateInfo[key].type == 'script_list') newEntity[key] = [];
        else newEntity[key] = {};
      });
      console.log("DUPLICATE FROM INFO", newEntity);
      return newEntity;
    },
    scrollToEnd: function() {
      var container = this.$el.querySelector("#item-list");
      container.scrollTop = container.scrollHeight;
    },
  },
  computed: {
    refMap: function(){
      return this.map;
    },
    classObject: function () {
      return {
        active: this.isActive && !this.error,
        'text-danger': this.error && this.error.type === 'fatal'
      }
    },
    list: function(){
      //return this.value[this.mapName];
      //console.log("test source", this.source);
      if(this.source) return this.$root.world[this.source][this.mapName];
      else return this.$root.world[this.mapName];
    },
    box_height: function(){
      if(this.set_height) return this.set_height.toString();
      else return '300px';
    }
  }
}
</script>

<style scoped>
.border-up{
  /*border-top-style: solid;*/
  border-right-style: solid;
  border-left-style: solid;
}
.border-down{
  border-bottom-style: solid;
  /*
  border-right-style: solid;
  border-left-style: solid;
   */
  border-width: 1px;
}
.row{
  min-height: 20px;
  font-size: 15px;
  position:relative;
  text-align: left;
  /*overflow: hidden;*/
}
.row:hover{
  background-color: #99cfe0;
}
.text-position{
  font-size: 17px;
  position: relative;
  top: 3px;
}

.index-position{
  font-size: 13px;
  position: relative;
  top: 6px;
  left: 5px;
  /*
  font-family: "Avenir";
   */
}

.this-title{
  font-size: 22px;
  font-weight: bold;
  position: relative;
  top: 5px;
}

.this-title-icon{
  font-size: 22px;
  font-weight: bold;
  position: relative;
  top: 2px;
}


</style>
