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
    this.statList = [
      {name: 'health'},
      {name: 'mana'},
      {name: 'stamina'},
      {name: 'currency'},
    ]
    this.statKeyMap = {
      0: {name: 'health'},
      1: {name: 'mana'},
      2: {name: 'stamina'},
      3: {name: 'currency'}
    }

		this.timeSystem = {
			minutes: 60, hour: 24, daysInMonth: 28, month:['Spring','Summer','Fall','Winter'], year: 1000,
    };

    this.globalEventMap = {};
    this.commonEventMap = {};

    this.globalEventList = [];
    this.commonEventList = [];

    this.selectedArea = {flagMap: []};

    this.group = {
      stat: {template: {name: '', amount: 0},
        list: {
          0: {name: 'health'},
          1: {name: 'mana'},
          2: {name: 'stamina'},
          3: {name: 'currency'},
        }
      },
      item: {template: {name: '', amount: 0, amount_max: 10000, scriptLst: []},
        list: {
          0: {name: 'Gold'   , description: "currency", amount_max: 9001, scriptList:[]},
          1: {name: 'Silver' , description: "currency", amount_max: 9001, scriptList:[]},
          2: {name: 'Copper' , description: "currency", amount_max: 9001, scriptList:[]},
          3: {name: 'Spice'  , description: "currency", amount_max: 9001, scriptList:[]},
        }
      },
      area: {template: {name: '', },
        list: {
          0: {name: 'DEBUG_ROOM'},
        }
      },
      flag: {template: {name: '', },
        list: {
          0: {name: 'Flag Example 1', state: false},
          1: {name: 'Flag Example 2', state: false},
          2: {name: 'Flag Example 3', state: false},
          3: {name: 'Flag Example 4', state: false},
          4: {name: 'Flag Example 5', state: false},
        }
      },
      complex_condition: {template: {}, list: {}},
      common_event: {template: {}, list: {}},
      global_event: {template: {}, list: {}},
    }

  }
}
/*
			{name: "Area 1", description: "Welcome to Area 1", connectedAreaList: ["Area 2"], interactionList: []},
			{name: "Area 2", description: "Depise Area 2"    , connectedAreaList: ["Area 1", "Area 3"], interactionList: []},
			{name: "Area 3", description: "In Area 3"        , connectedAreaList: ["Area 2"], interactionList: []},
*/
