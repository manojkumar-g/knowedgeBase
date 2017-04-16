import moment from 'moment'
import axios from 'axios'
import {browserHistory} from 'react-router'

export const addNewPart = (id) => ({
  type : 'ADD_NEW_PART',
  id
})

export const focus = (id) => ({
  type : 'ADD_FOCUS',
  id
})

export const changeContent =(id,newValue) => ({
  type : 'EDIT_CONTENT',
  id,
  newValue
})

export const changePartType = (id,newType) => ({
  type:'CHANGE_PART_TYPE',
  id,
  newType
})

export const removePart = (id) =>({
  type:'REMOVE_PART',
  id
})

export const publishArticle = () =>
  (dispatch,getState) => {
    dispatch(reqPublish())
    let state = getState()
    return axios.post('/api/publish',
        {
          data:state.editorData.data,
          genre : state.editorData.genre,
          author:state.userData.email,
          name:state.userData.firstName,
          time:moment().format()
        }
    ).then(response => {
      browserHistory.push('/')
      response.status === 200 ? dispatch(successPublish()) : dispatch(failurePublish())
    })
    .catch(
      ({response:{data}}) => {
        dispatch(failurePublish(data.message))
      }
    )
  }

  const successPublish = () => ({
      type : 'SUCCESS_PUBLISH'
  });
  const failurePublish = () => ({
      type : 'FAILURE_PUBLISH'
  });
  const reqPublish = () => ({
      type : 'REQUEST_PUBLISH'
  });

export const setGenre = (genre) => ({
  type:'SET_GENRE',
  genre
})
