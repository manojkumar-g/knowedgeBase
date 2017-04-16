import { combineReducers } from 'redux'
import editorData from './editor'
import userData from './user'
export default combineReducers(
    {editorData,userData}
)
