/* eslint-disable */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

describe('test BlogForm', () => {
  let container
  const createBlog = jest.fn().mockImplementation((e) => e.preventDefault())
  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="create new blog">
        <BlogForm createBlog={createBlog} />
      </Togglable>
    ).container
  })

  test('event handler received as props with the right details', async () => {
    const user = userEvent.setup()

    const inputTitle = screen.getByPlaceholderText('write here blog title')
    const inputAuthor = screen.getByPlaceholderText('write here blog author')
    const inputUrl = screen.getByPlaceholderText('write here blog url')

    const createButton = screen.getByText('create')

    await user.type(inputTitle, 'testing a form title')
    await user.type(inputAuthor, 'testing a form author')
    await user.type(inputUrl, 'testing a form url')
    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    const result = createBlog.mock.calls[0][0]
    expect(result.title).toBe('testing a form title')
    expect(result.author).toBe('testing a form author')
    expect(result.url).toBe('testing a form url')
  })
})
