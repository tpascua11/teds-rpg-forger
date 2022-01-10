<template>
	<div id="app">
		<div>
			<nav class="default-thin-border fixed bolded">
				<div>
					|
					<i class="ra ra-burning-book ra-1x"> </i> Dracoforge
					|
					<router-link to="/betterArea"  	class="routerFont" > Area  	 </router-link> |
					<router-link to="/item"  				class="routerFont" > Items 	 </router-link> |
					<router-link to="/world" 				class="routerFont" > World 	 </router-link> |
					<router-link to="/stat" 				class="routerFont" > Stats 	 </router-link> |
					<router-link to="/common" 			class="routerFont" > Common  </router-link> |
					<router-link to="/global" 			class="routerFont" > Global  </router-link> |
					<router-link to="/testing" 			class="routerFont" > Testing </router-link> |
				</div>
			</nav>
			<div id="nav">
			</div>
			<router-view :world="world"/>
		</div>
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

@font-face {
  font-family: "Neucha";
	src: local("Neucha"),  url(./css/Neucha-Regular.ttf) format("truetype");
}

#app {
  font-family: Neucha, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
	/* text-align: center; */
  color: #2c3e50;
}

p{
  font-weight: bold;
	font-size: 13px;
	font-style: italic;
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
.dt-border{
	border: 1px solid black;
}

.double-border{
	border: 2px solid black;
}

.no-border{
	border-style: hidden;
	overflow: visible;
}

.borderless-gray{
	border-style: hidden;
	z-index: 10;
}

.default-title-sm1{
	font-size: 14px;
	font-weight: bold;
  text-decoration: underline;
}

.default-title-sm2{
	font-size: 20px;
	font-weight: bold;
	/*text-decoration: underline;*/
}
.script-action-title{
	font-size: 18px;
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

.default-font{
  font-family: 'Neucha';
}

.script-select-title{
	font-size: 18px;
	font-weight: bold;
	border-color: black;
	border-bottom-style: solid;
	border-width: thin;
}

.button{
	font-family: 'Neucha';
}

.fixed{
	position: fixed;
	z-index: 4;
	background-color:white;
	width: 100%;
}

.good-height{
	height: 75vh;
}

.good-height-r{
	height: 55vh;
}

.center{
	text-align: center;
}

.right{
	text-align: right;
}

.bolded{
  font-weight: bold;
}

.full-width{
	width: 100%;
}

.quater-width{
	width: 25%;
}
.width-33{
	width: 25%;
}
.half-width{
	width: 25%;
}

.clickable{
	cursor: pointer;
}

.ofs{
	/* over flow scroll */
	overflow: scroll;
}
.border-down{
	border-color: black;
	border-bottom-style: solid;
  /*
  border-right-style: solid;
  border-left-style: solid;
   */
  border-width: 1px;
}
.border-top{
	border-color: black;
	border-top-style: solid;
  /*
  border-right-style: solid;
  border-left-style: solid;
   */
  border-width: 1px;
}

.action-title{
	font-size: 18px;
	font-weight: bold;
}

.margin1{
	margin: 5px;
}

</style>
