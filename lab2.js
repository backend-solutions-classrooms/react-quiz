import '@testing-library/jest-dom'
import * as React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
// import App from '../react-quiz/src/App'
import App from '../code/src/App'

test('Question is correct', () => {
	const firstQuestion = 'What is the capital of France?'
	render(<App />)
	expect(screen.getByText(firstQuestion))
})
