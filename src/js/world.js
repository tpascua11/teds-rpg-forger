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
          4: {name: 'currency'},
          5: {name: 'currency'},
          6: {name: 'currency'},
          7: {name: 'currency'},
          8: {name: 'currency'},
          9: {name: 'currency'},
          10: {name: 'currency'},
          11: {name: 'currency'},
          12: {name: 'currency'},
          13: {name: 'currency'},
          14: {name: 'currency'},
          15: {name: 'currency'},
          16: {name: 'currency'},
          17: {name: 'currency'},
          18: {name: 'currency'},
          19: {name: 'currency'},
          20: {name: 'currency'},
          21: {name: 'currency'},
          22: {name: 'currency'},
          23: {name: 'currency'},
          24: {name: 'currency'},
          25: {name: 'currency'},
          26: {name: 'currency'},
          27: {name: 'currency'},
          28: {name: 'currency'},
          29: {name: 'currency'},
          30: {name: 'currency'},
          31: {name: 'currency'},
          32: {name: 'currency'},
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
          0: {name: 'Flag Example', state: false},
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
