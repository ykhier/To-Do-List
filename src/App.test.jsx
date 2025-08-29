import { render, screen } from '@testing-library/react'
import App from './App.jsx'

it('renders To-Do-List title', () => {
  render(<App />)
  expect(screen.getByText(/To-Do-List/i)).toBeInTheDocument()
})
