import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Containers from './containers'
import './theme/styles.scss'

class App extends Component {
  state = {}

  render() {
    return (
      <BrowserRouter>
        <Containers />
      </BrowserRouter>
    )
  }
}

export default App
