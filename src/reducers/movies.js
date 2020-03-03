import { updateObjectInArray } from '../utils/objectsArrayUtils'
import { isDuplicate } from '../utils/arrayUtils'

const initialState = [
  {
    id: 'tt0211915',
    title: 'Amélie',
    genre: 'Comedy, Romance',
    year: '2001',
    imdbRating: '8.3',
    rating: 5,
  },
  {
    id: 'tt0133093',
    title: 'The Matrix',
    genre: 'Action, Sci-Fi',
    year: '1999',
    imdbRating: '8.7',
    rating: 3.5,
  },
  {
    id: 'tt0118799',
    title: 'Life Is Beautiful',
    genre: 'Comedy, Drama, Romance, War',
    year: '1997',
    rating: 5,
    imdbRating: '8.6',
  },
  {
    id: 'tt0167261',
    title: 'The Lord of the Rings: The Two Towers',
    genre: 'Adventure, Drama, Fantasy',
    year: '2002',
    rating: 4,
    imdbRating: '8.7',
  },
]

export const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_MOVIE':
      return updateObjectInArray(
        state,
        action.payload.id,
        action.payload.rating
      )
    case 'DELETE_MOVIE':
      return [...state.filter(m => m.id !== action.payload)]
    case 'ADD_MOVIE':
      if (isDuplicate(state, action.payload.id)) return state
      return [...state, action.payload]
    default:
      return state
  }
}
