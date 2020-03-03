import MoviesTable from '../components/MoviesTable'
import { Modal } from 'antd'
import React from 'react'
import { deleteMovie, updateMovie } from '../actions/MovieActions'
import { connect } from 'react-redux'
import { Typography } from 'antd'
const { Title } = Typography

const MoviesPage = props => {
  const { movies, lists, updateMovieAction, deleteMovieAction } = props
  const handleDelete = id => {
    let isInUse = false
    lists.forEach(l => {
      if (l.moviesList.includes(id)) isInUse = true
    })

    if (!isInUse) deleteMovieAction(id)
    else
      Modal.warning({
        title: 'Delete failed',
        content:
          'Movie is in use in one of your lists. Please, remove it first',
      })
  }
  return (
    <div>
      <Title>Movies</Title>
      <MoviesTable
        updateMovie={updateMovieAction}
        dataSource={movies}
        movies={movies}
        handleDelete={handleDelete}
      />
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    updateMovieAction: (id, rating) => dispatch(updateMovie(id, rating)),
    deleteMovieAction: movieId => dispatch(deleteMovie(movieId)),
  }
}

const mapStateToProps = store => {
  return {
    movies: store.movies,
    lists: store.lists,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviesPage)
