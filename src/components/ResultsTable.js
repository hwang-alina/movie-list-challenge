import { Table } from 'antd'
import React from 'react'

const columns = [
  { title: 'Title', dataIndex: 'title', key: 'title' },
  { title: 'Year', dataIndex: 'year', key: 'year' },
  // { title: 'imdbID', dataIndex: 'imdbID', key: 'imdbID'},
]

const ResultsTable = props => {
  const { searchResults, fetch, handleResultClick } = props
  const { data, page, total, movieName, isFetching } = searchResults
  const pagination = { current: +page, total: +total }

  const handleTableChange = e => {
    fetch(movieName, e.current)
  }

  return (
    <Table
      rowKey={record => record.id}
      columns={columns}
      dataSource={data}
      pagination={pagination}
      onChange={handleTableChange}
      onRow={(record, rowIndex) => {
        return {
          onClick: () => handleResultClick(record),
        }
      }}
      loading={isFetching}
    />
  )
}

export default ResultsTable
