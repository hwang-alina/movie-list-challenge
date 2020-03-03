import React from 'react'
import { Icon, Rate, Table } from 'antd'
import { getObjectById } from '../utils/objectsArrayUtils'

const { Column } = Table

const MoviesTable = props => {
  const { dataSource, updateMovie, movies, handleDelete } = props
  const filters = dataSource.map(m => ({ text: m.title, value: m.id }))

  return (
    <Table dataSource={dataSource} rowKey={record => record.id}>
      <Column
        title="Title"
        dataIndex="title"
        key="title"
        sorter={(a, b) => a.title.localeCompare(b.title)}
        onFilter={(value, record) => record.id === value}
        filters={filters}
      />
      <Column title="Year" dataIndex="year" key="year" />
      <Column title="Genre" dataIndex="genre" key="genre" />
      <Column
        title="Rating"
        dataIndex="rating"
        key="rating"
        render={(rating, record) => (
          <Rate
            allowHalf
            value={getObjectById(movies, record.id).rating}
            onChange={newRating =>
              updateMovie(record.id, { rating: newRating })
            }
            key={record.id}
          />
        )}
        sorter={(a, b) => a.rating - b.rating}
      />
      <Column
        title="Action"
        key="action"
        align="center"
        render={(text, record) => (
          <Icon type="delete" onClick={() => handleDelete(record.id)} />
        )}
      />
    </Table>
  )
}

export default MoviesTable
