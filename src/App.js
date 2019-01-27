import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes'
import './theme/styles.scss'

class App extends Component {
  state = {}

  render() {
    return (
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    )
  }
}

export default App
