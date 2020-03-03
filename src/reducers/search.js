const initialState = {
  movieName: '',
  data: [],
  page: 1,
  total: 0,
  isFetching: false,
  error: null,
  movieToAdd: {
    data: {},
    isFetching: false,
  },
}

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_MOVIES_REQUEST':
      return { ...state, isFetching: true }
    case 'FETCH_MOVIES_SUCCESS':
      return { ...state, isFetching: false, ...action.payload }
    case 'FETCH_MOVIES_FAILURE':
      return { ...state, isFetching: false }
    case 'FETCH_MOVIE_DETAILS_REQUEST':
      return { ...state, movieToAdd: { ...state.movieToAdd, isFetching: true } }
    case 'FETCH_MOVIE_DETAILS_FAILURE':
      return {
        ...state,
        movieToAdd: { ...state.movieToAdd, isFetching: false },
      }
    case 'FETCH_MOVIE_DETAILS_SUCCESS':
      return {
        ...state,
        movieToAdd: {
          ...state.movieToAdd,
          isFetching: false,
          data: action.payload,
        },
      }
    case 'CLEAR_MOVIE_DETAILS':
      return { ...state, movieToAdd: { ...state.movieToAdd, data: {} } }
    case 'CLEAR_SEARCH_RESULTS':
      return {
        ...state,
        movieName: '',
        data: [],
        total: 0,
        error: null,
        movieToAdd: {
          data: {},
          isFetching: false,
        },
      }
    default:
      return state
  }
}
