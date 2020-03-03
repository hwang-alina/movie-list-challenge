export const getObjectById = (array, id) => {
  if (!array || !id) return
  return array.find(a => a.id === id)
}

export const updateObjectInArray = (array, id, newItem) => {
  if (!array || !id || !newItem) return
  return array.map(item => {
    if (item.id !== id) {
      return item
    }
    return {
      ...item,
      ...newItem,
    }
  })
}
