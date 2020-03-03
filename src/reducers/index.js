import { combineReducers } from 'redux'
import { moviesReducer } from './movies'
import { listsReducer } from './lists'
import { searchReducer } from './search'

export const rootReducer = combineReducers({
  movies: moviesReducer,
  lists: listsReducer,
  searchResults: searchReducer,
})
