import React from 'react'
import { screen, render } from '@testing-library/react'
import RequireAuth from './index'

jest.mock('data/auth', () => ({
  selectAuth: () => true
}))

jest.mock('react-redux', () => ({
  useSelector: () => true
}))

describe('RequireAuth', () => {

  it('Should render in auth mode', () => {
    render(<RequireAuth>auth mode</RequireAuth>)

    const text = screen.getByText("auth mode")
    expect(text).toBeInTheDocument()
  });

});
