import React from 'react'
import '../App.css'
import { Button, Form, Input } from 'antd'

const SearchForm = props => {
  const { form, fetchMoviesAction } = props
  const { getFieldDecorator } = form

  const isInputEmpty = !form.getFieldValue('movieName')

  const handleSubmit = e => {
    e.preventDefault()
    form.validateFields((err, values) => {
      fetchMoviesAction(values.movieName)
    })
  }

  return (
    <div className="movie-lists">
      <Form layout="inline" onSubmit={handleSubmit}>
        <Form.Item>
          {getFieldDecorator('movieName')(<Input placeholder="Movie name" />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={isInputEmpty}>
            Find
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

const WrappedListAddForm = Form.create({ name: 'add_movie' })(SearchForm)
export default WrappedListAddForm
