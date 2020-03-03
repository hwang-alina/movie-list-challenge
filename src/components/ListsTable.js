import { Link } from 'react-router-dom'
import { Icon, Table } from 'antd'
import React from 'react'
import { getObjectById } from '../utils/objectsArrayUtils'
const { Column } = Table

const ListsTable = props => {
  const { lists, movies, deleteList } = props

  const calculateAverageRating = moviesList => {
    if (!moviesList) return
    let moviesRating = []
    moviesList.forEach(id => {
      if (getObjectById(movies, id).rating)
        moviesRating.push(getObjectById(movies, id).rating)
    })

    const averageRating =
      moviesRating.reduce((a, b) => a + b, 0) / moviesRating.length
    return +averageRating.toFixed(2) || '-'
  }

  return (
    <Table dataSource={lists} rowKey={record => record.id}>
      <Column
        title="List name"
        dataIndex="listName"
        key="listName"
        render={(listName, record) => (
          <Link to={`/list/${record.id}`}>{listName}</Link>
        )}
      />
      <Column
        title="Average rating"
        dataIndex="rating"
        key="rating"
        align="center"
        render={(rating, record) => calculateAverageRating(record.moviesList)}
      />
      <Column
        title="Number of movies"
        dataIndex="number"
        key="number"
        align="center"
        render={(text, record) => record.moviesList.length}
      />
      <Column
        title="Action"
        key="action"
        align="center"
        render={(text, record) => (
          <Icon type="delete" onClick={() => deleteList(record.id)} />
        )}
      />
    </Table>
  )
}

export default ListsTable
