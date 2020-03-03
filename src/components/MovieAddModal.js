import { Modal, Checkbox, Typography, Rate, Spin } from 'antd'
import * as React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
const { Title } = Typography

const MovieAddModal = props => {
  const {
    lists,
    searchResults,
    modalVisible,
    setModalVisible,
    addMovieToLists,
    clearMovieDetails,
    addMovie,
    clearSearchResults,
  } = props
  const { movieToAdd } = searchResults
  const { data } = movieToAdd
  const [listsToAddTo, setListsToAddTo] = useState([])
  const [movieRating, setMovieRating] = useState(null)

  useEffect(() => {
    return () => {
      clearSearchResults()
    }
  }, [clearSearchResults])

  const handleCheckBoxChange = values => {
    setListsToAddTo(values)
  }

  const handleOk = data => {
    let movie = data
    if (movieRating) {
      movie.rating = movieRating
    }
    setModalVisible(false)
    addMovie(movie)
    if (listsToAddTo.length !== 0) {
      addMovieToLists(movie.id, listsToAddTo)
    }
    clearMovieDetails()
  }

  const handleCancel = () => {
    setModalVisible(false)
    setListsToAddTo([])
    setMovieRating(null)
    clearMovieDetails()
  }

  const handleRateChange = value => {
    setMovieRating(value)
  }

  const options = lists.map(l => ({ label: l.listName, value: l.id }))
  return (
    <Modal
      title={`Add movie to your lists`}
      visible={modalVisible}
      onOk={() => handleOk(data)}
      onCancel={handleCancel}
    >
      {movieToAdd.isFetching ? (
        <Spin size="large" />
      ) : (
        <>
          <Title level={3}>{data.title}</Title>
          <ul className="info">
            <li>
              <b> Genre: </b> {data.genre}
            </li>
            <li>
              <b> Year: </b> {data.year}
            </li>
            <li>
              <b> IMDB rating: </b> {data.imdbRating}
            </li>
          </ul>
          <Rate
            allowHalf
            value={movieRating}
            onChange={rating => handleRateChange(rating)}
            style={{ alignSelf: 'center' }}
          />
          <Checkbox.Group options={options} onChange={handleCheckBoxChange} />
        </>
      )}
    </Modal>
  )
}

export default MovieAddModal
