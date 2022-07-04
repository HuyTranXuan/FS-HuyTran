/* eslint-disable */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'
import Blog from './Blog'

describe('test <Togglable />', () => {
  let container
  const blog = {
    user: 'test user',
    likes: '11',
    author: 'author Huy',
    title: 'test title',
    url: 'test url',
  }
  const mockHandler = jest.fn()
  beforeEach(() => {
    container = render(
      <div>
        {blog.title} by {blog.author}
        <Togglable buttonLabel="show...">
          <Blog className="testDiv" blog={blog} addLike={mockHandler} />
        </Togglable>
      </div>
    ).container
  })

  test('renders its children', () => {
    screen.findAllByText('test title')
  })

  test('at start the url and likes are not displayed', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, url and likes are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('after clicking the like button twice,  event handler registered', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
