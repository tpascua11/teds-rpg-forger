export class World {
  constructor() {
    this.name = "cool";
		this.areaList = [
		];
    this.worldItemList = [];
		this.statusEffectList = [];
		this.tags = ['unique', 'normal', 'monday', 'tuesday', 'wenesday', 'thursday', 'friday', 'sunday', 'extra', 'fighter', 'knight', 'druid', 'priest'];
		this.conditionList =  ['debug1', 'debug2'];
		this.flagList =  ['test', 'fire', 'cool'];

		this.flagMap =  {};
		this.itemMap = {
			'Gold'  : {description: "currency", limit: 9001, scriptList:[]},
			'Silver': {description: "currency", limit: 9001, scriptList:[]},
		};
		this.startingItemList = [{name: 'Gold', total: 10}],

		this.complexConditionList = [{}];
  }
}
/*
			{name: "Area 1", description: "Welcome to Area 1", connectedAreaList: ["Area 2"], interactionList: []},
			{name: "Area 2", description: "Depise Area 2"    , connectedAreaList: ["Area 1", "Area 3"], interactionList: []},
			{name: "Area 3", description: "In Area 3"        , connectedAreaList: ["Area 2"], interactionList: []},
*/
