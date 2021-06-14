<template>
  <div id="app">
    <nav class="border fixed split-nav">
      <div class="nav-brand">
				<h5>
				<button class="btn-default btn-small  btn-warning top-bar-height"
					v-on:click="saveToLocalStorage">

					Drago Book Maker
				</button>
				</h5>

      </div>
			<div class="nav-brand">
				<i class="ra ra-burning-book ra-1x"></i>
        <router-link to="/betterArea"  class="routerFont" > Area </router-link> |
				<router-link to="/item"  class="routerFont" > Items </router-link> |
				<router-link to="/world" class="routerFont" > World </router-link> |

				<router-link to="/testing" class="routerFont" > Testing Zone </router-link> |
				<!--
        <router-link to="/"      class="routerFont" > Status Effects </router-link> |
				<router-link to="/"      class="routerFont" > Items     </router-link> |
				-->
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
	},
	methods:{
		worldLoad(newWorld){
			console.log("SEE WORLD", newWorld);
			this.world = newWorld;
		},
		changeWorldName(name){
			this.world.name = name;
		},
		saveToLocalStorage(){
			localStorage.setItem('currentWorld', JSON.stringify(this.world));
		}
	},
	mounted() {
		/*
		let storedWorld = localStorage.getItem('currentWorld');
		console.log("lets see stored world", JSON.parse(storedWorld));
		this.world = JSON.parse(storedWorld);
		 */
		this.$root.world = this.world;

	},
	computed:{
		loadWhichWorld(){
			return new World();
		}
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
.top-bar-height{
  font-family: Neucha;
  font-size: 15px;
	height: 29px;
	padding:0.5em;
}

/* default */
.default-based-font{
	font-size: 14px;
}

.default-thin-border{
	border: 1px solid black;
}

.default-title-sm1{
	font-size: 14px;
	font-weight: bold;
  text-decoration: underline;
}

.default-title-sm2{
	font-size: 20px;
	font-weight: bold;
  text-decoration: underline;
}

.cool-scroll{
  overflow: scroll;
}

.default-modal-total-height{
  height: 750px;
}
.default-modal-body-height{
  height: 500px;
  overflow: scroll;
}
.default-modal-bottom-height{
  height: 100px;
}

.default-modal-total-height-sm{
  height: 750px;
}
.default-modal-body-height-sm{
  height: 500px;
  overflow: scroll;
}
.default-modal-bottom-height-sm{
  height: 100px;
}


/* Based Stuff*/
.move25up{
  position: relative;
  top: 25px;
}
.move50up{
  position: relative;
  top: -50px;
}
.move75up{
  position: relative;
  top: -75px;
}
.move100up{
  position: relative;
  top: -100px;
}

.debugblue{
  background-color: lightblue;
}

.debugpink{
  background-color: pink;
}

.debugy{
  background-color: #dbd1b4;
}






</style>
