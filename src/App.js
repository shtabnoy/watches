import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import ProductContext from './contexts/ProductContext'
import Containers from './containers'
import './theme/styles.scss'

class App extends Component {
  state = {
    products: [],
  }

  setProducts = products => {
    this.setState({ products })
  }

  render() {
    const { products } = this.state
    return (
      <ProductContext.Provider
        value={{
          products,
          setProducts: this.setProducts,
        }}
      >
        <BrowserRouter>
          <Containers />
        </BrowserRouter>
      </ProductContext.Provider>
    )
  }
}

export default App
