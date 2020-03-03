export const addMovie = movie => {
  return {
    type: 'ADD_MOVIE',
    payload: movie,
  }
}

export const updateMovie = (id, rating) => {
  return {
    type: 'UPDATE_MOVIE',
    payload: { id, rating },
  }
}

export const deleteMovie = id => {
  return {
    type: 'DELETE_MOVIE',
    payload: id,
  }
}
