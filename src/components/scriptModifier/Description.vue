<template>
  <section v-if="value.eventName == 'addDescription'" class="">
    <div class="row script-select-title">
      <i class="ra ra-book ra-1x"></i> Description
    </div>
    <div class="row">
      <textarea class="descriptionTextArea" rows="20" type="string"
        v-model="value.description" placeholder="...">
      </textarea>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Basic',
  data: function(){
    return {
    }
  },
  props: ['value'],
  mounted(){},
  methods:{
    test(){}
  },
  computed: {
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
    border-style: none;
    background-color: #F8F8F8;
  }
  .closer{
    position:relative;
    top: 0px;
    margin-top: -40px;
    /*margin-bottom: 10px;*/
  }



</style>
