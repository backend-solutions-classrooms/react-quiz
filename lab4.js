// * Production start
import '../code/node_modules/@testing-library/jest-dom'
import * as React from '../code/node_modules/react'
import { render, fireEvent, screen } from '../code/node_modules/@testing-library/react'
import App from '../code/src/App'
// * Production end

// * Development start
// import '../react-quiz/node_modules/@testing-library/jest-dom'
// import * as React from '../react-quiz/node_modules/react'
// import { render, fireEvent, screen } from '../react-quiz/node_modules/@testing-library/react'
// import App from '../react-quiz/src/App'
// * Development end

test('Question 1 is correct', () => {
	const firstQuestion = 'What is the capital of France?'
	render(<App />)
	expect(screen.getByText(firstQuestion))
})

test('Answers 1 are correct', () => {
	render(<App />)
	expect(screen.getByText('New York'))
	expect(screen.getByText('London'))
	expect(screen.getByText('Paris'))
	expect(screen.getByText('Dublin'))
})

test('Clicking option once works fine', () => {
	render(<App />)
	fireEvent.click(screen.getByText('New York'))
	expect(screen.getByText('Who is CEO of Tesla?'))
	expect(screen.getByText('Jeff Bezos'))
})

test('Clicking option twice works fine', () => {
	render(<App />)
	fireEvent.click(screen.getByText('New York'))
	fireEvent.click(screen.getByText('Jeff Bezos'))
	expect(screen.getByText('Apple'))
})
