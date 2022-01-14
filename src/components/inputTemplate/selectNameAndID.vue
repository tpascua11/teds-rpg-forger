<template>
  <div>
    <v-select v-model="value.id" :options="listWithKeys" label="name"
      :reduce="stat => (stat.id)" @input="setName($event);"
      :clearable="false"
    >
      <template #selected-option="{}">
        {{value.name}}
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
      listWithKeys: this.objectListToList(this.list),
    }
  },
  props: ['value', 'list', 'additional'],
  mounted(){
  },
  methods:{
    test(){},
    toggleFlag(){
      this.value.flag = !this.value.flag;
    },
    setName(events){
      console.log("event?", events);
      this.value.id = events;
      this.value.name = this.list[this.value.id].name;
      //Additional Changes

      /*
      let newID = this.value.id;
      console.log("TEST");
      if(this.additional){
        this.additional.forEach(row => {
          this.value.[row[0]] = this.list[newID].[row[1]];
        }, this);
      }
      newID;
       */

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

textarea {
  box-sizing:border-box;
  height: 100%;
  width: 100%;
}

</style>
