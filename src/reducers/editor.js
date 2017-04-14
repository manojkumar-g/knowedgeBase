import findIndex from 'lodash/findIndex'
import slice from 'lodash/slice'

const initialState = {
  data:[
    {id : 0,type:'titleText',data:''},
    {id : 1,type:'paragraph',data:''}
  ]

}
const reducer = (state = initialState,action) =>{
  let {data} = state
  let ind = findIndex(data,(d) => d.id == action.id)
  switch (action.type) {
    case 'EDIT_CONTENT':
      return{
        ...state,
        data:[
          ...slice(data,0,ind),
          {...data[ind],data:action.newValue},
          ...slice(data,ind+1,data.length)
        ]
      }
    case 'ADD_NEW_PART':
      return{
        ...state,
        data:[
          ...slice(data,0,ind+1),
          {id : Date.now(),type:'paragraph',data:''},
          ...slice(data,ind+1,data.length)
        ]
      }
    case 'REMOVE_PART':
    if(data.length === 1)
      return state
    return{
      ...state,
      data:[
        ...slice(data,0,ind),
        ...slice(data,ind+1,data.length)
      ]
    }
    default:
      return state

  }
}

export default reducer
