<template>
  <div id="app">
    <nav class="border fixed split-nav">
      <div class="nav-brand">
        <h3> Drago Book Maker</h3>
      </div>
      <div class="nav-brand">
        <router-link to="/area"> Area Builder </router-link> |
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
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
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
