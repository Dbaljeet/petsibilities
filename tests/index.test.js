import Home from '../pages/index'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

describe('Home page', () => {
  it('should renders home page', () => {
    render(<Home />)
    // check if all components are rendered
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByTestId('login')).toBeInTheDocument()
  })
})
