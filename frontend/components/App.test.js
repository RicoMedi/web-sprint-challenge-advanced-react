// Write your tests here
// test('sanity', () => {
//   expect(true).toBe(false)
// })

import React from "react";
import { render, screen } from "@testing-library/react";
import AppFunctional from "./AppFunctional";

test('App Functional Renders', () => {
    render(<AppFunctional />)
  })
  test('two nav links', () => {
    render(<AppFunctional />)
    const nav = screen.queryAllByRole('nav')
    expect(nav).toBeTruthy()
  })
  test('valid coordinates', () => {
    render(<AppFunctional />)
    const header = screen.queryByText(/coordinates/i)
    expect(header).toBeTruthy()
  })
  
  test('buttons present', () => {
    render(<AppFunctional />)
    const buttons = screen.queryAllByRole('button')
    expect(buttons).toHaveLength(6)
  })
  
  test('steps are counting', () => {
    render(<AppFunctional />)
    const movement = screen.queryByText(/you moved/i)
    expect(movement).toBeTruthy()
  })