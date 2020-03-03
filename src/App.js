import React from 'react'
import './App.css'
import { connect } from 'react-redux'
import { addList } from './actions/ListActions'
import ListsPage from './containers/ListsPage'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import MovieListPage from './containers/MoviesListPage'
import SearchPage from './containers/SearchPage'
import { Layout, Menu } from 'antd'
import MoviesPage from './containers/MoviesPage'
const { Header } = Layout

const App = () => {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Header>
            <Menu
              theme="dark"
              mode="horizontal"
              style={{
                lineHeight: '64px',
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Menu.Item>
                <Link to="/">Lists</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/search">Search</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/movies">Movies</Link>
              </Menu.Item>
            </Menu>
          </Header>
          <section className="content">
            <Switch>
              <Route path="/list/:id" component={MovieListPage} />
              <Route path="/search" component={SearchPage} />
              <Route path="/movies" component={MoviesPage} />
              <Route path="/" component={ListsPage} />
            </Switch>
          </section>
        </Layout>
      </Router>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    addListAction: name => dispatch(addList(name)),
  }
}

const mapStateToProps = store => {
  return {
    movies: store.movies,
    lists: store.lists,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
