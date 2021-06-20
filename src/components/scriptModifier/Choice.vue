<template>
  <section v-if="value.eventName == 'choiceList'" class="default-thin-border">
    <div class="row">
      <div class="col col-12">
        <i class="ra ra-book ra-1x"></i>
        Choice List
      </div>
    </div>
    <div class="row closer">
      <div class="col col-12">
        <v-select v-model="value.choiceList"
          :from="value.choiceList" class=" " placeholder="Add Flag"
          @create="createChoice($event)">
        </v-select>
      </div>
    </div>
    <div class="row">
      <div class="col col-12">
        <p>
          Choice List is a list of Script Names, the user in the game
         will select one of the choices and it will set a Script Flag of
         that name to be true.
          This is to mimic CASE statments
       </p>
      </div>
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
    test(){},
    createChoice({value}){
      this.value.choiceList.push(value);
    }
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
  }

.closer{
  position:relative;
  top: 0px;
  margin-top: -40px;
  /*margin-bottom: 10px;*/
}



</style>
