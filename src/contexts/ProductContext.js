import React from 'react'

const ProductContext = React.createContext({
  products: [],
  setProducts: () => {},
  updateProducts: () => {},
})

export default ProductContext
