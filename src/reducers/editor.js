import findIndex from 'lodash/findIndex'
import slice from 'lodash/slice'

const initialState = {
  data:[
    {id : 0,type:'titleText',data:''},
    {id : 1,type:'paragraph',data:''}
  ]
}
const reducer = (state = initialState,action) =>{
  switch (action.type) {
    case 'EDIT_CONTENT':
      let {data} = state
      let ind = findIndex(data,(d) => d.id == action.id)
      return{
        ...state,
        data
      }
    default:
      return state

  }
}

export default reducer
