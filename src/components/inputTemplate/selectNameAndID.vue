<template>
  <div>
    <v-select v-model="value.id" :options="keyList" label="id" @input="setName">
      <template #selected-option="{}">
        {{list[value.id].name}}
      </template>
      <template #option="{id}">
        {{list[id].name}}
      </template>
    </v-select>
  </div>
</template>

<script>
export default {
  name: 'Select_Name_and_ID',
  data: function(){
    return {
      template: {name: '', flag: true},
    }
  },
  props: ['value', 'list'],
  mounted(){
  },
  methods:{
    test(){},
    toggleFlag(){
      this.value.flag = !this.value.flag;
    },
		setName(){
      //this.value.name = this.list[this.value.id].name;
		},
    createFlag(){
    }
  },
  computed: {
    keyList: function(){
      if(!this.list) return [];
      return Object.keys(this.list);
    },
    classObject: function () {
      return { active: this.isActive && !this.error, 'text-danger': this.error && this.error.type === 'fatal'}
    }
  }
}

</script>

<style scoped>
.v-select {
  font-size: 13px;
  width: 100%;
}

textarea {
  box-sizing:border-box;
  height: 100%;
  width: 100%;
}

.smallfit{
  height: 23px;
  display: table-cell;
  min-width: 120%;
  left: -10%;
  position: relative;
  padding:0.1em;
}

.descriptionTextArea{
  font-size: 14px;
}

.smallt{
  height: 38px;
  width: 50px;
  position:relative;
  left: -10px;
}

.smalltin{
  position:relative;
  font-weight: bold;
}

.closer{
  position:relative;
  top: 0px;
  margin-top: -40px;
  /*margin-bottom: 10px;*/
}

.closer2{
  position:relative;
  top: 0px;
  margin-top: -50px;
  /*margin-bottom: 10px;*/
}





</style>
