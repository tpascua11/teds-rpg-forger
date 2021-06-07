<div v-for="(item, propertyName, index) in selectedAction"
  :key="propertyName">

  <p>{{index}}: {{ propertyName }}</p>
  <section v-if="item.type === 'string'">
    <p> is a string </p>
  </section>
  <section v-if="item.type === 'number'">
    <p> is a number</p>
  </section>
  <section v-if="item.type === 'boolean'">
    <p> is a boolean</p>
  </section>

</div>

  <-- v-select example of dual templates --
<v-select v-model="flagList" :from="dlist"
  class="f-size adaptable-width" placeholder="Add Flag">
  <template v-slot:selected="{option}">
    <div class="f-size">
      <p> {{option.raw}}</p>
    </div>
  </template>

  <template v-slot:option="{option}">
    <div class="f-size">
      {{option.raw}}
    </div>
  </template>
</v-select>


validScriptList(){
  console.log("CHECK VALIDATION!");
  let ifConditionList = [];
  let endConditionList = [];
  let elseConditionList = [];
  let error = "";
  //{start: 0, end: 0}
  let enclosedList = [];
  let starIf = [];

  this.selectedScriptList.forEach(function(script, index){
    if(script.ifCondition){
      ifConditionList.push(index);
      starIf.push(index);
    }
    if(script.endCondition ){
      endConditionList.push(index);
      enclosedList.push({start: starIf.pop(), end: index});
    }
    if(script.elseCondition){
      elseConditionList.push(index);
    }

    if(ifConditionList.length < endConditionList.length){
      if(!error){
        error = "If and End Statement Not Closed Correctly at index: " + index;
      }
    }

    if(script.elseCondition || script.elseIfCondition){
      if(ifConditionList.length == endConditionList.length){
        error = "Else or Else If Case Exist Outside of If - End" + index;
      }
    }
  });
  if(ifConditionList.length != endConditionList.length){
    error = "Missing IF or END conditions to close condition!";
  }
  this.ifConditionIndexList  = ifConditionList ;
  this.endConditionIndexList = endConditionList;
  this.elseConditionIndexList = elseConditionList;

  this.error = error;
  console.log("ENCLOSED", enclosedList);

  return error;
},

validScriptList(){
      console.log("CHECK VALIDATION!");
      let ifConditionList = [];
      let endConditionList = [];
      let elseConditionList = [];
      let elseIfConditionList = [];
      let error = "";
      //{start: 0, end: 0}
      let enclosedList = [];
      let starIf = [];

      this.selectedScriptList.forEach(function(script, index){
        if(script.ifCondition){
          ifConditionList.push(index);
          starIf.push(index);
        }
        if(script.endCondition){
          endConditionList.push(index);
          let enclosed = {start: starIf.pop(), end: index};
          enclosed.elseIf = betweenList(elseIfConditionList, enclosed.start, enclosed.end)
          enclosed.else   = betweenList(elseConditionList, enclosed.start, enclosed.end)
          enclosedList.push(enclosed);
        }

        if(script.elseCondition) elseConditionList.push(index);
        if(script.elseIfCondition) elseIfConditionList.push(index);

        if(ifConditionList.length < endConditionList.length){
          if(!error){
            error = "If and End Statement Not Closed Correctly at index: " + index;
          }
        }

        if(script.elseCondition || script.elseIfCondition){
          if(ifConditionList.length == endConditionList.length){
            error = "Else or Else If Case Exist Outside of If - End" + index;
          }
        }
      });
      if(ifConditionList.length != endConditionList.length){
        error = "Missing IF or END conditions to close condition!";
      }
      this.ifConditionIndexList  = ifConditionList ;
      this.endConditionIndexList = endConditionList;
      this.elseConditionIndexList = elseConditionList;

      this.error = error;
      console.log("ENCLOSED", enclosedList);

      return error;

      function betweenList(list, start, end){
        console.log(list);
        let between = [];
        let pop = 0;
        list.forEach(function(val){
          if(val >= start && val <= end){
            between.push(val);
            pop++;
          }
        });
        for(let i = 0; i < pop; i++){ console.log("--"); list.pop;}
        console.log("POPPED", list);
        return between;
      }

    },



