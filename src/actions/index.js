export const addNewPart = (position) => ({
  type : 'ADD_NEW_PART',
  position
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

export const removePart(id)({
  type:'REMOVE_PART',
  id
})
