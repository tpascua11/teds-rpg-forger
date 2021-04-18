<template>
  <div id="app">
    <nav class="border fixed split-nav">
      <div class="nav-brand">
        <h5> Drago Book Maker</h5>
      </div>
			<div class="nav-brand">
        <router-link to="/testing"  class="routerFont" > Testing Zone </router-link> |
        <router-link to="/area"  class="routerFont" > Area Builder   </router-link> |
        <router-link to="/"      class="routerFont" > Status Effects </router-link> |
				<router-link to="/"      class="routerFont" > Items     </router-link> |
        <router-link to="/world"      class="routerFont" > World </router-link> |
      </div>
    </nav>
    <div id="nav">
    </div>
    <router-view :world="world"/>
  </div>
</template>


<script>
import {World} from './js/world.js';

export default {
  name: "top",
  data: function() {
    return {
      world: new World(),
    };
  }
}


</script>

<style>

@import './css/paper.min.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
	/* text-align: center; */
  color: #2c3e50;
}

#nav {
  padding: 20px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.routerFont {
  font-size: 15px;
  border: none;
}
.label {
	color: white;
}

</style>
