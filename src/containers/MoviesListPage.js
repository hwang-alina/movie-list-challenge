import React, { useState } from 'react'
import '../App.css'
import { Button, Typography } from 'antd'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getObjectById } from '../utils/objectsArrayUtils'
import { updateMovie } from '../actions/MovieActions'
import {
  addMoviesArrayToList,
  deleteMovieFromList,
} from '../actions/ListActions'
import ChooseMovieModal from '../components/ChooseMovieModal'
import MoviesTable from '../components/MoviesTable'
const { Title } = Typography

const MoviesListPage = props => {
  const {
    lists,
    movies,
    deleteMovieFromListAction,
    updateMovieAction,
    addMoviesArrayToListAction,
  } = props
  const [modalVisible, setModalVisible] = useState(false)
  let id = +useParams().id
  const shouldShowError = !id || !getObjectById(lists, id) || lists.length === 0

  if (shouldShowError)
    return (
      <div>
        <Title>Something went wrong =(</Title>
        <Link to="/">Home</Link>
      </div>
    )
  else {
    id = parseInt(id, 10)
    const currentList = getObjectById(lists, id)
    const moviesList = currentList.moviesList.map(ml =>
      getObjectById(movies, ml)
    )

    const openModal = () => {
      setModalVisible(true)
    }
    const handleDelete = movieId => {
      deleteMovieFromListAction(movieId, id)
    }

    return (
      <div className="movieListsPage">
        <Title>{getObjectById(lists, id).listName}</Title>
        {moviesList.length !== 0 && (
          <MoviesTable
            updateMovie={updateMovieAction}
            dataSource={moviesList}
            movies={movies}
            handleDelete={handleDelete}
          />
        )}
        <div
          className="buttonsWrapper"
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            maxWidth: '250px',
          }}
        >
          <Button type="primary" onClick={openModal}>
            Add existing
          </Button>
          <Link to="/search">
            <Button type="primary">Find new one</Button>
          </Link>
        </div>
        <ChooseMovieModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          addMoviesArrayToList={addMoviesArrayToListAction}
          movies={movies}
          currentList={currentList}
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateMovieAction: (id, rating) => dispatch(updateMovie(id, rating)),
    deleteMovieFromListAction: (movieId, listId) =>
      dispatch(deleteMovieFromList(movieId, listId)),
    addMoviesArrayToListAction: (movies, listId) =>
      dispatch(addMoviesArrayToList(movies, listId)),
  }
}

const mapStateToProps = store => {
  return {
    lists: store.lists,
    movies: store.movies,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviesListPage)
