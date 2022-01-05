export class World {
  constructor() {
    this.name = "cool";
		this.areaList = [{"name":"Home","description":"","connectedAreaList":[],"interactionList":[{"name":"Wolf!","scriptList":[{"eventName":"addDescription","description":"Bark!"},{"eventName":"restore","stat":"health","number":"20"},{"eventName":"addDescription","description":"The Wolf Licks Your Face!"}],"tags":[],"conditionList":[]}]}];
		this.areaMap = {
			'area1': {name: 'cool', interactionList:[], connectedAreaList: [], triggerEventList:[], onVisitEventList:[], flagMap: {'d1': true} },
			'area2': {name: 'cool', interactionList:[], connectedAreaList: [], triggerEventList:[], onVisitEventList:[], flagMap: {'d1': false}},
			'area3': {name: 'cool', interactionList:[], connectedAreaList: [], triggerEventList:[], onVisitEventList:[], flagMap: {'d1': true} },
		};
		//this.areaList = [];
    this.worldItemList = [];
		this.statusEffectList = [];
		this.tags = ['unique', 'normal', 'monday', 'tuesday', 'wenesday', 'thursday', 'friday', 'sunday', 'extra', 'fighter', 'knight', 'druid', 'priest'];
		this.conditionList =  ['debug1', 'debug2'];
		this.flagList =  ['test', 'fire', 'cool'];

    this.flagMap =  {'debug1': true, 'debug2': false, 'debug3': true};

    this.itemList = [
			{name: 'Gold'   , description: "currency", carry_limit: 9001, scriptList:[]},
      {name: 'Silver' , description: "currency", carry_limit: 9001, scriptList:[]},
    ];
		this.itemMap = {
			'Gold'    : {name: 'Gold'   ,description: "currency", limit: 9001, scriptList:[]},
      'Silver'  : {name: 'Silver' ,description: "currency", limit: 9001, scriptList:[]},
    };


		this.startingItemList = [{name: 'Gold', total: 10}, {name: 'Silver', total: 20}];

		this.complexConditionList = [{}];
		this.complexConditionMap  = {};

		this.statMap = {'health': {}, 'mana': {}, 'stamina': {}};

		this.timeSystem = {
			minutes: 60, hour: 24, daysInMonth: 28, month:['Spring','Summer','Fall','Winter'], year: 1000,
    };

    this.globalEventMap = {};
    this.commonEventMap = {};

    this.globalEventList = [];
    this.commonEventList = [];

    this.selectedArea = {flagMap: []};
  }
}
/*
			{name: "Area 1", description: "Welcome to Area 1", connectedAreaList: ["Area 2"], interactionList: []},
			{name: "Area 2", description: "Depise Area 2"    , connectedAreaList: ["Area 1", "Area 3"], interactionList: []},
			{name: "Area 3", description: "In Area 3"        , connectedAreaList: ["Area 2"], interactionList: []},
*/
