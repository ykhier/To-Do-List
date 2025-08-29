import { render, screen, fireEvent } from '@testing-library/react'
import ToDoList from './ToDoList.jsx'

beforeEach(() => {
  localStorage.clear()
})

test('adds and displays a task', () => {
  render(<ToDoList />)
  const input = screen.getByPlaceholderText('הוסף משימה...')
  fireEvent.change(input, { target: { value: 'Buy milk' } })
  fireEvent.click(screen.getByRole('button', { name: 'הוסף' }))
  expect(screen.getByText('Buy milk')).toBeInTheDocument()
  expect(screen.getByText(/מספר המשימות/)).toHaveTextContent('1')
})

test('deletes a task', () => {
  render(<ToDoList />)
  const input = screen.getByPlaceholderText('הוסף משימה...')
  fireEvent.change(input, { target: { value: 'Task A' } })
  fireEvent.click(screen.getByRole('button', { name: 'הוסף' }))
  expect(screen.getByText('Task A')).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: '❌' }))
  expect(screen.queryByText('Task A')).not.toBeInTheDocument()
})
