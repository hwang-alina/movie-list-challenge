import React from 'react'
import '../App.css'
import { Button, Form, Input } from 'antd'

const ListAddForm = props => {
  const { form, addList } = props
  const { getFieldDecorator } = form
  const isInputEmpty = !form.getFieldValue('listName')

  const handleSubmit = e => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        addList(values)
        form.resetFields()
      }
    })
  }

  return (
    <div className="movie-lists">
      <Form layout="inline" onSubmit={handleSubmit}>
        <Form.Item>
          {getFieldDecorator('listName')(<Input placeholder="New list name" />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={isInputEmpty}>
            Add
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

const WrappedListAddForm = Form.create({ name: 'add_list' })(ListAddForm)
export default WrappedListAddForm
