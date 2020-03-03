import axios from 'axios'
import { Modal } from 'antd'
const URL = 'http://localhost:8080/api'

export const fetchMoviesRequest = () => ({ type: 'FETCH_MOVIES_REQUEST' })
export const fetchMoviesSuccess = data => ({
  type: 'FETCH_MOVIES_SUCCESS',
  payload: data,
})
export const fetchMoviesFailure = () => ({ type: 'FETCH_MOVIES_FAILURE' })

export const fetchMovies = (movieName, resultsPage) => async dispatch => {
  const page = resultsPage || 1
  dispatch(fetchMoviesRequest())
  try {
    const response = await axios.get(
      `${URL}/search?s=${movieName}&page=${page}`
    )
    const { data } = response
    let { results } = data
    //TODO: results.Search check
    if (results.Response === 'True') {
      results = {
        movieName: movieName,
        data: results.Search.map((r, i) => ({
          id: i,
          title: r.Title,
          year: r.Year,
          imdbID: r.imdbID,
        })),
        page: page,
        total: results.totalResults,
        error: null,
      }
    } else {
      results = {
        movieName: movieName,
        error: results.Error,
      }
      Modal.warning({ title: results.error })
    }
    dispatch(fetchMoviesSuccess(results))
  } catch (e) {
    console.error(e)
    Modal.error({ title: e.name, content: e.message })
    dispatch(fetchMoviesFailure())
  }
}

export const fetchMovieDetailsRequest = () => ({
  type: 'FETCH_MOVIE_DETAILS_REQUEST',
})
export const fetchMovieDetailsSuccess = details => ({
  type: 'FETCH_MOVIE_DETAILS_SUCCESS',
  payload: details,
})
export const fetchMovieDetailsFailure = () => ({
  type: 'FETCH_MOVIE_DETAILS_FAILURE',
})
export const fetchMovieDetails = imdbID => async dispatch => {
  dispatch(fetchMovieDetailsRequest())
  try {
    const response = await axios.get(`${URL}/search?i=${imdbID}`)
    const { data } = response
    let { results } = data

    if (results.Response === 'True') {
      results = {
        id: results.imdbID,
        title: results.Title,
        genre: results.Genre,
        year: results.Year,
        imdbRating: results.imdbRating,
        rating: null,
      }
    } else {
      results = {
        movieName: imdbID,
        error: results.Error,
      }
      Modal.warning({ title: results.error })
    }

    dispatch(fetchMovieDetailsSuccess(results))
  } catch (e) {
    console.error(e)
    dispatch(fetchMovieDetailsFailure())
  }
}

export const clearMovieDetails = () => ({
  type: 'CLEAR_MOVIE_DETAILS',
})

export const clearSearchResults = () => ({
  type: 'CLEAR_SEARCH_RESULTS',
})
