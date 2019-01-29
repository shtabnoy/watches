import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import ProductContext from './contexts/ProductContext'
import Containers from './containers'
import './theme/styles.scss'

class App extends Component {
  state = {
    products: [],
    loaded: false,
  }

  setProducts = products => {
    this.setState({ products, loaded: true })
  }

  updateProducts = product => {
    const { products } = this.state
    const index = products.findIndex(p => p.id === product.id)
    if (index >= 0) {
      this.setState(prevState => ({
        products: [
          ...prevState.products.slice(0, index),
          product,
          ...prevState.products.slice(index + 1),
        ],
      }))
    } else {
      this.setState(prevState => ({
        products: prevState.products.concat(product),
      }))
    }
  }

  render() {
    const { products, loaded } = this.state
    return (
      <ProductContext.Provider
        value={{
          products,
          setProducts: this.setProducts,
          updateProducts: this.updateProducts,
          loaded,
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
