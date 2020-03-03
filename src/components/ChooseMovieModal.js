import { Modal, Checkbox, Spin } from 'antd'
import * as React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const ChooseMovieModal = props => {
  const {
    movies,
    currentList,
    modalVisible,
    setModalVisible,
    addMoviesArrayToList,
  } = props
  const { moviesList, id } = currentList
  const [moviesToAdd, setMoviesToAdd] = useState([])
  useEffect(() => {
    return () => {
      setMoviesToAdd([])
    }
  }, [modalVisible])

  const options = movies.map(l => ({
    label: l.title,
    value: l.id,
    disabled: moviesList.includes(l.id),
  }))

  const disableOkButton = !setMoviesToAdd.length

  const handleCheckBoxChange = values => {
    setMoviesToAdd(values)
  }

  const handleOk = chosenMovies => {
    setMoviesToAdd([])
    setModalVisible(false)
    addMoviesArrayToList(chosenMovies, id)
  }

  const handleCancel = () => {
    setModalVisible(false)
    setMoviesToAdd([])
  }

  return (
    <Modal
      title={`Add movie to your lists`}
      visible={modalVisible}
      onOk={() => handleOk(moviesToAdd)}
      onCancel={handleCancel}
      okButtonProps={{ disabled: disableOkButton }}
    >
      {moviesToAdd.isFetching ? (
        <Spin size="large" />
      ) : (
        <Checkbox.Group
          options={options}
          onChange={handleCheckBoxChange}
          value={moviesToAdd}
        />
      )}
    </Modal>
  )
}

export default ChooseMovieModal
