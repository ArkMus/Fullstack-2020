
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders Title and Author', () => {
    const blog = {
        title: "Title",
        author: "Author",
        url: "url",
        likes: 0,
        user: "123"
      }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Title', 'Author'
  )
})

test('clicking the button shows also url and likes', async () => {
    const mockUser = {
        name: "bob"
    }
    const blog = {
        title: "Title",
        author: "Author",
        url: "url",
        likes: 0,
        user: mockUser
      }


  const mockHandler = jest.fn()

  const { getByText } = render(
    <Blog blog={blog} handleView={mockHandler} />
  )

  const button = getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'url', 0
  )
})