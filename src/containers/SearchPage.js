import SearchForm from '../components/SearchForm'
import React, { useState } from 'react'
import { Spin, Typography } from 'antd'
import { connect } from 'react-redux'
import {
  clearMovieDetails,
  clearSearchResults,
  fetchMovieDetails,
  fetchMovies,
} from '../actions/SearchActions'
import { addMovieToLists } from '../actions/ListActions'
import ResultsTable from '../components/ResultsTable'
import MovieAddModal from '../components/MovieAddModal'
import { addMovie, updateMovie } from '../actions/MovieActions'
const { Title } = Typography

const SearchPage = props => {
  const [modalVisible, setModalVisible] = useState(false)
  const {
    lists,
    searchResults,
    fetchMoviesAction,
    fetchMovieDetailsAction,
    addMovieToListsAction,
    clearMovieDetailsAction,
    addMovieAction,
    clearSearchResultsAction,
  } = props
  const { isFetching, error, data } = searchResults

  const handleResultClick = movie => {
    if (movie) {
      fetchMovieDetailsAction(movie.imdbID)
      openModal(movie)
    }
  }

  const openModal = () => {
    setModalVisible(true)
  }

  return (
    <div className="searchPage">
      <Title>Search</Title>
      <SearchForm fetchMoviesAction={fetchMoviesAction} />
      {isFetching ? (
        <Spin size="large" />
      ) : (
        !error &&
        data.length !== 0 && (
          <>
            <ResultsTable
              searchResults={searchResults}
              fetch={fetchMoviesAction}
              handleResultClick={handleResultClick}
            />

            <MovieAddModal
              lists={lists}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              searchResults={searchResults}
              addMovieToLists={addMovieToListsAction}
              clearMovieDetails={clearMovieDetailsAction}
              addMovie={addMovieAction}
              clearSearchResults={clearSearchResultsAction}
            />
          </>
        )
      )}
    </div>
  )
}

const mapStateToProps = store => {
  return {
    lists: store.lists,
    movies: store.movies,
    searchResults: store.searchResults,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchMoviesAction: (movieName, page) =>
    dispatch(fetchMovies(movieName, page)),
  fetchMovieDetailsAction: imdb => dispatch(fetchMovieDetails(imdb)),
  addMovieToListsAction: (movieId, lists) =>
    dispatch(addMovieToLists(movieId, lists)),
  updateMovieAction: (id, rating) => dispatch(updateMovie(id, rating)),
  clearMovieDetailsAction: () => dispatch(clearMovieDetails()),
  addMovieAction: movie => dispatch(addMovie(movie)),
  clearSearchResultsAction: () => dispatch(clearSearchResults()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
