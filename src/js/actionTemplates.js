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
    {name:'addDescription', template: {description: ""}},
    {name:'damage'        , template: {eventName: 'lose', stat: "", number: 0}},
    {name:'heal'          , template: {eventName: 'restore', stat: "", number: 0}},
    {
      name: 'timePass',
      template: {
        addMinutes: 0,
        addHours: 0,
        addDays: 0,
        addMonths: 0,
      }
    },
  ],
  special:[
    {name:'loopBack'      , template: {loop: true, index: 0}},
    {name:'setTemporaryCondition' , template: {referenceList: 'temporaryCondition', name: "", flag: true}},
    {name:'setCondition'          , template: {referenceList: 'condition', name: "", flag: true}},
    {name:'inflictStatus'         , template: {referenceList: 'status', eventName: 'addStatus', addStatus: '', statusName: "", number: 1}},
    {name:'cureStatus'            , template: {referenceList: 'status', eventName: 'removeStatus', removeStatus: ''}},
    {name:'addItem'               , template: {referenceList: 'worldItem', eventName: 'addItem', itemName: ''}},
    {name:'loseItem'              , template: {referenceList: 'worldItem', eventName: 'loseItem', itemName: ''}},
  ]
}
