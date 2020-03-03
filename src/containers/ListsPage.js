import React from 'react'
import '../App.css'
import { Typography } from 'antd'
import { connect } from 'react-redux'
import { addList, deleteList } from '../actions/ListActions'
import ListAddForm from '../components/ListAddForm'
import ListsTable from '../components/ListsTable'
const { Title } = Typography

const ListsPage = props => {
  const { movies, lists, addListAction, deleteListAction } = props

  return (
    <div className="listsPage">
      <Title>Lists</Title>
      <ListAddForm addList={addListAction} />
      {lists.length !== 0 && (
        <ListsTable
          lists={lists}
          movies={movies}
          deleteList={deleteListAction}
        />
      )}
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    addListAction: name => dispatch(addList(name)),
    deleteListAction: id => dispatch(deleteList(id)),
  }
}

const mapStateToProps = store => {
  return {
    lists: store.lists,
    movies: store.movies,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListsPage)
