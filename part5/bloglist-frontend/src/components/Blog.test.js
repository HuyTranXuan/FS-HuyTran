import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'
import Blog from './Blog'

test('renders content', () => {
	const blog = {
		user: 'test user',
		likes: '11',
		author: 'author Huy',
		title: 'test title',
		url: 'test url',
	}

	//   const element = screen.getByText('authorHuy')
	const { container } = render(<Blog blog={blog} />)

	const div = container.querySelector('.blogElement')
	screen.debug(div)
	expect(div).toHaveTextContent('author Huy')
})
describe('<Togglable />', () => {
	let container

	beforeEach(() => {
		const blog = {
			user: 'test user',
			likes: '11',
			author: 'author Huy',
			title: 'test title',
			url: 'test url',
		}
		container = render(
			<Togglable buttonLabel="show...">
				<div className="testDiv">togglable content</div>
			</Togglable>
		).container
	})

	test('renders its children', () => {
		screen.findAllByText('togglable content')
	})

	test('at start the children are not displayed', () => {
		const div = container.querySelector('.togglableContent')
		expect(div).toHaveStyle('display: none')
	})

	test('after clicking the button, children are displayed', async () => {
		const user = userEvent.setup()
		const button = screen.getByText('show...')
		await user.click(button)

		const div = container.querySelector('.togglableContent')
		expect(div).not.toHaveStyle('display: none')
	})
})
