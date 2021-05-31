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

