import findIndex from 'lodash/findIndex'
import slice from 'lodash/slice'


const initialState = {
  data:[
    {id : 0,type:'titleText',data:''},
    {id : 1,type:'paragraph',data:''}
  ],
  focused:0,
  genre:'EDUCATION',
  requestPublish: false,
  successPublish:false
}
const reducer = (state = initialState,action) =>{
  let {data} = state
  let ind = findIndex(data,(d) => d.id == action.id)
  switch (action.type) {
    case 'ADD_FOCUS':
        return{
          ...state,
          focused:action.id
        }

    case 'EDIT_CONTENT':
      return{
        ...state,
        data:[
          ...slice(data,0,ind),
          {...data[ind],data:action.newValue},
          ...slice(data,ind+1,data.length)
        ]
      }
    case 'CHANGE_PART_TYPE':
      return{
        ...state,
        data:[
          ...slice(data,0,ind),
          {...data[ind],type:action.newType},
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
      focused:ind >0 ? data[ind-1].id : 0,
      data:[
        ...slice(data,0,ind),
        ...slice(data,ind+1,data.length)
      ]
    }
    case 'SET_GENRE':
      return{
        ...state,
        genre:action.genre
      }
    case 'REQUEST_PUBLISH':
      return{
        ...state,
        requestPublish:true
      }
    case 'SUCCESS_PUBLISH':
      return{
        ...initialState,
        successPublish:true
      }
    case 'FAILURE_PUBLISH':
      return{
        ...state,
        requestPublish:false,
        successPublish:false
        }
    default:
      return state

  }
}

export default reducer
