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

test('Question is correct', () => {
	const firstQuestion = 'What is the capital of France?'
	render(<App />)
	expect(screen.getByText(firstQuestion))
})
