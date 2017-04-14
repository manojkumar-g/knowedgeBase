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
      let newData = [
        ...slice(data,0,ind),
        {...data[ind],data:action.newValue},
        ...slice(data,ind+1,data.length)
      ]
      return{
        ...state,
        data:newData
      }
    default:
      return state

  }
}

export default reducer
