
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
    const user = {
        name: "bob"
    }
    
    const blog = {
        title: "Title",
        author: "Author",
        url: "url",
        likes: 0,
        user : user
    }

    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} handleLike={mockHandler} handleRemove={mockHandler} user={user} />
    )


    const button = component.getByText('view')
    fireEvent.click(button)


    expect(component.container).toHaveTextContent(
        'url', 0
    )
})

test('clicking the button calls event handler twice', async () => {
    const user = {
        name: "bob"
    }
    
    const blog = {
        title: "Title",
        author: "Author",
        url: "url",
        likes: 0,
        user : user
    }
  
    const mockHandler = jest.fn()
  
    const component = render(
        <Blog blog={blog} handleLike={mockHandler} handleRemove={mockHandler} user={user} />
    )
  
    const button = component.getByText('view')
    fireEvent.click(button)
    const button2 = component.getByText('like')
    fireEvent.click(button2)
    fireEvent.click(button2)
  
    expect(mockHandler.mock.calls.length).toBe(2)
  })