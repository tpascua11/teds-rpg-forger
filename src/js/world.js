export class World {
  constructor() {
		this.name = "cool";
		this.areaList = [{"name":"Home","description":"","connectedAreaList":[],"interactionList":[{"name":"Wolf!","scriptList":[{"eventName":"addDescription","description":"Bark!"},{"eventName":"restore","stat":"health","number":"20"},{"eventName":"addDescription","description":"The Wolf Licks Your Face!"}],"tags":[],"conditionList":[]}]}];
		this.areaMap = {
			'area1': {name: 'cool', interactionList:[], connectedAreaList: []},
			'area2': {name: 'cool', interactionList:[], connectedAreaList: []},
			'area3': {name: 'cool', interactionList:[], connectedAreaList: []},
			'area4': {name: 'cool', interactionList:[], connectedAreaList: []},
		};
		//this.areaList = [];
    this.worldItemList = [];
		this.statusEffectList = [];
		this.tags = ['unique', 'normal', 'monday', 'tuesday', 'wenesday', 'thursday', 'friday', 'sunday', 'extra', 'fighter', 'knight', 'druid', 'priest'];
		this.conditionList =  ['debug1', 'debug2'];
		this.flagList =  ['test', 'fire', 'cool'];

		this.flagMap =  {'debug1': true, 'debug2': false, 'debug3': true};
		this.itemMap = {
			'Gold'  : {description: "currency", limit: 9001, scriptList:[]},
			'Silver': {description: "currency", limit: 9001, scriptList:[]},
		};
		this.startingItemList = [{name: 'Gold', total: 10}, {name: 'Silver', total: 20}],

		this.complexConditionList = [{}];
  }
}
/*
			{name: "Area 1", description: "Welcome to Area 1", connectedAreaList: ["Area 2"], interactionList: []},
			{name: "Area 2", description: "Depise Area 2"    , connectedAreaList: ["Area 1", "Area 3"], interactionList: []},
			{name: "Area 3", description: "In Area 3"        , connectedAreaList: ["Area 2"], interactionList: []},
*/
