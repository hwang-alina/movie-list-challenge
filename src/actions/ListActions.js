export const addList = listName => {
  return {
    type: 'ADD_LIST',
    payload: listName,
  }
}

export const deleteList = id => {
  return {
    type: 'DELETE_LIST',
    payload: id,
  }
}

export const deleteMovieFromList = (movieId, listId) => {
  return {
    type: 'DELETE_MOVIE_FROM_LIST',
    payload: { movieId, listId },
  }
}

export const addMovieToLists = (movieId, lists) => {
  return {
    type: 'ADD_MOVIE_TO_LISTS',
    payload: { movieId, lists },
  }
}

export const addMoviesArrayToList = (movies, listId) => {
  return {
    type: 'ADD_MOVIES_ARRAY_TO_LIST',
    payload: { movies, listId },
  }
}
