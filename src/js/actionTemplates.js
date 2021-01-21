export default {
  defaulted: [
    {
      name: 'checkCondition',
      template: {
        isCondition: [[], ],
        notCondition: [[], ],
        isTemporaryCondition: [[], ],
        isTemporaryNotCondition: [[], ],
      }
    },
  ],

  actions: [
    {eventName: 'addDescription', description: ""},
    {eventName: 'lose', stat: "", number: 0},
    {eventName: 'restore', stat: "", number: 0},
    {
      eventName: 'timePass',
      addMinutes: 0,
      addHours: 0,
      addDays: 0,
      addMonths: 0,
    },
  ],

  special:[
    {eventName:'loopBack'              , loop: true, index: 0},
    {eventName:'setTemporaryCondition' , referenceList: 'temporaryCondition', name: "", flag: true},
    {eventName:'setCondition'          , referenceList: 'condition', name: "", flag: true},
    {eventName:'inflictStatus'         , referenceList: 'status',  addStatus: '', statusName: "", number: 1},
    {eventName:'cureStatus'            , referenceList: 'status',  removeStatus: ''},
    {eventName:'addItem'               , referenceList: 'worldItem',  itemName: ''},
    {eventName:'loseItem'              , referenceList: 'worldItem',  itemName: ''},
  ],


}
