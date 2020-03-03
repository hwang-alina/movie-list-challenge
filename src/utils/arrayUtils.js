import clone from 'lodash/clone'

export const deleteValueFromArray = (value, array) => {
  const clonedArray = clone(array)
  const index = clonedArray.indexOf(value)
  if (index !== -1) clonedArray.splice(index, 1)
  return clonedArray
}

export const isDuplicate = (array, id) =>
  array.find(s => {
    return s.id === id
  })
