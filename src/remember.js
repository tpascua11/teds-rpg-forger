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


