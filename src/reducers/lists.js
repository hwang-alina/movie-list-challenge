import clone from 'lodash/clone'
import uniq from 'lodash/uniq'
import { deleteValueFromArray } from '../utils/arrayUtils'

const initialState = [
  {
    id: 1,
    listName: 'First list name',
    moviesList: ['tt0211915', 'tt0118799'],
  },
  {
    id: 2,
    listName: 'Second list name',
    moviesList: ['tt0133093', 'tt0118799', 'tt0167261'],
  },
]

export const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_LIST':
      return [
        ...state,
        {
          id: state.length + 1,
          ...action.payload,
          moviesList: [],
        },
      ]
    case 'DELETE_LIST':
      return [...state.filter(l => l.id !== action.payload)]
    case 'DELETE_MOVIE_FROM_LIST':
      return state.map(s => {
        if (s.id === action.payload.listId) {
          return {
            ...s,
            moviesList: deleteValueFromArray(
              action.payload.movieId,
              s.moviesList
            ),
          }
        } else return s
      })
    case 'ADD_MOVIE_TO_LISTS':
      const { movieId, lists } = action.payload
      let newState = clone(state)
      lists.forEach(l => {
        newState = state.map((s, i) => {
          if (s.id === l) {
            return { ...s, moviesList: [...s.moviesList, movieId] }
          } else {
            return newState[i]
          }
        })
      })
      return newState
    case 'ADD_MOVIES_ARRAY_TO_LIST':
      const { movies, listId } = action.payload
      return state.map((s, i) => {
        if (s.id === listId) {
          return { ...s, moviesList: uniq([...s.moviesList, ...movies]) }
        } else {
          return state[i]
        }
      })
    default:
      return state
  }
}
