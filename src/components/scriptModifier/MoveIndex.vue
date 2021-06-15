<template>
  <section
    v-if="    (value.eventName == 'moveIndex')"
    class="default-thin-border">
    <div class="row default-title-sm2">
      <div class="col col-12">
        Move Index
      </div>
    </div>
    <div class="row closer">
      <div class="col col-12">
        <input style="width: 100%" class="" type="number" v-model="value.index" placeholder="...">
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Basic',
  data: function(){
    return {
      template: {name: '', flag: true},
      flagList: Object.keys(this.$root.selectedArea.flagMap),
    }
  },
  props: ['value'],
  mounted(){},
  methods:{
    test(){},
    toggleFlag(){
      this.value.flag = !this.value.flag;
    },
  },
  computed: {
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
