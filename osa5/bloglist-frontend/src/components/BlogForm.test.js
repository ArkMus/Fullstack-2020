import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

// test('<BlogForm /> updates parent state and calls onSubmit', () => {
//     const createBlog = jest.fn()

//     const component = render(
//         <BlogForm blog={createBlog} />
//     )

//     const input = component.container.querySelector('input')
//     const form = component.container.querySelector('form')


//     fireEvent.change(input, { target: { value: 'testing of forms could be easier' } })
//     fireEvent.submit(form)

//     component.debug()


//     expect(createBlog.mock.calls.length).toBe(1)
//     expect(createBlog.mock.calls[0][0].content).toBe('testing of forms could be easier')
// })