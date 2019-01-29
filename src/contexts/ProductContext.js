import React from 'react'

const ProductContext = React.createContext({
  products: [],
  setProducts: () => {},
  updateProducts: () => {},
  loaded: false,
})

export default ProductContext
